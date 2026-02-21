import AnimationQueue from '../src/animationQueue.js';

describe('animationQueue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('constructor', () => {
    it('should create empty queue when no array provided', () => {
      const queue = AnimationQueue();

      expect(queue).toHaveProperty('start');
      expect(queue).toHaveProperty('add');
      expect(queue).toHaveProperty('addItem');
    });

    it('should use provided array as initial queue', () => {
      const initialQueue = [
        { fn: vi.fn(), time: 100 },
        { fn: vi.fn(), time: 200 },
      ];

      const queue = AnimationQueue(initialQueue);

      expect(queue).toHaveProperty('start');
      expect(queue).toHaveProperty('add');
      expect(queue).toHaveProperty('addItem');
    });
  });

  describe('addItem', () => {
    it('should add item to queue', () => {
      const queue = AnimationQueue();
      const item = { fn: vi.fn(), time: 100 };

      queue.addItem(item);

      queue.start();

      vi.advanceTimersByTime(100);

      expect(item.fn).toHaveBeenCalled();
    });

    it('should add multiple items to queue', () => {
      const queue = AnimationQueue();
      const item1 = { fn: vi.fn(), time: 100 };
      const item2 = { fn: vi.fn(), time: 200 };

      queue.addItem(item1);
      queue.addItem(item2);

      queue.start();

      vi.advanceTimersByTime(300);

      expect(item1.fn).toHaveBeenCalled();
      expect(item2.fn).toHaveBeenCalled();
    });
  });

  describe('add', () => {
    it('should replace entire queue', () => {
      const queue = AnimationQueue();
      const newItem1 = { fn: vi.fn(), time: 50 };
      const newItem2 = { fn: vi.fn(), time: 100 };

      queue.add([newItem1, newItem2]);

      queue.start();

      vi.advanceTimersByTime(150);

      expect(newItem1.fn).toHaveBeenCalled();
      expect(newItem2.fn).toHaveBeenCalled();
    });
  });

  describe('start', () => {
    it('should execute animations in sequence with correct timing', () => {
      const queue = AnimationQueue();
      const item1 = { fn: vi.fn(), time: 100 };
      const item2 = { fn: vi.fn(), time: 200 };
      const item3 = { fn: vi.fn(), time: 300 };

      queue.addItem(item1);
      queue.addItem(item2);
      queue.addItem(item3);

      queue.start();

      // Check timing sequence
      expect(item1.fn).not.toHaveBeenCalled();
      expect(item2.fn).not.toHaveBeenCalled();
      expect(item3.fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(item1.fn).toHaveBeenCalled();
      expect(item2.fn).not.toHaveBeenCalled();
      expect(item3.fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(200);
      expect(item2.fn).toHaveBeenCalled();
      expect(item3.fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(300);
      expect(item3.fn).toHaveBeenCalled();
    });

    it('should not start if already running', () => {
      const queue = AnimationQueue();
      const item = { fn: vi.fn(), time: 100 };

      queue.addItem(item);

      queue.start();
      queue.start(); // Try to start again

      vi.advanceTimersByTime(100);

      expect(item.fn).toHaveBeenCalledTimes(1);
    });

    it('should call callback after all animations complete', () => {
      const callback = vi.fn();
      const queue = AnimationQueue([], callback);
      const item1 = { fn: vi.fn(), time: 100 };
      const item2 = { fn: vi.fn(), time: 200 };

      queue.addItem(item1);
      queue.addItem(item2);

      queue.start();

      // Callback should be called before the last animation completes
      vi.advanceTimersByTime(250);

      expect(callback).toHaveBeenCalled();
    });

    it('should handle empty queue', () => {
      const queue = AnimationQueue();

      expect(() => {
        queue.start();
      }).not.toThrow();
    });

    it('should handle queue with zero-time items', () => {
      const queue = AnimationQueue();
      const item = { fn: vi.fn(), time: 0 };

      queue.addItem(item);
      queue.start();

      vi.advanceTimersByTime(0);

      expect(item.fn).toHaveBeenCalled();
    });
  });

  describe('timing accuracy', () => {
    it('should accumulate time correctly for sequential animations', () => {
      const queue = AnimationQueue();
      /** @type {number[]} */
      const callTimes = [];

      const item1 = {
        fn: () => callTimes.push(Date.now()),
        time: 100,
      };
      const item2 = {
        fn: () => callTimes.push(Date.now()),
        time: 150,
      };
      const item3 = {
        fn: () => callTimes.push(Date.now()),
        time: 200,
      };

      queue.addItem(item1);
      queue.addItem(item2);
      queue.addItem(item3);

      const startTime = Date.now();

      queue.start();

      vi.advanceTimersByTime(450);

      expect(callTimes).toHaveLength(3);
      expect(/** @type {number} */ (callTimes[0]) - startTime).toBe(100);
      expect(/** @type {number} */ (callTimes[1]) - startTime).toBe(250); // 100 + 150
      expect(/** @type {number} */ (callTimes[2]) - startTime).toBe(450); // 100 + 150 + 200
    });
  });
});
