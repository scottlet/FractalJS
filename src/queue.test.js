import queueRunner from '../src/queue.js';

describe('queue', () => {
  beforeEach(() => {
    // Clear all queues before each test
    queueRunner.clear?.();
    vi.resetModules();
  });

  afterEach(() => {
    // Clear all queues after each test
    queueRunner.clear?.();
    vi.resetModules();
  });

  describe('add', () => {
    it('should add callback to queue', () => {
      const callback = vi.fn();

      queueRunner.add('test-queue', callback);

      // Test that it was added by running the queue
      queueRunner.run('test-queue', /** @type {Event} */ ({}), null);

      expect(callback).toHaveBeenCalled();
    });

    it('should create queue if it does not exist', () => {
      const callback = vi.fn();

      expect(() => {
        queueRunner.add('new-queue', callback);
      }).not.toThrow();
    });

    it('should add multiple callbacks to the same queue', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      queueRunner.add('test-queue', callback1);
      queueRunner.add('test-queue', callback2);

      queueRunner.run('test-queue', /** @type {Event} */ ({}), null);

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove specific callback from queue', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      queueRunner.add('test-queue', callback1);
      queueRunner.add('test-queue', callback2);

      queueRunner.remove('test-queue', callback1);
      queueRunner.run('test-queue', /** @type {Event} */ ({}), null);

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });

    it('should handle removing from non-existent queue', () => {
      const callback = vi.fn();

      expect(() => {
        queueRunner.remove('non-existent', callback);
      }).not.toThrow();
    });

    it('should handle removing non-existent callback', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      queueRunner.add('test-queue', callback1);

      expect(() => {
        queueRunner.remove('test-queue', callback2);
      }).not.toThrow();
    });
  });

  describe('run', () => {
    it('should run all callbacks in queue', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const mockEvent = /** @type {Event} */ ({ type: 'test' });
      const mockBinding = /** @type {Element} */ (
        /** @type {unknown} */ ({ id: 'test' })
      );

      queueRunner.add('test-queue', callback1);
      queueRunner.add('test-queue', callback2);

      queueRunner.run('test-queue', mockEvent, mockBinding);

      expect(callback1).toHaveBeenCalledWith(mockEvent, mockBinding);
      expect(callback2).toHaveBeenCalledWith(mockEvent, mockBinding);
    });

    it('should handle empty queue', () => {
      expect(() => {
        queueRunner.run('empty-queue', /** @type {Event} */ ({}), null);
      }).not.toThrow();
    });

    it('should handle non-existent queue', () => {
      expect(() => {
        queueRunner.run('non-existent', /** @type {Event} */ ({}), null);
      }).not.toThrow();
    });

    it('should use binding context for callbacks', () => {
      const mockBinding = { value: 'test' };

      queueRunner.add(
        'test-queue',
        function (/** @type {any} */ event, /** @type {any} */ binding) {
          this.value = binding.value;
        }
      );

      queueRunner.run(
        'test-queue',
        /** @type {Event} */ ({}),
        /** @type {Element | null} */ (/** @type {unknown} */ (mockBinding))
      );

      expect(mockBinding.value).toBe('test');
    });

    it('should handle null binding', () => {
      const callback = vi.fn();

      queueRunner.add('test-queue', callback);
      queueRunner.run('test-queue', /** @type {Event} */ ({}), null);

      expect(callback).toHaveBeenCalledWith({}, null);
    });
  });
});
