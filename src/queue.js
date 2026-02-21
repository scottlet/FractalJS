/** @type {Record<string, ((ev: Event | undefined, target: Element | null) => void)[]>} */
const queues = {};

/**
 * Add a callback to a named queue
 * @param {string} name - The name of the queue
 * @param {(ev: Event | undefined, target: Element | null) => void} cb - The callback function to add
 * @returns {void}
 */
function add(name, cb) {
  if (!queues[name]) {
    queues[name] = [];
  }

  /** @type {((ev: Event | undefined, target: Element | null) => void)[]} */ (
    queues[name]
  ).push(cb);
}

/**
 * Remove a callback from a named queue
 * @param {string} name - The name of the queue
 * @param {(ev: Event | undefined, target: Element | null) => void} cb - The callback function to remove
 * @returns {void}
 */
function remove(name, cb) {
  if (queues[name]) {
    queues[name] =
      /** @type {((ev: Event | undefined, target: Element | null) => void)[]} */ (
        queues[name]
      ).filter((item) => item !== cb);
  }
}

/**
 * Run all callbacks in a named queue
 * @param {string} name - The name of the queue
 * @param {Event} [ev] - Event object passed as the first argument to each callback
 * @param {Element | null} [binding] - Element passed as the second argument to each callback and as `this`
 * @returns {void}
 */
function run(name, ev, binding) {
  const queue = queues[name];

  binding = binding || null;

  /**
   * Execute a single queue item
   * @param {(ev: Event | undefined, target: Element | null) => void} item - The callback function to execute
   * @returns {void}
   */
  function runItem(item) {
    if (typeof item === 'function') {
      item.call(binding, ev, binding);
    }
  }

  if (!queue || !queue.length) {
    return;
  }

  queue.forEach(runItem);
}

/**
 * Clear all queues
 * @returns {void}
 */
function clear() {
  Object.keys(queues).forEach((key) => {
    delete queues[key];
  });
}

const queueRunner = {
  add,
  remove,
  run,
  clear,
};

export default queueRunner;
