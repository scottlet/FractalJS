// @ts-ignore
if (!Element.prototype.matches && Element.prototype.msMatchesSelector) {
  // @ts-ignore
  Element.prototype.matches = Element.prototype.msMatchesSelector;
}

if (!HTMLElement.prototype.closest) {
  /**
   * Polyfill for Element.prototype.closest
   * @param {string} s - CSS selector string
   * @returns {Element|null} Closest matching element or null
   */
  HTMLElement.prototype.closest = function (s) {
    let el = this;

    if (!document.documentElement.contains(el)) return null;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || /** @type {HTMLElement} */ (el.parentNode);
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}
