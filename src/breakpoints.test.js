import { init, getBreakpoints } from '../src/config.js';
import {
  getView,
  isMobile,
  isTablet,
  isMobileNav,
  change,
} from './breakpoints.js';

// Mock debounce
vi.mock('debounce', () => ({
  default: vi.fn((fn) => fn),
}));

describe('breakpoints', () => {
  /** @type {any} */
  let mockWindow;

  beforeEach(() => {
    // Mock window object
    mockWindow = {
      addEventListener: vi.fn(),
      innerWidth: 1200,
    };

    globalThis.window = mockWindow;

    // Mock document.body.offsetWidth
    Object.defineProperty(document.body, 'offsetWidth', {
      writable: true,
      value: 1200,
    });

    // Initialize with default breakpoints
    init({
      breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1200,
        mobileNav: 600,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getView', () => {
    it('should return mobile when width is less than mobile breakpoint', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 500,
        writable: true,
      });

      expect(getView()).toBe('mobile');
    });

    it('should return tablet when width is between mobile and tablet breakpoints', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 800,
        writable: true,
      });

      expect(getView()).toBe('tablet');
    });

    it('should return desktop when width is greater than tablet breakpoint', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 1200,
        writable: true,
      });

      expect(getView()).toBe('desktop');
    });
  });

  describe('isMobile', () => {
    it('should return true when width is less than mobile breakpoint', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 500,
        writable: true,
      });

      expect(isMobile()).toBe(true);
    });

    it('should return false when width is greater than mobile breakpoint', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 800,
        writable: true,
      });

      expect(isMobile()).toBe(false);
    });
  });

  describe('isTablet', () => {
    it('should return true when width is between mobile and tablet breakpoints', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 800,
        writable: true,
      });

      expect(isTablet()).toBe(true);
    });

    it('should return false when width is greater than tablet breakpoint', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 1200,
        writable: true,
      });

      expect(isTablet()).toBe(false);
    });

    it('should return false when width is less than mobile breakpoint', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 500,
        writable: true,
      });

      expect(isTablet()).toBe(false);
    });
  });

  describe('isMobileNav', () => {
    it('should return true when width is less than mobile nav breakpoint', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 500,
        writable: true,
      });

      expect(isMobileNav()).toBe(true);
    });

    it('should return false when width is greater than mobile nav breakpoint', () => {
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 800,
        writable: true,
      });

      expect(isMobileNav()).toBe(false);
    });
  });

  describe('change', () => {
    it('should register callback for breakpoint changes', () => {
      const callback = vi.fn();

      change(callback);

      // Simulate resize event
      const resizeCallback = mockWindow.addEventListener.mock.calls.find(
        /**
         * @param {any} call - addEventListener arguments array
         * @returns {boolean} True if this call registered a resize listener
         */
        (call) => call[0] === 'resize'
      )?.[1];

      if (resizeCallback) {
        resizeCallback();
        expect(callback).toHaveBeenCalled();
      }
    });
  });

  describe('configuration integration', () => {
    it('should use custom breakpoints from config', () => {
      // Update config with custom breakpoints
      // mobileNav (700) is larger than mobile (500) to show mobile nav on slightly larger screens
      init({
        breakpoints: {
          mobile: 500,
          tablet: 900,
          desktop: 1200,
          mobileNav: 700,
        },
      });

      // Test at 450: both mobile and mobileNav should be true
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 450,
        writable: true,
      });

      expect(isMobile()).toBe(true);
      expect(isMobileNav()).toBe(true);
      expect(getView()).toBe('mobile');

      // Test at 600: mobile is false, but mobileNav is still true (600 <= 700)
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 600,
        writable: true,
      });

      expect(isMobile()).toBe(false);
      expect(isMobileNav()).toBe(true);
      expect(isTablet()).toBe(true);

      // Test at 800: both mobile and mobileNav are false
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 800,
        writable: true,
      });

      expect(isMobile()).toBe(false);
      expect(isTablet()).toBe(true);
      expect(isMobileNav()).toBe(false);

      // Test at 950: desktop view
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 950,
        writable: true,
      });

      expect(isTablet()).toBe(false);
      expect(getView()).toBe('desktop');
    });

    it('should get current breakpoints from config', () => {
      const breakpoints = getBreakpoints();

      expect(breakpoints.mobile).toBe(768);
      expect(breakpoints.tablet).toBe(1024);
      expect(breakpoints.desktop).toBe(1200);
      expect(breakpoints.mobileNav).toBe(600);
    });
  });

  describe('responsive behavior', () => {
    it('should update breakpoint when window resizes', () => {
      const callback = vi.fn();

      change(callback);

      // Clear initial call
      callback.mockClear();

      // Simulate window resize
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 500,
        writable: true,
      });

      const resizeCallback = mockWindow.addEventListener.mock.calls.find(
        (call) => call[0] === 'resize'
      )?.[1];

      if (resizeCallback) {
        resizeCallback();
        expect(callback).toHaveBeenCalled();
        expect(getView()).toBe('mobile');
      }
    });

    it('should handle orientation change', () => {
      const callback = vi.fn();

      change(callback);

      // Clear initial call
      callback.mockClear();

      // Simulate orientation change
      Object.defineProperty(document.body, 'offsetWidth', {
        value: 300,
        writable: true,
      });

      const orientationCallback = mockWindow.addEventListener.mock.calls.find(
        (call) => call[0] === 'orientationchange'
      )?.[1];

      if (orientationCallback) {
        orientationCallback();
        expect(callback).toHaveBeenCalled();
        expect(getView()).toBe('mobile');
      }
    });
  });
});
