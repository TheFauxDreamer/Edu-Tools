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

// Add a button to trigger demo mode
function addDemoButton() {
    const headerControls = document.querySelector('.header-controls');
    if (!headerControls) return;

    const demoButton = document.createElement('button');
    demoButton.className = 'settings-button';
    demoButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
        </svg>
        Demo Mode
    `;
    demoButton.onclick = loadDemoData;

    // Insert before the upload areas
    const uploadAreas = headerControls.querySelector('.upload-areas');
    headerControls.insertBefore(demoButton, uploadAreas);
}

// Initialize demo mode
document.addEventListener('DOMContentLoaded', () => {
    // Add demo button
    addDemoButton();

    // Check URL parameters for auto-demo mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('demo')) {
        loadDemoData();
    }
});

// Add demo mode styles
const demoStyles = document.createElement('style');
demoStyles.textContent = `
    .settings-button svg {
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(demoStyles);
