// address-config.js
// This one is pretty self explanatory.
// To add a new site uncomment the example SITE_C_ADDRESS and update as needed, make sure to match the logoKey to the one you added to the logo-data.js file.
const ADDRESS_CONFIG = {
    
    // Main organization address (required)
    MAIN_ADDRESS: {
        name: "Perth Senior High School",
        street: "151 Royal Street,",
        location: "Perth, WA 6000",
        website: "www.perthshs.wa.edu.au"
    },

    // Additional site/department addresses
    ADDITIONAL_ADDRESSES: {
        // Example of a department/subsidiary site
        SITE_B_ADDRESS: {
            name: "Perth Agricultural School",
            street: "Lot 777 Farmer Way,",
            location: "Perth, WA 6000",
            website: "www.perthshs.wa.edu.au/agriculture",
            logoKey: "siteBLogo"  // This links to the logo preset key
        },
        STARS_ADDRESS: {
            name: "Perth Senior High School",
            street: "151 Royal Street,",
            location: "Perth, WA 6000",
            website: "www.starsfoundation.org.au",
            logoKey: "starsLogo"  // This links to the logo preset key
        },
        CLONTARF_ADDRESS: {
            name: "Perth Senior High School",
            street: "151 Royal Street,",
            location: "Perth, WA 6000",
            website: "www.clontarf.org.au",
            logoKey: "clontarfLogo"  // This links to the logo preset key
        },
        POLLYFARMER_ADDRESS: {
            name: "Perth Senior High School",
            street: "151 Royal Street,",
            location: "Perth, WA 6000",
            website: "www.pff.com.au",
            logoKey: "pollyFarmerLogo"  // This links to the logo preset key
        }

        // Add more addresses as needed:
        /*
        SITE_C_ADDRESS: {
            name: "Site Name",
            street: "Street Address",
            location: "City, State PostCode",
            website: "website.url",
            logoKey: "siteCLogo"  // This links to the logo preset key

        }
        */
    },

    // Email domain validation settings
    // If you want more allowed domains in the email field, add them here
    EMAIL_DOMAINS: [
        "@education.wa.edu.au",
        "@guest.education.wa.edu.au"
        // Add more allowed email domains as needed
    ],

    // Default phone area code for the organization
    DEFAULT_AREA_CODE: "08",

    // Main organization phone number
    DEFAULT_PHONE: "(08) 9071 9777",

    // Example Staff Member defaults
    PREVIEW_DEFAULTS: {
        name: "Jane Doe",
        title: "Staff Member",
        email: "jane.doe@example.com"
    }
};

// Export the configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ADDRESS_CONFIG;
} else {
    window.ADDRESS_CONFIG = ADDRESS_CONFIG;
}