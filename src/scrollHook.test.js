describe('scrollHook', () => {
  /** @type {any} */
  let mockWindow;
  /** @type {any} */
  let originalAddEventListener;

  beforeEach(() => {
    // Mock window.addEventListener
    originalAddEventListener = window.addEventListener;

    mockWindow = {
      addEventListener: vi.fn(),
    };

    window.addEventListener = mockWindow.addEventListener;

    // Mock document.documentElement.scrollTop
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      value: 0,
    });

    // Clear hooks array by re-importing
    vi.resetModules();
  });

  afterEach(() => {
    // Restore original addEventListener
    window.addEventListener = originalAddEventListener;
  });

  describe('add', () => {
    it('should add hook to hooks array', async () => {
      const { add } = await import('../src/scrollHook.js');
      const callback = vi.fn();

      add('test-hook', callback);

      // Simulate scroll event
      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        document.documentElement.scrollTop = 100;
        scrollCallback();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(100);
      }
    });

    it('should add multiple hooks', async () => {
      const { add } = await import('../src/scrollHook.js');
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      add('hook1', callback1);
      add('hook2', callback2);

      // Simulate scroll event
      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        document.documentElement.scrollTop = 150;
        scrollCallback();

        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback1).toHaveBeenCalledWith(150);
        expect(callback2).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledWith(150);
      }
    });

    it('should handle hooks with same name', async () => {
      const { add } = await import('../src/scrollHook.js');
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      add('same-name', callback1);
      add('same-name', callback2);

      // Simulate scroll event
      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        document.documentElement.scrollTop = 200;
        scrollCallback();

        expect(callback1).toHaveBeenCalledWith(200);
        expect(callback2).toHaveBeenCalledWith(200);
      }
    });
  });

  describe('remove', () => {
    it('should remove hook by name', async () => {
      const { add, remove } = await import('../src/scrollHook.js');
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      add('keep-hook', callback1);
      add('remove-hook', callback2);

      remove('remove-hook');

      // Simulate scroll event
      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        document.documentElement.scrollTop = 250;
        scrollCallback();

        expect(callback1).toHaveBeenCalledWith(250);
        expect(callback2).not.toHaveBeenCalled();
      }
    });

    it('should remove all hooks with same name', async () => {
      const { add, remove } = await import('../src/scrollHook.js');
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const callback3 = vi.fn();

      add('same-name', callback1);
      add('same-name', callback2);
      add('different-name', callback3);

      remove('same-name');

      // Simulate scroll event
      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        document.documentElement.scrollTop = 300;
        scrollCallback();

        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).not.toHaveBeenCalled();
        expect(callback3).toHaveBeenCalledWith(300);
      }
    });

    it('should handle removing non-existent hook', async () => {
      const { add, remove } = await import('../src/scrollHook.js');
      const callback = vi.fn();

      add('existing-hook', callback);

      expect(() => {
        remove('non-existent-hook');
      }).not.toThrow();

      // Simulate scroll event
      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        document.documentElement.scrollTop = 350;
        scrollCallback();

        expect(callback).toHaveBeenCalledWith(350);
      }
    });

    it('should handle removing from empty hooks array', async () => {
      const { remove } = await import('../src/scrollHook.js');

      expect(() => {
        remove('any-hook');
      }).not.toThrow();
    });
  });

  describe('scroll event handling', () => {
    it('should call all hooks with current scroll position', async () => {
      const { add } = await import('../src/scrollHook.js');
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const callback3 = vi.fn();

      add('hook1', callback1);
      add('hook2', callback2);
      add('hook3', callback3);

      // Simulate scroll event
      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        document.documentElement.scrollTop = 500;
        scrollCallback();

        expect(callback1).toHaveBeenCalledWith(500);
        expect(callback2).toHaveBeenCalledWith(500);
        expect(callback3).toHaveBeenCalledWith(500);
      }
    });

    it('should handle scroll position changes', async () => {
      const { add } = await import('../src/scrollHook.js');
      const callback = vi.fn();

      add('test-hook', callback);

      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        // First scroll
        document.documentElement.scrollTop = 100;
        scrollCallback();

        // Second scroll
        document.documentElement.scrollTop = 200;
        scrollCallback();

        expect(callback).toHaveBeenNthCalledWith(1, 100);
        expect(callback).toHaveBeenNthCalledWith(2, 200);
      }
    });

    it('should handle zero scroll position', async () => {
      const { add } = await import('../src/scrollHook.js');
      const callback = vi.fn();

      add('test-hook', callback);

      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        document.documentElement.scrollTop = 0;
        scrollCallback();

        expect(callback).toHaveBeenCalledWith(0);
      }
    });

    it('should handle hooks with same name', async () => {
      const { add } = await import('../src/scrollHook.js');
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      add('same-name', callback1);
      add('same-name', callback2);

      // Simulate scroll event
      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        document.documentElement.scrollTop = 200;
        scrollCallback();

        expect(callback1).toHaveBeenCalledWith(200);
        expect(callback2).toHaveBeenCalledWith(200);
      }
    });
  });

  describe('initialization', () => {
    it('should set up scroll event listener on module load', async () => {
      // Import the module to trigger initialization
      await import('../src/scrollHook.js');

      // Module should have set up event listener during initialization
      const scrollCalls = mockWindow.addEventListener.mock.calls.filter(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      );

      expect(scrollCalls).toHaveLength(1);
      expect(scrollCalls[0][0]).toBe('scroll');
      expect(scrollCalls[0][1]).toBeInstanceOf(Function);
      expect(scrollCalls[0][2]).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle hooks that throw errors', async () => {
      const { add } = await import('../src/scrollHook.js');
      const errorCallback = vi.fn(() => {
        throw new Error('Hook error');
      });
      const normalCallback = vi.fn();

      // Suppress console.error for this test
      const originalConsoleError = console.error;

      console.error = vi.fn();

      add('error-hook', errorCallback);
      add('normal-hook', normalCallback);

      const scrollCallback = mockWindow.addEventListener.mock.calls.find(
        /** @type {(call: any[]) => boolean} */
        (call) => call[0] === 'scroll'
      )?.[1];

      if (scrollCallback) {
        expect(() => {
          document.documentElement.scrollTop = 400;
          scrollCallback();
        }).not.toThrow();

        expect(errorCallback).toHaveBeenCalled();
        expect(normalCallback).toHaveBeenCalled();
      }

      // Restore console.error
      console.error = originalConsoleError;
    });
  });
});
