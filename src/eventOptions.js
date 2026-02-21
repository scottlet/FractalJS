/**
 * Check if passive event listeners are supported
 * @returns {boolean} True if passive events are supported
 */
function checkPassive() {
  let supportsPassiveOption = false;

  try {
    const options = Object.defineProperty({}, 'passive', {
      get: () => {
        supportsPassiveOption = true;

        return supportsPassiveOption;
      },
    });

    window.addEventListener(
      'test',
      () => {
        /** */
      },
      options
    );
  } catch (e) {} //eslint-disable-line

  return supportsPassiveOption;
}

/**
 * Get event options based on passive support
 * @param {boolean} eventType - Whether to use passive events
 * @returns {{passive: boolean} | boolean} Event options object or boolean
 */
function eventOptions(eventType) {
  return checkPassive() ? { passive: eventType } : eventType;
}

/** @type {{passive: boolean} | boolean} */
const eventParameterPassive = eventOptions(true);
/** @type {{passive: boolean} | boolean} */
const eventParameterActive = eventOptions(false);

export { eventParameterPassive, eventParameterActive };
