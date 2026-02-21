/**
 * Observe a set of elements with the Intersection Observer API.
 * A separate observer instance is created per element.
 * @param {object} options - IntersectionObserver options (root, rootMargin, threshold)
 * @param {Array<HTMLElement>} objs - Elements to observe
 * @param {(target: HTMLElement) => void} [cb] - Called when an element enters the viewport
 * @param {(target: HTMLElement) => void} [rcb] - Called when an element leaves the viewport
 * @returns {void}
 */
function intersection(options, objs, cb, rcb) {
  /**
   * Handle a single intersection observer entry
   * @param {IntersectionObserverEntry} entry - The intersection observer entry
   * @returns {void}
   */
  function showItems(entry) {
    const item = entry.target;

    if (entry.isIntersecting) {
      if (entry.intersectionRatio > 0) {
        if (typeof cb === 'function') {
          cb(/** @type {HTMLElement} */ (item));
        }
      }
    } else {
      if (typeof rcb === 'function') {
        rcb(/** @type {HTMLElement} */ (item));
      }
    }
  }

  /**
   * IntersectionObserver callback — iterates entries and calls showItems for each
   * @param {Array<IntersectionObserverEntry>} entries - Array of intersection entries
   * @param {IntersectionObserver} _observer - The observer instance (unused; required by the API signature)
   * @returns {void}
   */
  function appear(entries, _observer) {
    entries.forEach(showItems.bind(_observer));
  }

  objs.forEach((elem) => {
    const observer = new IntersectionObserver(appear, options);

    if (elem) {
      observer.observe(elem);
    }
  });
}

export { intersection };
