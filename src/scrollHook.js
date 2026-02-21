import { eventParameterPassive } from './eventOptions.js';

/** @type {Array<{name: string, fn: (scrolledBy: number) => void}>} */
let hooks = [];

/**
 * Add a scroll hook
 * @param {string} name - Unique name for the hook (used to remove it later)
 * @param {(scrollTop: number) => void} fn - Called on every scroll event with the current scrollTop value
 * @returns {void}
 */
function add(name, fn) {
  hooks.push({
    name,
    fn,
  });
}

/**
 * Process all scroll hooks, passing the current scrollTop to each
 * @returns {void}
 */
function processHooks() {
  const scroll = document.documentElement.scrollTop;

  hooks.forEach((hook) => {
    try {
      hook.fn(scroll);
    } catch (error) {
      // Continue processing other hooks even if one throws an error
      // eslint-disable-next-line no-console
      console.error('Error in scroll hook:', error);
    }
  });
}

/**
 * Remove a scroll hook by name
 * @param {string} name - The name of the hook to remove
 * @returns {void}
 */
function remove(name) {
  hooks = hooks.filter((obj) => {
    return obj.name !== name;
  });
}

(function scrollHook() {
  window.addEventListener('scroll', processHooks, eventParameterPassive);
})();

export { add, remove };
