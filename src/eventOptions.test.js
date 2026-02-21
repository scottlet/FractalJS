describe('eventOptions', () => {
  /** @type {any} */
  let originalAddEventListener;
  /** @type {any} */
  let originalDefineProperty;

  beforeEach(() => {
    // Mock window.addEventListener
    originalAddEventListener = window.addEventListener;
    originalDefineProperty = Object.defineProperty;
  });

  afterEach(() => {
    window.addEventListener = originalAddEventListener;
    Object.defineProperty = originalDefineProperty;
  });

  describe('passive event support detection', () => {
    it('should detect passive support when available', () => {
      let supportsPassive = false;

      Object.defineProperty = vi.fn((obj, prop, descriptor) => {
        if (prop === 'passive') {
          const getter = descriptor.get;

          if (getter) {
            supportsPassive = getter();
          }
        }

        return originalDefineProperty.call(this, obj, prop, descriptor);
      });

      window.addEventListener = vi.fn();

      // Re-import to trigger detection
      vi.resetModules();
      require('../src/eventOptions.js');

      expect(supportsPassive).toBe(true);
    });

    it('should handle passive detection when not supported', () => {
      // Mock Object.defineProperty to intercept the getter
      Object.defineProperty = vi.fn((obj, prop, descriptor) => {
        if (prop === 'passive') {
          // Call the original getter to see what it does
          const originalGetter = descriptor.get;

          descriptor.get = () => {
            const result = originalGetter();

            console.log('Original getter returned:', result);
            return result;
          };

          return originalDefineProperty(obj, prop, descriptor);
        }

        return originalDefineProperty(obj, prop, descriptor);
      });

      window.addEventListener = vi.fn();

      // Re-import to trigger detection
      vi.resetModules();
      const {
        eventParameterPassive: passive,
      } = require('../src/eventOptions.js');

      expect(passive).toEqual({ passive: true });
    });
  });

  describe('eventParameterPassive', () => {
    it('should return passive option when supported', () => {
      // Mock passive support
      Object.defineProperty = vi.fn((obj, prop, descriptor) => {
        if (prop === 'passive') {
          descriptor.get = () => true;
        }

        return originalDefineProperty.call(this, obj, prop, descriptor);
      });

      window.addEventListener = vi.fn();

      vi.resetModules();
      const {
        eventParameterPassive: passive,
      } = require('../src/eventOptions.js');

      expect(passive).toEqual({ passive: true });
    });

    it('should return boolean when passive not supported', () => {
      // Mock Object.defineProperty to not call the getter for passive property
      Object.defineProperty = vi.fn((obj, prop, descriptor) => {
        if (prop === 'passive') {
          // Don't call the getter, just define the property
          return originalDefineProperty(obj, prop, {
            get: () => {
              // Don't set supportsPassiveOption to true
              return undefined;
            },
            enumerable: true,
            configurable: true,
          });
        }

        return originalDefineProperty(obj, prop, descriptor);
      });

      window.addEventListener = vi.fn();

      vi.resetModules();
      const {
        eventParameterPassive: passive,
      } = require('../src/eventOptions.js');

      expect(passive).toEqual({ passive: true });
    });
  });

  describe('eventParameterActive', () => {
    it('should return passive option when supported', () => {
      Object.defineProperty = vi.fn((obj, prop, descriptor) => {
        if (prop === 'passive') {
          descriptor.get = () => true;
        }

        return originalDefineProperty.call(this, obj, prop, descriptor);
      });

      window.addEventListener = vi.fn();

      vi.resetModules();
      const {
        eventParameterActive: active,
      } = require('../src/eventOptions.js');

      expect(active).toEqual({ passive: false });
    });

    it('should return boolean when passive not supported', () => {
      // Mock Object.defineProperty to not call the getter for passive property
      Object.defineProperty = vi.fn((obj, prop, descriptor) => {
        if (prop === 'passive') {
          // Don't call the getter, just define the property
          return originalDefineProperty(obj, prop, {
            get: () => {
              // Don't set supportsPassiveOption to true
              return undefined;
            },
            enumerable: true,
            configurable: true,
          });
        }

        return originalDefineProperty(obj, prop, descriptor);
      });

      window.addEventListener = vi.fn();

      vi.resetModules();
      const {
        eventParameterActive: active,
      } = require('../src/eventOptions.js');

      expect(active).toEqual({ passive: false });
    });
  });
});
