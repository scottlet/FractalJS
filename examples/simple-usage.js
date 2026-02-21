// Example 1: Initialize with custom breakpoints
import { init } from 'fractal.js';

init({
  breakpoints: {
    mobile: 600,    // Mobile: ≤600px
    tablet: 900,    // Tablet: ≤900px  
    desktop: 1200,  // Desktop: >900px
    mobileNav: 500  // Mobile nav: ≤500px
  }
});

// Example 2: Import individual utilities in other modules
import { isMobile, isTablet, getView } from 'fractal.js';

// Check current breakpoint
if (isMobile()) {
  console.log('Mobile layout - show mobile navigation');
} else if (isTablet()) {
  console.log('Tablet layout - show tablet navigation');
} else {
  console.log('Desktop layout - show desktop navigation');
}

// Get current view
const currentView = getView(); // 'mobile', 'tablet', or 'desktop'
console.log('Current view:', currentView);

// Example 3: Listen for breakpoint changes
import { change } from 'fractal.js';

change((newView) => {
  console.log('Breakpoint changed to:', newView);
  
  // Update UI based on new breakpoint
  switch (newView) {
    case 'mobile':
      // Enable mobile-specific features
      break;
    case 'tablet':
      // Enable tablet-specific features
      break;
    case 'desktop':
      // Enable desktop-specific features
      break;
  }
});

// Example 4: Get configuration
import { getConfig } from 'fractal.js';

const config = getConfig();
console.log('Current breakpoints:', config.breakpoints);

// Example 5: Update configuration later
import { updateConfig } from 'fractal.js';

updateConfig({
  breakpoints: {
    mobile: 768,    // Update mobile breakpoint
    tablet: 1024,   // Update tablet breakpoint
    desktop: 1200,  // Update desktop breakpoint
    mobileNav: 600  // Update mobile nav breakpoint
  }
});
