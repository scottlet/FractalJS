import { register, deregister, trigger, debug } from '../src/delegation.js';

describe('delegation', () => {
  /** @type {any} */
  let mockEvent;
  /** @type {HTMLElement} */
  let mockTarget;

  beforeEach(() => {
    // Reset debug state
    debug(false);

    // Mock event
    mockEvent = {
      target: document.createElement('div'),
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };

    // Mock target with data-action
    mockTarget = document.createElement('div');
    mockTarget.dataset.action = 'test-action';

    // Setup DOM
    document.body.innerHTML = '';
    document.body.appendChild(mockTarget);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('register', () => {
    it('should register a callback for an action', () => {
      const callback = vi.fn();

      register('test-action', callback);

      // Simulate click
      mockEvent.target = mockTarget;

      // Trigger the action manually
      trigger('test-action', mockEvent, mockTarget);

      expect(callback).toHaveBeenCalledWith(mockEvent, mockTarget);
    });

    it('should register multiple callbacks for the same action', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      register('test-action', callback1);
      register('test-action', callback2);

      trigger('test-action', mockEvent, mockTarget);

      expect(callback1).toHaveBeenCalledWith(mockEvent, mockTarget);
      expect(callback2).toHaveBeenCalledWith(mockEvent, mockTarget);
    });

    it('should handle resize events immediately', () => {
      const callback = vi.fn();

      register('resize', callback);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('deregister', () => {
    it('should remove a specific callback', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      register('test-action', callback1);
      register('test-action', callback2);

      deregister('test-action', callback1);

      trigger('test-action', mockEvent, mockTarget);

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledWith(mockEvent, mockTarget);
    });

    it('should handle deregistering non-existent callbacks', () => {
      const callback = vi.fn();

      expect(() => {
        deregister('non-existent', callback);
      }).not.toThrow();
    });
  });

  describe('trigger', () => {
    it('should not trigger when action is empty', () => {
      const callback = vi.fn();

      register('test-action', callback);

      trigger('', mockEvent, mockTarget);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should not trigger when action is null', () => {
      const callback = vi.fn();

      register('test-action', callback);

      trigger(
        /** @type {string} */ (/** @type {unknown} */ (null)),
        mockEvent,
        mockTarget
      );

      expect(callback).not.toHaveBeenCalled();
    });

    it('should trigger with correct parameters', () => {
      const callback = vi.fn();

      register('test-action', callback);

      trigger('test-action', mockEvent, mockTarget);

      expect(callback).toHaveBeenCalledWith(mockEvent, mockTarget);
    });
  });

  describe('debug', () => {
    it('should enable debug mode', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockReturnValue(undefined);

      debug(true);
      trigger('test-action', mockEvent, mockTarget);

      expect(consoleSpy).toHaveBeenCalledWith(
        'trigger',
        'test-action',
        mockEvent,
        mockTarget
      );

      consoleSpy.mockRestore();
    });

    it('should disable debug mode', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockReturnValue(undefined);

      debug(false);
      trigger('test-action', mockEvent, mockTarget);

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('clickHandler integration', () => {
    it('should handle click events with data-action', () => {
      const callback = vi.fn();

      register('test-action', callback);

      // Simulate click on element with data-action
      const clickEvent = new Event('click', { bubbles: true });

      mockTarget.dispatchEvent(clickEvent);

      expect(callback).toHaveBeenCalled();
    });

    it('should not trigger when element has no data-action', () => {
      const callback = vi.fn();

      register('test-action', callback);

      const elementWithoutAction = document.createElement('div');

      document.body.appendChild(elementWithoutAction);

      const clickEvent = new Event('click', { bubbles: true });

      elementWithoutAction.dispatchEvent(clickEvent);

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
