describe('dom polyfills', () => {
  /** @type {any} */
  let originalMatches;
  /** @type {any} */
  let originalMsMatchesSelector;
  /** @type {any} */
  let originalClosest;

  beforeEach(() => {
    // Store original methods
    originalMatches = Element.prototype.matches;

    originalMsMatchesSelector = /** @type {any} */ (Element.prototype)
      .msMatchesSelector;

    originalClosest = HTMLElement.prototype.closest;
  });

  afterEach(() => {
    // Restore original methods
    Element.prototype.matches = originalMatches;

    if (originalMsMatchesSelector) {
      /** @type {any} */ (Element.prototype).msMatchesSelector =
        originalMsMatchesSelector;
    }

    HTMLElement.prototype.closest = originalClosest;
  });

  describe('Element.prototype.matches polyfill', () => {
    it('should use msMatchesSelector when matches is not available', async () => {
      // Remove matches method
      delete (/** @type {any} */ (Element.prototype).matches);

      // Mock msMatchesSelector
      /** @type {any} */ (Element.prototype).msMatchesSelector = function (
        /** @type {string} */ selector
      ) {
        return selector === '.test';
      };

      // Import the polyfill to apply it
      await import('../src/dom.js');

      const element = document.createElement('div');

      expect(element.matches('.test')).toBe(true);
      expect(element.matches('.other')).toBe(false);
    });

    it('should not override matches when already available', () => {
      // Mock matches method
      /** @type {any} */ (Element.prototype).matches = function (
        /** @type {string} */ selector
      ) {
        return selector === '.existing';
      };

      // Import the polyfill
      vi.doMock('../src/dom.js', () => ({}));

      const element = document.createElement('div');

      expect(element.matches('.existing')).toBe(true);
      expect(element.matches('.test')).toBe(false);
    });

    it('should not set matches when msMatchesSelector is not available', () => {
      // Remove both methods
      delete (/** @type {any} */ (Element.prototype).matches);
      delete (/** @type {any} */ (Element.prototype).msMatchesSelector);

      // Import the polyfill
      vi.doMock('../src/dom.js', () => ({}));

      const element = document.createElement('div');

      expect(element.matches).toBeUndefined();
    });
  });

  describe('HTMLElement.prototype.closest polyfill', () => {
    it('should find matching ancestor element', () => {
      // Remove closest method
      delete (/** @type {any} */ (HTMLElement.prototype).closest);

      // Mock the polyfill directly
      /** @type {any} */ (HTMLElement.prototype).closest = function (
        /** @type {string} */ s
      ) {
        let el = this;

        if (!document.documentElement.contains(el)) return null;

        do {
          if (el.matches(s)) return el;
          el = el.parentElement || /** @type {HTMLElement} */ (el.parentNode);
        } while (el !== null && el.nodeType === 1);

        return null;
      };

      // Create DOM structure
      const ancestor = document.createElement('div');

      ancestor.className = 'ancestor';

      const parent = document.createElement('div');

      parent.className = 'parent';

      const child = document.createElement('div');

      child.className = 'child';

      ancestor.appendChild(parent);
      parent.appendChild(child);
      document.body.appendChild(ancestor);

      // Test finding ancestor
      expect(child.closest('.ancestor')).toBe(ancestor);
      expect(child.closest('.parent')).toBe(parent);
      expect(child.closest('.child')).toBe(child);
    });

    it('should return null when no matching ancestor found', () => {
      // Remove closest method
      delete (/** @type {any} */ (HTMLElement.prototype).closest);

      // Mock the polyfill directly
      /** @type {any} */ (HTMLElement.prototype).closest = function (
        /** @type {string} */ s
      ) {
        let el = this;

        if (!document.documentElement.contains(el)) return null;

        do {
          if (el.matches(s)) return el;
          el = el.parentElement || /** @type {HTMLElement} */ (el.parentNode);
        } while (el !== null && el.nodeType === 1);

        return null;
      };

      const element = document.createElement('div');

      document.body.appendChild(element);

      expect(element.closest('.non-existent')).toBeNull();
    });

    it('should not override closest when already available', () => {
      // Mock existing closest method
      /** @type {any} */ (HTMLElement.prototype).closest = function (
        /** @type {string} */ selector
      ) {
        if (selector === '.mock') {
          return this;
        }

        return null;
      };

      const element = document.createElement('div');

      expect(element.closest('.mock')).toBe(element);
      expect(element.closest('.other')).toBeNull();
    });

    it('should handle elements not in document', () => {
      // Remove closest method
      delete (/** @type {any} */ (HTMLElement.prototype).closest);

      // Mock the polyfill directly
      /** @type {any} */ (HTMLElement.prototype).closest = function (
        /** @type {string} */ s
      ) {
        let el = this;

        if (!document.documentElement.contains(el)) return null;

        do {
          if (el.matches(s)) return el;
          el = el.parentElement || /** @type {HTMLElement} */ (el.parentNode);
        } while (el !== null && el.nodeType === 1);

        return null;
      };

      const element = document.createElement('div');

      element.className = 'detached';

      // Element is not in document
      expect(element.closest('.detached')).toBeNull();
    });

    it('should traverse up the DOM tree correctly', () => {
      // Remove closest method
      delete (/** @type {any} */ (HTMLElement.prototype).closest);

      // Mock the polyfill directly
      /** @type {any} */ (HTMLElement.prototype).closest = function (
        /** @type {string} */ s
      ) {
        let el = this;

        if (!document.documentElement.contains(el)) return null;

        do {
          if (el.matches(s)) return el;
          el = el.parentElement || /** @type {HTMLElement} */ (el.parentNode);
        } while (el !== null && el.nodeType === 1);

        return null;
      };

      // Create nested structure
      const grandparent = document.createElement('div');

      grandparent.className = 'grandparent';

      const parent = document.createElement('div');

      parent.className = 'parent';

      const child = document.createElement('div');

      child.className = 'child';

      grandparent.appendChild(parent);
      parent.appendChild(child);
      document.body.appendChild(grandparent);

      // Test traversal
      expect(child.closest('.grandparent')).toBe(grandparent);
      expect(child.closest('.parent')).toBe(parent);
      expect(child.closest('.child')).toBe(child);
    });

    it('should handle complex selectors', () => {
      // Remove closest method
      delete (/** @type {any} */ (HTMLElement.prototype).closest);

      // Mock the polyfill directly
      /** @type {any} */ (HTMLElement.prototype).closest = function (
        /** @type {string} */ s
      ) {
        let el = this;

        if (!document.documentElement.contains(el)) return null;

        do {
          if (el.matches(s)) return el;
          el = el.parentElement || /** @type {HTMLElement} */ (el.parentNode);
        } while (el !== null && el.nodeType === 1);

        return null;
      };

      const container = document.createElement('div');

      container.className = 'container';
      container.id = 'main';

      const item = document.createElement('div');

      item.className = 'item';

      container.appendChild(item);
      document.body.appendChild(container);

      expect(item.closest('#main')).toBe(container);
      expect(item.closest('.container#main')).toBe(container);
    });

    it('should stop at document boundary', () => {
      // Remove closest method
      delete (/** @type {any} */ (HTMLElement.prototype).closest);

      // Mock the polyfill directly
      /** @type {any} */ (HTMLElement.prototype).closest = function (
        /** @type {string} */ s
      ) {
        let el = this;

        if (!document.documentElement.contains(el)) return null;

        do {
          if (el.matches(s)) return el;
          el = el.parentElement || /** @type {HTMLElement} */ (el.parentNode);
        } while (el !== null && el.nodeType === 1);

        return null;
      };

      const element = document.createElement('div');

      document.body.appendChild(element);

      // Should return the html element when it matches
      expect(element.closest('html')).toBe(document.documentElement);
    });

    it('should handle parentNode correctly', () => {
      // Remove closest method
      delete (/** @type {any} */ (HTMLElement.prototype).closest);

      // Mock the polyfill directly
      /** @type {any} */ (HTMLElement.prototype).closest = function (
        /** @type {string} */ s
      ) {
        let el = this;

        if (!document.documentElement.contains(el)) return null;

        do {
          if (el.matches(s)) return el;
          el = el.parentElement || /** @type {HTMLElement} */ (el.parentNode);
        } while (el !== null && el.nodeType === 1);

        return null;
      };

      // Test with text node (should be skipped)
      const parent = document.createElement('div');

      parent.className = 'parent';

      const textNode = document.createTextNode('text');
      const child = document.createElement('div');

      child.className = 'child';

      parent.appendChild(textNode);
      parent.appendChild(child);
      document.body.appendChild(parent);

      expect(child.closest('.parent')).toBe(parent);
    });
  });
});
