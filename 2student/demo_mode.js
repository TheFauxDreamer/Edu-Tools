// Track demo mode state
let isDemoMode = false;

// Function to load demo data
function loadDemoData() {
    try {
        // Create and process CSV file
        const csvBlob = new Blob([DEMO_DATA.csv], { type: 'text/csv' });
        const csvFile = new File([csvBlob], 'demo_data.csv', { type: 'text/csv' });
        handleCSVFile(csvFile);

        // Create and process XML file
        const xmlBlob = new Blob([DEMO_DATA.xml], { type: 'text/xml' });
        const xmlFile = new File([xmlBlob], 'demo_data.xml', { type: 'text/xml' });
        handleXMLFile(xmlFile);

        showNotification('Demo data loaded successfully');
    } catch (error) {
        console.error('Error loading demo data:', error);
        showNotification('Error loading demo data');
    }
}

// Function to toggle demo mode
function toggleDemoMode(button) {
    isDemoMode = !isDemoMode;
    if (isDemoMode) {
        loadDemoData();
        button.querySelector('.demo-status').textContent = 'Enabled';
    } else {
        // Reload the page to clear demo data
        // This is terrible and not best practice but I don't want to added redundant code for a proper implementation to the main html file.
        location.reload();
    }
}

// Add a button to trigger demo mode
function addDemoButton() {
    const headerControls = document.querySelector('.header-controls');
    if (!headerControls) return;

    const demoButton = document.createElement('button');
    demoButton.className = 'settings-button demo-button';
    demoButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
        </svg>
        <div class="demo-text">
            <span>Demo Mode</span>
            <span class="demo-status">Disabled</span>
        </div>
    `;
    
    demoButton.onclick = () => toggleDemoMode(demoButton);

    // Insert before the settings button
    const settingsButton = headerControls.querySelector('#settingsButton');
    headerControls.insertBefore(demoButton, settingsButton);

    // If URL has demo parameter, enable demo mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('demo')) {
        toggleDemoMode(demoButton);
    }
}

// Initialize demo mode
document.addEventListener('DOMContentLoaded', () => {
    // Add demo button
    addDemoButton();
});

// Add demo mode styles
const demoStyles = document.createElement('style');
demoStyles.textContent = `
.settings-button svg {
        margin-right: 0.5rem;
    }
    .demo-button .demo-text {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        line-height: 1.2;
    }
    .demo-button .demo-status {
        font-size: 0.8em;
        opacity: 0.8;
    }
`;
document.head.appendChild(demoStyles);
