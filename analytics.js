// CyberSentinel AI Analytics Tracking
(function() {
    // Google Analytics (to be added when GA property is created)
    const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual ID
    
    // Basic visit tracking
    function trackVisit() {
        const visitData = {
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            referrer: document.referrer || 'direct',
            userAgent: navigator.userAgent,
            screenSize: `${window.screen.width}x${window.screen.height}`
        };
        
        // Store in localStorage for later batch send
        const visits = JSON.parse(localStorage.getItem('cybersentinel_visits') || '[]');
        visits.push(visitData);
        localStorage.setItem('cybersentinel_visits', JSON.stringify(visits.slice(-50))); // Keep last 50
        
        console.log('CyberSentinel: Visit tracked', visitData);
    }
    
    // Form submission tracking
    function setupFormTracking() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const formData = {
                    timestamp: new Date().toISOString(),
                    formId: form.id || 'unknown',
                    action: form.action || 'unknown'
                };
                
                const submissions = JSON.parse(localStorage.getItem('cybersentinel_form_submissions') || '[]');
                submissions.push(formData);
                localStorage.setItem('cybersentinel_form_submissions', JSON.stringify(submissions.slice(-20)));
                
                console.log('CyberSentinel: Form submission tracked', formData);
            });
        });
    }
    
    // Button click tracking
    function setupButtonTracking() {
        const buttons = document.querySelectorAll('a.button, button[type="submit"], .cta-button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonData = {
                    timestamp: new Date().toISOString(),
                    text: button.textContent.trim(),
                    href: button.href || 'none',
                    className: button.className
                };
                
                const clicks = JSON.parse(localStorage.getItem('cybersentinel_button_clicks') || '[]');
                clicks.push(buttonData);
                localStorage.setItem('cybersentinel_button_clicks', JSON.stringify(clicks.slice(-100)));
                
                console.log('CyberSentinel: Button click tracked', buttonData);
            });
        });
    }
    
    // Service interest tracking
    function trackServiceInterest() {
        const serviceLinks = document.querySelectorAll('a[href*="#pricing"], a[href*="#services"], .service-link');
        serviceLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const interestData = {
                    timestamp: new Date().toISOString(),
                    service: this.textContent.trim(),
                    href: this.href
                };
                
                const interests = JSON.parse(localStorage.getItem('cybersentinel_service_interests') || '[]');
                interests.push(interestData);
                localStorage.setItem('cybersentinel_service_interests', JSON.stringify(interests.slice(-50)));
                
                console.log('CyberSentinel: Service interest tracked', interestData);
            });
        });
    }
    
    // Time on page tracking
    let pageEnterTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = Date.now() - pageEnterTime;
        const timeData = {
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            timeSpentMs: timeSpent,
            timeSpentSec: Math.round(timeSpent / 1000)
        };
        
        const pageTimes = JSON.parse(localStorage.getItem('cybersentinel_page_times') || '[]');
        pageTimes.push(timeData);
        localStorage.setItem('cybersentinel_page_times', JSON.stringify(pageTimes.slice(-20)));
        
        console.log('CyberSentinel: Time on page tracked', timeData);
    });
    
    // Initialize all tracking
    document.addEventListener('DOMContentLoaded', function() {
        trackVisit();
        setupFormTracking();
        setupButtonTracking();
        trackServiceInterest();
        
        // Check for stored data (for debugging)
        if (localStorage.getItem('cybersentinel_debug') === 'true') {
            console.log('CyberSentinel Analytics Data:');
            console.log('Visits:', JSON.parse(localStorage.getItem('cybersentinel_visits') || '[]'));
            console.log('Form Submissions:', JSON.parse(localStorage.getItem('cybersentinel_form_submissions') || '[]'));
            console.log('Button Clicks:', JSON.parse(localStorage.getItem('cybersentinel_button_clicks') || '[]'));
            console.log('Service Interests:', JSON.parse(localStorage.getItem('cybersentinel_service_interests') || '[]'));
            console.log('Page Times:', JSON.parse(localStorage.getItem('cybersentinel_page_times') || '[]'));
        }
    });
    
    // Export data function (for admin use)
    window.cybersentinelExportData = function() {
        return {
            visits: JSON.parse(localStorage.getItem('cybersentinel_visits') || '[]'),
            formSubmissions: JSON.parse(localStorage.getItem('cybersentinel_form_submissions') || '[]'),
            buttonClicks: JSON.parse(localStorage.getItem('cybersentinel_button_clicks') || '[]'),
            serviceInterests: JSON.parse(localStorage.getItem('cybersentinel_service_interests') || '[]'),
            pageTimes: JSON.parse(localStorage.getItem('cybersentinel_page_times') || '[]'),
            exportTime: new Date().toISOString()
        };
    };
    
    // Clear data function (for testing)
    window.cybersentinelClearData = function() {
        localStorage.removeItem('cybersentinel_visits');
        localStorage.removeItem('cybersentinel_form_submissions');
        localStorage.removeItem('cybersentinel_button_clicks');
        localStorage.removeItem('cybersentinel_service_interests');
        localStorage.removeItem('cybersentinel_page_times');
        console.log('CyberSentinel: All analytics data cleared');
    };
    
    // Enable debug mode
    window.cybersentinelDebug = function(enable) {
        localStorage.setItem('cybersentinel_debug', enable ? 'true' : 'false');
        console.log('CyberSentinel: Debug mode', enable ? 'enabled' : 'disabled');
    };
    
    console.log('CyberSentinel Analytics loaded successfully');
})();