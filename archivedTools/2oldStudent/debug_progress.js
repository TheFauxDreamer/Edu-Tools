// Debug functions for testing progress tracking
const ProgressDebugger = {
    // Properties for Konami code and state
    konamiSequence: [],
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'],
    debugDiv: null,
    warningShown: false,

    // Get debug visibility state with default of false
    get debugVisible() {
        return localStorage.getItem('debuggerVisible') === 'true';
    },

    // Set debug visibility state and save to localStorage
    set debugVisible(value) {
        localStorage.setItem('debuggerVisible', value);
        if (this.debugDiv) {
            this.debugDiv.style.display = value ? 'block' : 'none';
        }
    },

    // Initialize Konami code listener and restore state
    initKonamiCode: function () {
        document.addEventListener('keydown', (e) => {
            if (!e.key.startsWith('Arrow')) {
                this.konamiSequence = [];
                return;
            }

            this.konamiSequence.push(e.key);

            while (this.konamiSequence.length > this.konamiCode.length) {
                this.konamiSequence.shift();
            }

            if (this.arrayEquals(this.konamiSequence, this.konamiCode)) {
                this.konamiSequence = [];
                this.toggleDebugControls();
            }
        });

        // Create warning modal
        this.createWarningModal();

        // Create and set initial state of debug controls
        this.addDebugControls();
        this.debugDiv.style.display = this.debugVisible ? 'block' : 'none';
    },

    // Create warning modal
    createWarningModal: function () {
        const modalHtml = `
            <div id="debugWarningModal" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            ">
                <div style="
                    background: white;
                    border-radius: 0.5rem;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                ">
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1.25rem;
                        border-bottom: 1px solid #e5e7eb;
                    ">
                        <div style="
                            font-size: 1.25rem;
                            font-weight: 600;
                            color: #111827;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                        ">⚠️ Debug Mode Warning</div>
                    </div>
                    <div style="
                        padding: 1.5rem;
                        text-align: center;
                        color: #374151;
                    ">
                        <p style="margin-bottom: 1.5rem; line-height: 1.5;">
                            If you've stumbled upon this I recommend you disable the debugger feature
                            as it will mess with my cute congratulations pop-ups.
                        </p>
                        <div style="
                            display: flex;
                            gap: 1rem;
                            justify-content: center;
                        ">
                            <button onclick="ProgressDebugger.disableAndCloseWarning()" 
                                    style="
                                        background-color: #ef4444;
                                        color: white;
                                        padding: 0.75rem 1.5rem;
                                        border-radius: 0.375rem;
                                        border: none;
                                        font-weight: 500;
                                        cursor: pointer;
                                        transition: background-color 0.2s;
                                    "
                                    onmouseover="this.style.backgroundColor='#dc2626'"
                                    onmouseout="this.style.backgroundColor='#ef4444'"
                            >
                                Disable Debugger
                            </button>
                            <button onclick="ProgressDebugger.continueWithDebugger()"
                                    style="
                                        background-color: #2563eb;
                                        color: white;
                                        padding: 0.75rem 1.5rem;
                                        border-radius: 0.375rem;
                                        border: none;
                                        font-weight: 500;
                                        cursor: pointer;
                                        transition: background-color 0.2s;
                                    "
                                    onmouseover="this.style.backgroundColor='#1d4ed8'"
                                    onmouseout="this.style.backgroundColor='#2563eb'"
                            >
                                Continue Anyway
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append modal to body if it doesn't exist
        if (!document.getElementById('debugWarningModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }
    },

    // Handle disabling debugger and closing warning
    disableAndCloseWarning: function () {
        const modal = document.getElementById('debugWarningModal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.debugVisible = false;
        showNotification('Debug mode disabled');
    },

    continueWithDebugger: function () {
        const modal = document.getElementById('debugWarningModal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.warningShown = true;
        localStorage.setItem('debugWarningShown', 'true');
        showNotification('Debug mode enabled');
    },

    // Toggle debug controls visibility
    toggleDebugControls: function () {
        if (!this.debugDiv) {
            this.addDebugControls();
        }

        const wasVisible = this.debugVisible;
        this.debugVisible = !wasVisible;

        // Show warning modal when enabling, if not shown before
        if (!wasVisible && this.debugVisible &&
            localStorage.getItem('debugWarningShown') !== 'true') {
            const modal = document.getElementById('debugWarningModal');
            if (modal) {
                modal.style.display = 'flex';
            }
        } else {
            showNotification(`Debug mode ${this.debugVisible ? 'enabled' : 'disabled'}`);
        }
    }
    ,

    // Helper function to compare arrays
    arrayEquals: function (a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    },

    // Simulate uploading files with specific error/warning counts
    simulateUpload: function (errorCount, warningCount) {
        console.log(`Simulating upload with ${errorCount} errors and ${warningCount} warnings`);

        csvUploaded = true;
        xmlUploaded = true;

        const mockErrorSummary = { 'Mock Error': errorCount };
        const mockWarningSummary = { 'Mock Warning': { count: warningCount, hidden: false } };

        const originalGetErrorSummary = window.getErrorSummary;
        const originalGetWarningSummary = window.getWarningSummaryWithHidden;

        window.getErrorSummary = () => mockErrorSummary;
        window.getWarningSummaryWithHidden = () => mockWarningSummary;

        updateProgressTracking();

        window.getErrorSummary = originalGetErrorSummary;
        window.getWarningSummaryWithHidden = originalGetWarningSummary;
    },

    // Reset all progress tracking data
    resetProgress: function () {
        console.log('Resetting all progress tracking data');
        localStorage.removeItem('progressStats');
        progressStats = {
            initialErrorCount: 0,
            initialWarningCount: 0,
            dateStarted: null,
            milestonesReached: new Set()
        };
        console.log('Progress tracking data reset complete');
        showNotification('Progress data reset');
    },

    // Test specific milestone
    testMilestone: function (remainingPercentage) {
        console.log(`Testing milestone at ${remainingPercentage}% remaining`);
        const initialTotal = 100;
        const currentTotal = Math.floor(initialTotal * (remainingPercentage / 100));

        this.resetProgress();
        this.simulateUpload(initialTotal, 0);
        this.simulateUpload(currentTotal, 0);
    },

    // Run through all milestones
    testAllMilestones: function () {
        console.log('Testing all milestones in sequence');
        const testSequence = [
            { percentage: 55, description: 'Before first milestone' },
            { percentage: 50, description: 'At first milestone boundary' },
            { percentage: 35, description: 'In first milestone range' },
            { percentage: 21, description: 'At first milestone lower boundary' },
            { percentage: 20, description: 'At second milestone upper boundary' },
            { percentage: 15, description: 'In second milestone range' },
            { percentage: 6, description: 'At second milestone lower boundary' },
            { percentage: 5, description: 'At third milestone upper boundary' },
            { percentage: 3, description: 'In third milestone range' },
            { percentage: 1, description: 'At third milestone lower boundary' },
            { percentage: 0, description: 'Testing completion' }
        ];

        let delay = 0;
        testSequence.forEach((test, index) => {
            setTimeout(() => {
                console.log(`\n${test.description} (${test.percentage}% remaining)`);
                this.testMilestone(test.percentage);
            }, delay);
            delay += 1000;
        });
    },

    // Test completion milestone
    testCompletion: function () {
        console.log('Testing completion milestone');
        this.resetProgress();
        this.simulateUpload(100, 50);  // Set initial state
        this.simulateUpload(0, 0);     // Trigger completion
    },

    // Show current progress stats
    showCurrentStats: function () {
        // Get the stats
        const totalInitial = progressStats.initialErrorCount + progressStats.initialWarningCount;
        const dateStarted = progressStats.dateStarted ?
            new Date(progressStats.dateStarted).toLocaleDateString() : 'Not started';
        const milestonesReached = Array.from(progressStats.milestonesReached);

        // Log to console (detailed view)
        console.log('Current Progress Stats:', {
            ...progressStats,
            milestonesReached: milestonesReached
        });

        // Create notification message with HTML line breaks
        const statsMessage =
            `Initial Issues: ${totalInitial}<br>` +
            `Start Date: ${dateStarted}<br>` +
            `Milestones: ${milestonesReached.length ? milestonesReached.join(', ') : 'None'}`;

        // Show notification
        showNotification(statsMessage);
    },

    // Add debug controls to the page
    addDebugControls: function() {
        const debugDiv = document.createElement('div');
        this.debugDiv = debugDiv;
        debugDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            font-family: system-ui, -apple-system, sans-serif;
            display: none;
            border: 1px solid #e5e7eb;
            width: 240px;
        `;
        debugDiv.innerHTML = `
            <div style="
                margin-bottom: 0.75rem;
                font-weight: 600;
                font-size: 0.9rem;
                color: #111827;
                display: flex;
                align-items: center;
                justify-content: space-between;
            ">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                    Debug Controls
                </div>
                <button onclick="ProgressDebugger.toggleDebugControls()"
                        style="
                            background: none;
                            border: none;
                            color: #9ca3af;
                            cursor: pointer;
                            padding: 4px;
                            font-size: 1.2rem;
                            line-height: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: color 0.2s;
                        "
                        onmouseover="this.style.color='#ef4444'"
                        onmouseout="this.style.color='#9ca3af'">
                    ×
                </button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <button onclick="ProgressDebugger.resetProgress()"
        style="
            padding: 0.5rem;
            background-color: #f3f4f6;
            color: #374151;
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.8rem;
            text-align: center;
        "
        onmouseover="this.style.backgroundColor='#ef4444'; this.style.color='white'; this.style.borderColor='#ef4444'"
        onmouseout="this.style.backgroundColor='#f3f4f6'; this.style.color='#374151'; this.style.borderColor='#e5e7eb'">
    Reset Progress
</button>
                <button onclick="ProgressDebugger.showCurrentStats()"
                        style="
                            padding: 0.5rem;
                            background-color: #f3f4f6;
                            color: #374151;
                            border: 1px solid #e5e7eb;
                            border-radius: 0.375rem;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s;
                            font-size: 0.8rem;
                            text-align: center;
                        "
                        onmouseover="this.style.backgroundColor='#e5e7eb'"
                        onmouseout="this.style.backgroundColor='#f3f4f6'">
                    Show Stats
                </button>
                <button onclick="ProgressDebugger.testAllMilestones()"
                        style="
                            padding: 0.5rem;
                            background-color: #7c3aed;
                            color: white;
                            border: none;
                            border-radius: 0.375rem;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s;
                            font-size: 0.8rem;
                            text-align: center;
                        "
                        onmouseover="this.style.backgroundColor='#6d28d9'"
                        onmouseout="this.style.backgroundColor='#7c3aed'">
                    Test All
                </button>
                <button onclick="ProgressDebugger.testCompletion()"
                        style="
                            padding: 0.5rem;
                            background-color: #7c3aed;
                            color: white;
                            border: none;
                            border-radius: 0.375rem;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s;
                            font-size: 0.8rem;
                            text-align: center;
                        "
                        onmouseover="this.style.backgroundColor='#6d28d9'"
                        onmouseout="this.style.backgroundColor='#7c3aed'">
                    Test 0%
                </button>
            </div>
            <div style="
                display: flex;
                gap: 0.5rem;
                margin-top: 0.5rem;
                background-color: #f3f4f6;
                padding: 0.5rem;
                border-radius: 0.375rem;
                border: 1px solid #e5e7eb;
            ">
                <input type="number" 
                       id="debugPercentage" 
                       placeholder="%" 
                       style="
                           width: 50px;
                           padding: 0.25rem;
                           border: 1px solid #e5e7eb;
                           border-radius: 0.25rem;
                           background: white;
                           font-size: 0.8rem;
                       ">
                <button onclick="ProgressDebugger.testMilestone(document.getElementById('debugPercentage').value)"
                        style="
                            flex: 1;
                            padding: 0.25rem;
                            background-color: #7c3aed;
                            color: white;
                            border: none;
                            border-radius: 0.375rem;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s;
                            font-size: 0.8rem;
                        "
                        onmouseover="this.style.backgroundColor='#6d28d9'"
                        onmouseout="this.style.backgroundColor='#7c3aed'">
                    Test
                </button>
            </div>
        `;
        document.body.appendChild(debugDiv);
    }
};

// Initialize Konami code detection when the page loads
document.addEventListener('DOMContentLoaded', () => {
    ProgressDebugger.initKonamiCode();
});