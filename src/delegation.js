import { eventParameterActive } from './eventOptions.js';
import queue from './queue.js';
const NS = 'delegate-';
let dragging = false;
let DEBUG = false;
/** @type {TouchEvent|Event|null} */
let lasttouch;
/** @type {number|null} */
let to;
let clicking = false;

/**
 * Register an event handler for delegated events.
 * When registering for 'resize', the callback is invoked immediately with the current state
 * before being added to the queue for future resize events.
 * @param {string} key - Name of the event (matches `data-action` attribute value, or 'resize')
 * @param {(event: Event, target: Element) => void} fn - Callback receiving the event and the matched element
 * @returns {void}
 */
function register(key, fn) {
  if (key === 'resize') {
    // Immediately invoke with a synthetic event so the caller gets the current state on registration
    fn(new Event('resize'), document.body);
  }

  queue.add(NS + key, fn);
}

/**
 * Deregister an event handler for delegated events
 * @param {string} key - Name of the event
 * @param {(event: Event, target: Element) => void} fn - Function callback
 * @returns {void}
 */
function deregister(key, fn) {
  queue.remove(NS + key, fn);
}

/**
 * Trigger a delegated event
 * @param {string} action - Action name to trigger
 * @param {Event} ev - Event object
 * @param {Element} target - Target element
 * @returns {void}
 */
function trigger(action, ev, target) {
  if (!action) {
    return;
  }

  if (DEBUG) {
    window.console.warn('trigger', action, ev, target);
  }

  queue.run(NS + action, ev, target);
}

/**
 * Handle touch move events to detect dragging
 * @param {TouchEvent} ev - Touch event object
 * @returns {void}
 */
function moving(ev) {
  lasttouch = ev;
  dragging = true;
}

/**
 * Handle click and touch events with drag detection
 * @param {Event|TouchEvent} ev - Event object
 * @returns {void}
 */
function clickHandler(ev) {
  const clickevent = ev || lasttouch;
  const clicktarget =
    clickevent &&
    'touches' in clickevent &&
    clickevent.touches &&
    clickevent.touches.length
      ? /** @type {TouchEvent} */ (ev).touches[0]?.target
      : ev.target;
  const target =
    clicktarget && typeof clicktarget === 'object' && 'closest' in clicktarget
      ? /** @type {Element} */ (clicktarget).closest('[data-action]')
      : null;
  let action;

  /**
   * Execute the action on the target element
   * @returns {void}
   */
  function doTarget() {
    if (
      target &&
      typeof target === 'object' &&
      target !== null &&
      'dataset' in target
    ) {
      const elementTarget = /** @type {HTMLElement} */ (target);
      const dataset = elementTarget.dataset;

      if (dataset && 'action' in dataset) {
        action = /** @type {string} */ (dataset.action);
        trigger(action, ev, elementTarget);
      }
    }
  }

  /**
   * Determine whether this event should be suppressed.
   * Returns true (suppress) if a drag or rapid repeat click is in progress;
   * returns false (allow) if this is a fresh, clean click.
   * @returns {boolean} True if the event should be suppressed, false if it should be handled
   */
  function clickOrDrag() {
    if (clicking || dragging) {
      return true;
    }

    clicking = true;

    setTimeout(() => {
      clicking = false;
    }, 260); //eslint-disable-line

    return false;
  }

  if (clickOrDrag()) {
    dragging = false;

    return;
  }

  doTarget();

  dragging = false;
}

/**
 * Handle resize events with debouncing
 * @param {Event} e - Resize event object
 * @returns {void}
 */
function resizeHandler(e) {
  clearTimeout(to || 0);

  to = setTimeout(() => {
    const target =
      e.target && typeof e.target === 'object' && 'closest' in e.target
        ? /** @type {Element} */ (e.target)
        : document.body;

    trigger('resize', e, target);
  }, 100);
}

/**
 * Enable or disable debug mode
 * @param {boolean} boo - Whether to enable debug mode
 * @returns {void}
 */
function debug(boo) {
  DEBUG = boo;
}

/**
 * Initialize event delegation system
 * @returns {void}
 */
(function init() {
  document.body.addEventListener(
    'touchend',
    clickHandler,
    eventParameterActive
  );

  document.body.addEventListener('click', clickHandler, eventParameterActive);
  document.body.addEventListener('touchmove', moving, eventParameterActive);

  window.addEventListener('resize', resizeHandler, false);
  window.addEventListener('orientationchange', resizeHandler, false);

  // Trigger initial resize with mock event
  resizeHandler(new Event('resize'));
})();

export { register, deregister, trigger, debug };
