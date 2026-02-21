/**
 * Start executing animations in the queue
 * @param {Array<{fn: () => void, time: number}>} queue - Array of animation objects
 * @param {boolean} running - Whether the queue is currently running (captured by closure; prevents re-entry)
 * @param {() => void} [callback] - Optional callback fired 2000ms before the end of the total queue duration
 * @returns {() => void} Function to start the queue; once called the queue cannot be restarted
 */
function startQueue(queue, running, callback) {
  let time = 0;
  let i;
  let l;

  return function sQueue() {
    if (running) {
      return;
    }

    running = true;

    for (i = 0, l = queue.length; i < l; i++) {
      const animation = queue[i];

      if (animation) {
        time += animation.time;
        setTimeout(animation.fn, time);
      }
    }

    if (callback) {
      setTimeout(callback, time - 1000 * 2);
    }
  };
}

/**
 * Replace the entire queue with a new one
 * @param {Array<{fn: () => void, time: number}>} queue - Current queue array
 * @returns {(addToQueue: Array<{fn: () => void, time: number}>) => void} Function to replace the queue
 */
function add(queue) {
  /**
   * Replace the queue with a new array
   * @param {Array<{fn: () => void, time: number}>} addToQueue - New queue array
   */
  return function sAdd(addToQueue) {
    // Clear the current queue and add all items from the new queue
    queue.length = 0;
    queue.push(...addToQueue);
  };
}

/**
 * Add an item to the queue
 * @param {Array<{fn: () => void, time: number}>} queue - Current queue array
 * @returns {(item: {fn: () => void, time: number}) => void} Function to add an item to the queue
 */
function addItem(queue) {
  /**
   * Add an animation item to the queue
   * @param {{fn: () => void, time: number}} item - Animation item to add
   */
  return function sAddItem(item) {
    queue.push(item);
  };
}

/**
 * Create an animation queue
 * @param {Array<{fn: () => void, time: number}>} [aqueue] - Optional initial queue
 * @param {() => void} [cb] - Optional callback fired 2000ms before the end of the total queue duration
 * @returns {{start: () => void, add: (addToQueue: Array<{fn: () => void, time: number}>) => void, addItem: (item: {fn: () => void, time: number}) => void}} Animation queue API
 */
function AnimationQueue(aqueue, cb) {
  const running = false;
  /** @type {Array<{fn: () => void, time: number}>} */
  let queue = [];

  if (Array.isArray(aqueue)) {
    queue = aqueue;
  }

  return {
    start: startQueue(queue, running, cb),
    add: add(queue),
    addItem: addItem(queue),
  };
}

export default AnimationQueue;
