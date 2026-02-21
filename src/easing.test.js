import {
  easeIn,
  easeOut,
  easeInOut,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
} from '../src/easing.js';

describe('easing', () => {
  describe('easeIn', () => {
    it('should return function that calculates easeIn', () => {
      expect(typeof easeIn).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeIn(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeIn(1)).toBe(1);
    });

    it('should return value between 0 and 1 for input between 0 and 1', () => {
      // For power=2, easeIn is quadratic: t^2
      expect(easeIn(0.5)).toBe(0.25);
      expect(easeIn(0.25)).toBe(0.0625);
      expect(easeIn(0.75)).toBe(0.5625);
    });
  });

  describe('easeOut', () => {
    it('should return function that calculates easeOut', () => {
      expect(typeof easeOut).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeOut(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeOut(1)).toBe(1);
    });

    it('should return value between 0 and 1 for input between 0 and 1', () => {
      // For power=2, easeOut is quadratic: 1 - (1-t)^2
      expect(easeOut(0.5)).toBeCloseTo(0.75);
      expect(easeOut(0.25)).toBeCloseTo(0.4375);
      expect(easeOut(0.75)).toBeCloseTo(0.9375);
    });
  });

  describe('easeInOut', () => {
    it('should return function that calculates easeInOut', () => {
      expect(typeof easeInOut).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeInOut(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeInOut(1)).toBe(1);
    });

    it('should return 0.5 when input is 0.5', () => {
      expect(easeInOut(0.5)).toBe(0.5);
    });

    it('should return value between 0 and 1 for input between 0 and 1', () => {
      // For power=2, easeInOut is quadratic with smooth acceleration/deceleration
      expect(easeInOut(0.25)).toBeCloseTo(0.125);
      expect(easeInOut(0.75)).toBeCloseTo(0.875);
    });
  });

  describe('easeInCubic', () => {
    it('should return function that calculates easeInCubic', () => {
      expect(typeof easeInCubic).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeInCubic(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeInCubic(1)).toBe(1);
    });

    it('should calculate cubic easeIn', () => {
      expect(easeInCubic(0.5)).toBeCloseTo(0.125);
      expect(easeInCubic(0.25)).toBeCloseTo(0.0156);
      expect(easeInCubic(0.75)).toBeCloseTo(0.4219);
    });
  });

  describe('easeOutCubic', () => {
    it('should return function that calculates easeOutCubic', () => {
      expect(typeof easeOutCubic).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeOutCubic(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeOutCubic(1)).toBe(1);
    });

    it('should calculate cubic easeOut', () => {
      expect(easeOutCubic(0.5)).toBeCloseTo(0.875);
      expect(easeOutCubic(0.25)).toBeCloseTo(0.578);
      expect(easeOutCubic(0.75)).toBeCloseTo(0.984);
    });
  });

  describe('easeInOutCubic', () => {
    it('should return function that calculates easeInOutCubic', () => {
      expect(typeof easeInOutCubic).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeInOutCubic(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeInOutCubic(1)).toBe(1);
    });

    it('should return 0.5 when input is 0.5', () => {
      expect(easeInOutCubic(0.5)).toBe(0.5);
    });

    it('should calculate cubic easeInOut', () => {
      expect(easeInOutCubic(0.25)).toBeCloseTo(0.062);
      expect(easeInOutCubic(0.75)).toBeCloseTo(0.938);
    });
  });

  describe('easeInQuad', () => {
    it('should return function that calculates easeInQuad', () => {
      expect(typeof easeInQuad).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeInQuad(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeInQuad(1)).toBe(1);
    });

    it('should calculate quadratic easeIn', () => {
      expect(easeInQuad(0.5)).toBe(0.25);
      expect(easeInQuad(0.25)).toBe(0.0625);
      expect(easeInQuad(0.75)).toBe(0.5625);
    });
  });

  describe('easeOutQuad', () => {
    it('should return function that calculates easeOutQuad', () => {
      expect(typeof easeOutQuad).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeOutQuad(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeOutQuad(1)).toBe(1);
    });

    it('should calculate quadratic easeOut', () => {
      expect(easeOutQuad(0.5)).toBe(0.75);
      expect(easeOutQuad(0.25)).toBe(0.4375);
      expect(easeOutQuad(0.75)).toBe(0.9375);
    });
  });

  describe('easeInOutQuad', () => {
    it('should return function that calculates easeInOutQuad', () => {
      expect(typeof easeInOutQuad).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeInOutQuad(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeInOutQuad(1)).toBe(1);
    });

    it('should return 0.5 when input is 0.5', () => {
      expect(easeInOutQuad(0.5)).toBe(0.5);
    });

    it('should calculate quadratic easeInOut', () => {
      expect(easeInOutQuad(0.25)).toBeCloseTo(0.125);
      expect(easeInOutQuad(0.75)).toBeCloseTo(0.875);
    });
  });

  describe('easeInQuart', () => {
    it('should return function that calculates easeInQuart', () => {
      expect(typeof easeInQuart).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeInQuart(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeInQuart(1)).toBe(1);
    });

    it('should calculate quartic easeIn', () => {
      expect(easeInQuart(0.5)).toBeCloseTo(0.0625);
      expect(easeInQuart(0.25)).toBeCloseTo(0.0039);
      expect(easeInQuart(0.75)).toBeCloseTo(0.3164);
    });
  });

  describe('easeOutQuart', () => {
    it('should return function that calculates easeOutQuart', () => {
      expect(typeof easeOutQuart).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeOutQuart(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeOutQuart(1)).toBe(1);
    });

    it('should calculate quartic easeOut', () => {
      expect(easeOutQuart(0.5)).toBeCloseTo(0.9375);
      expect(easeOutQuart(0.25)).toBeCloseTo(0.6836);
      expect(easeOutQuart(0.75)).toBeCloseTo(0.9961);
    });
  });

  describe('easeInOutQuart', () => {
    it('should return function that calculates easeInOutQuart', () => {
      expect(typeof easeInOutQuart).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeInOutQuart(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeInOutQuart(1)).toBe(1);
    });

    it('should return 0.5 when input is 0.5', () => {
      expect(easeInOutQuart(0.5)).toBe(0.5);
    });

    it('should calculate quartic easeInOut', () => {
      expect(easeInOutQuart(0.25)).toBeCloseTo(0.031);
      expect(easeInOutQuart(0.75)).toBeCloseTo(0.969);
    });
  });

  describe('easeOutQuint', () => {
    it('should return 0 when input is 0', () => {
      expect(easeOutQuint(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeOutQuint(1)).toBe(1);
    });

    it('should calculate quintic easeOut', () => {
      expect(easeOutQuint(0.5)).toBeCloseTo(0.96875);
      expect(easeOutQuint(0.25)).toBeCloseTo(0.7627);
      expect(easeOutQuint(0.75)).toBeCloseTo(0.9976);
    });
  });

  describe('easeInQuint', () => {
    it('should return 0 when input is 0', () => {
      expect(easeInQuint(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeInQuint(1)).toBe(1);
    });

    it('should calculate quintic easeIn', () => {
      expect(easeInQuint(0.5)).toBe(0.03125);
      expect(easeInQuint(0.25)).toBe(0.0009765625);
      expect(easeInQuint(0.75)).toBe(0.2373046875);
    });
  });

  describe('easeInOutQuint', () => {
    it('should return function that calculates easeInOutQuint', () => {
      expect(typeof easeInOutQuint).toBe('function');
    });

    it('should return 0 when input is 0', () => {
      expect(easeInOutQuint(0)).toBe(0);
    });

    it('should return 1 when input is 1', () => {
      expect(easeInOutQuint(1)).toBe(1);
    });

    it('should return 0.5 when input is 0.5', () => {
      expect(easeInOutQuint(0.5)).toBe(0.5);
    });

    it('should calculate quintic easeInOut', () => {
      expect(easeInOutQuint(0.25)).toBeCloseTo(0.015625);
      expect(easeInOutQuint(0.75)).toBeCloseTo(0.984375);
    });
  });

  describe('mathematical correctness', () => {
    it('should follow easeIn formula: t^2', () => {
      // For power=2, easeIn should return t^2
      expect(easeIn(0.3)).toBeCloseTo(0.09);
      expect(easeIn(0.7)).toBeCloseTo(0.49);
    });

    it('should follow easeOut formula: 1 - (1-t)^2', () => {
      // For power=2, easeOut should return 1 - (1-t)^2
      expect(easeOut(0.3)).toBeCloseTo(0.51);
      expect(easeOut(0.7)).toBeCloseTo(0.91);
    });

    it('should follow easeInCubic formula: t^3', () => {
      expect(easeInCubic(0.3)).toBeCloseTo(0.027);
      expect(easeInCubic(0.7)).toBeCloseTo(0.343);
    });

    it('should follow easeOutCubic formula: 1 - (1-t)^3', () => {
      expect(easeOutCubic(0.3)).toBeCloseTo(0.657);
      expect(easeOutCubic(0.7)).toBeCloseTo(0.973);
    });

    it('should follow easeInQuad formula: t^2', () => {
      expect(easeInQuad(0.3)).toBeCloseTo(0.09);
      expect(easeInQuad(0.7)).toBeCloseTo(0.49);
    });

    it('should follow easeOutQuad formula: 1 - (1-t)^2', () => {
      expect(easeOutQuad(0.3)).toBeCloseTo(0.51);
      expect(easeOutQuad(0.7)).toBeCloseTo(0.91);
    });

    it('should follow easeInQuart formula: t^4', () => {
      expect(easeInQuart(0.5)).toBeCloseTo(0.0625);
      expect(easeInQuart(0.8)).toBeCloseTo(0.4096);
    });

    it('should follow easeOutQuart formula: 1 - (1-t)^4', () => {
      expect(easeOutQuart(0.5)).toBeCloseTo(0.9375);
      expect(easeOutQuart(0.8)).toBeCloseTo(0.9984);
    });

    it('should follow easeInQuint formula: t^5', () => {
      expect(easeInQuint(0.5)).toBeCloseTo(0.03125);
      expect(easeInQuint(0.8)).toBeCloseTo(0.32768);
    });

    it('should follow easeOutQuint formula: 1 - (1 - t)^5', () => {
      expect(easeOutQuint(0.5)).toBeCloseTo(0.96875);
      expect(easeOutQuint(0.8)).toBeCloseTo(0.99968);
    });
  });
});
