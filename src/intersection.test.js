import { intersection } from '../src/intersection.js';

describe('intersection', () => {
  /** @type {HTMLElement[]} */
  let mockElements;
  /** @type {any} */
  let mockObserver;

  beforeEach(() => {
    mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      callback: null,
    };

    // Create a proper constructor mock
    /**
     * @param {any} callback - IntersectionObserver callback function
     * @returns {object} Mock observer instance
     */
    function MockIntersectionObserver(/** @type {any} */ callback) {
      mockObserver.callback = callback;
      return mockObserver;
    }

    // Make it a spy
    const MockObserverSpy = vi.fn(MockIntersectionObserver);

    // Add missing properties to match IntersectionObserver interface
    MockObserverSpy.prototype.root = /** @type {any} */ (null);
    MockObserverSpy.prototype.rootMargin = '';
    MockObserverSpy.prototype.thresholds = /** @type {any[]} */ ([]);
    MockObserverSpy.prototype.takeRecords = vi.fn();

    /** @type {any} */ (globalThis.IntersectionObserver) = MockObserverSpy;

    // Create mock elements
    mockElements = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
    ];

    mockElements.forEach((el) => {
      document.body.appendChild(el);
    });
  });

  describe('basic functionality', () => {
    it('should create IntersectionObserver for each element', () => {
      const callback = vi.fn();
      const options = { threshold: 0.5 };

      intersection(options, mockElements, callback);

      expect(globalThis.IntersectionObserver).toHaveBeenCalledTimes(3);
      expect(mockObserver.observe).toHaveBeenCalledTimes(3);
    });

    it('should not observe null elements', () => {
      const callback = vi.fn();
      const elementsWithNull = [...mockElements, null];

      intersection(
        {},
        /** @type {HTMLElement[]} */ (elementsWithNull),
        callback
      );

      expect(mockObserver.observe).toHaveBeenCalledTimes(3);
    });

    it('should handle empty elements array', () => {
      const callback = vi.fn();

      expect(() => {
        intersection({}, [], callback);
      }).not.toThrow();

      expect(globalThis.IntersectionObserver).not.toHaveBeenCalled();
    });
  });

  describe('intersection callback', () => {
    it('should call callback when element is intersecting', () => {
      const callback = vi.fn();
      const options = { threshold: 0.5 };

      intersection(options, mockElements, callback);

      // Simulate intersection
      const entries = [
        {
          target: mockElements[0],
          isIntersecting: true,
          intersectionRatio: 0.8,
        },
      ];

      mockObserver.callback(entries);

      expect(callback).toHaveBeenCalledWith(mockElements[0]);
    });

    it('should not call callback when intersection ratio is 0', () => {
      const callback = vi.fn();
      const options = { threshold: 0.5 };

      intersection(options, mockElements, callback);

      const entries = [
        {
          target: mockElements[0],
          isIntersecting: true,
          intersectionRatio: 0,
        },
      ];

      mockObserver.callback(entries);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should call reverse callback when element is not intersecting', () => {
      const callback = vi.fn();
      const reverseCallback = vi.fn();
      const options = { threshold: 0.5 };

      intersection(options, mockElements, callback, reverseCallback);

      const entries = [
        {
          target: mockElements[0],
          isIntersecting: false,
          intersectionRatio: 0,
        },
      ];

      mockObserver.callback(entries);

      expect(callback).not.toHaveBeenCalled();
      expect(reverseCallback).toHaveBeenCalledWith(mockElements[0]);
    });

    it('should not call reverse callback when element is intersecting', () => {
      const callback = vi.fn();
      const reverseCallback = vi.fn();
      const options = { threshold: 0.5 };

      intersection(options, mockElements, callback, reverseCallback);

      const entries = [
        {
          target: mockElements[0],
          isIntersecting: true,
          intersectionRatio: 0.8,
        },
      ];

      mockObserver.callback(entries);

      expect(callback).toHaveBeenCalledWith(mockElements[0]);
      expect(reverseCallback).not.toHaveBeenCalled();
    });
  });

  describe('multiple entries', () => {
    it('should handle multiple intersection entries', () => {
      const callback = vi.fn();
      const reverseCallback = vi.fn();

      intersection({}, mockElements, callback, reverseCallback);

      const entries = [
        {
          target: mockElements[0],
          isIntersecting: true,
          intersectionRatio: 0.8,
        },
        {
          target: mockElements[1],
          isIntersecting: false,
          intersectionRatio: 0,
        },
        {
          target: mockElements[2],
          isIntersecting: true,
          intersectionRatio: 0.6,
        },
      ];

      mockObserver.callback(entries);

      expect(callback).toHaveBeenCalledWith(mockElements[0]);
      expect(callback).toHaveBeenCalledWith(mockElements[2]);
      expect(reverseCallback).toHaveBeenCalledWith(mockElements[1]);
      expect(callback).toHaveBeenCalledTimes(2);
      expect(reverseCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('callback validation', () => {
    it('should handle non-function callbacks gracefully', () => {
      expect(() => {
        intersection(
          {},
          mockElements,
          /** @type {any} */ ('not-a-function'),
          /** @type {any} */ ('also-not-a-function')
        );
      }).not.toThrow();

      // Simulate intersection
      const entries = [
        {
          target: mockElements[0],
          isIntersecting: true,
          intersectionRatio: 0.8,
        },
      ];

      expect(() => {
        mockObserver.callback(entries);
      }).not.toThrow();
    });

    it('should handle missing reverse callback', () => {
      const callback = vi.fn();

      intersection({}, mockElements, callback);

      const entries = [
        {
          target: mockElements[0],
          isIntersecting: false,
          intersectionRatio: 0,
        },
      ];

      expect(() => {
        mockObserver.callback(entries);
      }).not.toThrow();
    });
  });

  describe('observer options', () => {
    it('should pass options to IntersectionObserver', () => {
      const callback = vi.fn();
      const options = {
        threshold: 0.3,
        rootMargin: '10px',
        root: document.createElement('div'),
      };

      intersection(options, mockElements, callback);

      expect(globalThis.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        options
      );
    });
  });
});
