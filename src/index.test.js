describe('index exports', () => {
  it('should export all named exports correctly', async () => {
    const indexModule = await import('../src/index.js');

    // Check individual named exports
    expect(indexModule).toHaveProperty('AnimationQueue');
    expect(indexModule).toHaveProperty('breakpoints');
    expect(indexModule).toHaveProperty('register');
    expect(indexModule).toHaveProperty('deregister');
    expect(indexModule).toHaveProperty('trigger');
    expect(indexModule).toHaveProperty('debug');
    expect(indexModule).toHaveProperty('eventParameterPassive');
    expect(indexModule).toHaveProperty('eventParameterActive');
    expect(indexModule).toHaveProperty('easeIn');
    expect(indexModule).toHaveProperty('easeOut');
    expect(indexModule).toHaveProperty('easeInOut');
    expect(indexModule).toHaveProperty('easeInCubic');
    expect(indexModule).toHaveProperty('easeOutCubic');
    expect(indexModule).toHaveProperty('easeInOutCubic');
    expect(indexModule).toHaveProperty('easeInQuad');
    expect(indexModule).toHaveProperty('easeOutQuad');
    expect(indexModule).toHaveProperty('easeInOutQuad');
    expect(indexModule).toHaveProperty('easeInQuart');
    expect(indexModule).toHaveProperty('easeOutQuart');
    expect(indexModule).toHaveProperty('easeInOutQuart');
    expect(indexModule).toHaveProperty('easeInQuint');
    expect(indexModule).toHaveProperty('easeOutQuint');
    expect(indexModule).toHaveProperty('easeInOutQuint');
    expect(indexModule).toHaveProperty('intersection');
    expect(indexModule).toHaveProperty('addScrollHook');
    expect(indexModule).toHaveProperty('removeScrollHook');
    expect(indexModule).toHaveProperty('addToQueue');
    expect(indexModule).toHaveProperty('removeFromQueue');
    expect(indexModule).toHaveProperty('runQueue');
    expect(indexModule).toHaveProperty('init');
    expect(indexModule).toHaveProperty('getConfig');
    expect(indexModule).toHaveProperty('getBreakpoints');
    expect(indexModule).toHaveProperty('updateConfig');
    expect(indexModule).toHaveProperty('isMobile');
    expect(indexModule).toHaveProperty('isTablet');
    expect(indexModule).toHaveProperty('isMobileNav');
    expect(indexModule).toHaveProperty('getView');
    expect(indexModule).toHaveProperty('change');
    expect(indexModule).toHaveProperty('queueRunner');
  });

  it('should export AnimationQueue function', async () => {
    const { AnimationQueue } = await import('../src/index.js');

    expect(typeof AnimationQueue).toBe('function');
  });

  it('should export breakpoints function and utilities', async () => {
    const { breakpoints, isMobile, isTablet, isMobileNav, getView, change } =
      await import('../src/index.js');

    expect(typeof breakpoints).toBe('function');
    expect(typeof isMobile).toBe('function');
    expect(typeof isTablet).toBe('function');
    expect(typeof isMobileNav).toBe('function');
    expect(typeof getView).toBe('function');
    expect(typeof change).toBe('function');
  });

  it('should export delegation functions', async () => {
    const { register, deregister, trigger, debug } =
      await import('../src/index.js');

    expect(typeof register).toBe('function');
    expect(typeof deregister).toBe('function');
    expect(typeof trigger).toBe('function');
    expect(typeof debug).toBe('function');
  });

  it('should export event options', async () => {
    const { eventParameterPassive, eventParameterActive } =
      await import('../src/index.js');

    expect(typeof eventParameterPassive).toBeDefined();
    expect(typeof eventParameterActive).toBeDefined();
  });

  it('should export easing functions', async () => {
    const {
      easeIn,
      easeOut,
      easeInOut,
      easeInQuad,
      easeOutQuad,
      easeInOutQuad,
      easeOutQuint,
      easeInQuint,
    } = await import('../src/index.js');

    expect(typeof easeIn).toBe('function');
    expect(typeof easeOut).toBe('function');
    expect(typeof easeInOut).toBe('function');
    expect(typeof easeInQuad).toBe('function');
    expect(typeof easeOutQuad).toBe('function');
    expect(typeof easeInOutQuad).toBe('function');
    expect(typeof easeOutQuint).toBe('function');
    expect(typeof easeInQuint).toBe('function');
  });

  it('should export intersection function', async () => {
    const { intersection } = await import('../src/index.js');

    expect(typeof intersection).toBe('function');
  });

  it('should export scroll hook functions', async () => {
    const { addScrollHook, removeScrollHook } = await import('../src/index.js');

    expect(typeof addScrollHook).toBe('function');
    expect(typeof removeScrollHook).toBe('function');
  });

  it('should export queue functions', async () => {
    const { addToQueue, removeFromQueue, runQueue } =
      await import('../src/index.js');

    expect(typeof addToQueue).toBe('function');
    expect(typeof removeFromQueue).toBe('function');
    expect(typeof runQueue).toBe('function');
  });

  it('should export configuration functions', async () => {
    const { init, getConfig, getBreakpoints, updateConfig } =
      await import('../src/index.js');

    expect(typeof init).toBe('function');
    expect(typeof getConfig).toBe('function');
    expect(typeof getBreakpoints).toBe('function');
    expect(typeof updateConfig).toBe('function');
  });

  it('should have consistent export structure', async () => {
    const indexModule = await import('../src/index.js');
    const exportNames = Object.keys(indexModule);

    // Check that all expected exports are present
    const expectedExports = [
      'AnimationQueue',
      'breakpoints',
      'register',
      'deregister',
      'trigger',
      'debug',
      'eventParameterPassive',
      'eventParameterActive',
      'easeIn',
      'easeOut',
      'easeInOut',
      'easeInCubic',
      'easeOutCubic',
      'easeInOutCubic',
      'easeInQuad',
      'easeOutQuad',
      'easeInOutQuad',
      'easeInQuart',
      'easeOutQuart',
      'easeInOutQuart',
      'easeInQuint',
      'easeOutQuint',
      'easeInOutQuint',
      'intersection',
      'addScrollHook',
      'removeScrollHook',
      'addToQueue',
      'removeFromQueue',
      'runQueue',
      'init',
      'getConfig',
      'getBreakpoints',
      'updateConfig',
      'isMobile',
      'isTablet',
      'isMobileNav',
      'getView',
      'change',
      'queueRunner',
    ];

    expect(exportNames).toEqual(expect.arrayContaining(expectedExports));
  });

  it('should export functional modules that can be called', async () => {
    const { AnimationQueue, breakpoints, intersection } =
      await import('../src/index.js');

    // These should be functions that can be called
    expect(typeof AnimationQueue).toBe('function');
    expect(typeof breakpoints).toBe('function');
    expect(typeof intersection).toBe('function');

    // They should not throw when called with basic parameters
    expect(() => AnimationQueue()).not.toThrow();
    expect(() => breakpoints()).not.toThrow();
    expect(() => intersection({}, [], vi.fn())).not.toThrow();
  });

  it('should export individual utilities with expected properties', async () => {
    const {
      register,
      deregister,
      trigger,
      debug,
      easeIn,
      easeOut,
      easeInOut,
      addScrollHook,
      removeScrollHook,
      addToQueue,
      removeFromQueue,
      runQueue,
    } = await import('../src/index.js');

    // Check delegation functions
    expect(typeof register).toBe('function');
    expect(typeof deregister).toBe('function');
    expect(typeof trigger).toBe('function');
    expect(typeof debug).toBe('function');

    // Check easing functions
    expect(typeof easeIn).toBe('function');
    expect(typeof easeOut).toBe('function');
    expect(typeof easeInOut).toBe('function');

    // Check scroll hook functions
    expect(typeof addScrollHook).toBe('function');
    expect(typeof removeScrollHook).toBe('function');

    // Check queue functions
    expect(typeof addToQueue).toBe('function');
    expect(typeof removeFromQueue).toBe('function');
    expect(typeof runQueue).toBe('function');
  });
});
