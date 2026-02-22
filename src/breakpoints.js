import queue from './queue.js';
import debounce from 'debounce';
import { eventParameterPassive } from './eventOptions.js';
import { getBreakpoints } from './config.js';

let isMobileLayout = false;
let isTabletLayout = false;
let isMobileNavigation = false;

/**
 * Set mobile and mobile navigation states based on current viewport width.
 * mobileNav breakpoint is optional and should be LARGER than mobile breakpoint
 * to allow showing mobile navigation on slightly larger screens (e.g., small tablets).
 * @returns {void}
 */
function setIsMobile() {
  const breakpoints = getBreakpoints();
  const width = document.body.offsetWidth;

  isMobileLayout = width <= breakpoints.mobile;
  // mobileNav is optional and should be larger than mobile
  // If not set, fall back to mobile breakpoint
  const mobileNavBreakpoint = breakpoints.mobileNav ?? breakpoints.mobile;

  isMobileNavigation = width <= mobileNavBreakpoint;
}

/**
 * Set tablet state based on current viewport width.
 * `tablet` is the maximum width of the tablet range; desktop is anything above it.
 * If `tablet` is not set, anything wider than mobile is considered tablet.
 * @returns {void}
 */
function setIsTablet() {
  const breakpoints = getBreakpoints();
  const width = document.body.offsetWidth;

  if (breakpoints.tablet) {
    // tablet is the max-width upper bound: mobile < width <= tablet
    isTabletLayout = width > breakpoints.mobile && width <= breakpoints.tablet;
  } else {
    // No tablet upper bound defined: anything wider than mobile is tablet
    isTabletLayout = width > breakpoints.mobile;
  }
}

/**
 * Get current breakpoint view
 * @returns {'mobile' | 'tablet' | 'desktop'} Current view
 */
export function getView() {
  setIsMobile();
  setIsTablet();
  return isMobileLayout ? 'mobile' : isTabletLayout ? 'tablet' : 'desktop';
}

/**
 * Check if current layout is mobile
 * @returns {boolean} True if mobile layout
 */
export function isMobile() {
  setIsMobile();
  return isMobileLayout;
}

/**
 * Check if current layout is tablet
 * @returns {boolean} True if tablet layout
 */
export function isTablet() {
  setIsTablet();
  return isTabletLayout;
}

/**
 * Check if mobile navigation should be shown
 * @returns {boolean} True if mobile navigation
 */
export function isMobileNav() {
  setIsMobile();
  return isMobileNavigation;
}

/**
 * Register callback for breakpoint changes
 * @param {(view: 'mobile' | 'tablet' | 'desktop') => void} cb - Callback invoked with the new view name on each resize
 * @returns {void}
 */
export function change(cb) {
  // Create adapter function to match queue's expected signature
  const adapter =
    /** @type {(ev: Event | undefined, target: Element | null) => void} */ (
      () => {
        const currentView = getView();

        cb(currentView);
      }
    );

  queue.add('breakpoints', adapter);
}

/**
 * Initialize breakpoint system with debounced resize and orientationchange listeners.
 * Call once at app startup; subsequent calls will add additional listeners.
 * @returns {{getView: () => 'mobile' | 'tablet' | 'desktop', isMobile: () => boolean, isTablet: () => boolean, isMobileNav: () => boolean, change: (cb: (view: 'mobile' | 'tablet' | 'desktop') => void) => void}} Breakpoint API
 */
function init() {
  const DEBOUNCE_MS = 200;

  queue.add('breakpoints', () => {
    setIsMobile();
    setIsTablet();
  });

  queue.run('breakpoints');

  const callbackRunner = debounce((event) => {
    queue.run('breakpoints', event, null);
  }, DEBOUNCE_MS);

  window.addEventListener('resize', callbackRunner, eventParameterPassive);

  window.addEventListener(
    'orientationchange',
    callbackRunner,
    eventParameterPassive
  );

  return {
    getView,
    isMobile,
    isTablet,
    isMobileNav,
    change,
  };
}

export default init;
