/**
 * Returns an ease-in function for the given power
 * @param {number} power - Exponent power for the easing curve (2 = quadratic, 3 = cubic, etc.)
 * @returns {(t: number) => number} Easing function that accepts a progress value 0–1 and returns 0–1
 */
function easeInFn(power) {
  return function (t) {
    return Math.pow(t, power);
  };
}

/**
 * Returns an ease-out function for the given power
 * @param {number} power - Exponent power for the easing curve (2 = quadratic, 3 = cubic, etc.)
 * @returns {(t: number) => number} Easing function that accepts a progress value 0–1 and returns 0–1
 */
function easeOutFn(power) {
  return function (t) {
    return 1 - Math.abs(Math.pow(t - 1, power));
  };
}

/**
 * Returns an ease-in-out function for the given power
 * @param {number} power - Exponent power for the easing curve (2 = quadratic, 3 = cubic, etc.)
 * @returns {(t: number) => number} Easing function that accepts a progress value 0–1 and returns 0–1
 */
function easeInOutFn(power) {
  return function (t) {
    return t < 0.5
      ? easeInFn(power)(t * 2) / 2
      : easeOutFn(power)(t * 2 - 1) / 2 + 0.5;
  };
}

/**
 * Quadratic ease-in easing function (alias for easeInQuad)
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeIn(t) {
  return easeInFn(2)(t);
}

/**
 * Quadratic ease-out easing function (alias for easeOutQuad)
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeOut(t) {
  return easeOutFn(2)(t);
}

/**
 * Quadratic ease-in-out easing function (alias for easeInOutQuad)
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeInOut(t) {
  return easeInOutFn(2)(t);
}

/**
 * Cubic ease-in easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeInCubic(t) {
  return easeInFn(3)(t);
}

/**
 * Cubic ease-out easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeOutCubic(t) {
  return easeOutFn(3)(t);
}

/**
 * Cubic ease-in-out easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeInOutCubic(t) {
  return easeInOutFn(3)(t);
}

/**
 * Quadratic ease-in easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeInQuad(t) {
  return easeInFn(2)(t);
}

/**
 * Quadratic ease-out easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeOutQuad(t) {
  return easeOutFn(2)(t);
}

/**
 * Quadratic ease-in-out easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeInOutQuad(t) {
  return easeInOutFn(2)(t);
}

/**
 * Quartic ease-in easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeInQuart(t) {
  return easeInFn(4)(t);
}

/**
 * Quartic ease-out easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeOutQuart(t) {
  return easeOutFn(4)(t);
}

/**
 * Quartic ease-in-out easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeInOutQuart(t) {
  return easeInOutFn(4)(t);
}

/**
 * Quintic ease-in easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeInQuint(t) {
  return easeInFn(5)(t);
}

/**
 * Quintic ease-out easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeOutQuint(t) {
  return easeOutFn(5)(t);
}

/**
 * Quintic ease-in-out easing function
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased value between 0 and 1
 */
export function easeInOutQuint(t) {
  return easeInOutFn(5)(t);
}
