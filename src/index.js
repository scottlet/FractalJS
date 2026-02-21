import './dom.js';

// Animation Queue
export { default as AnimationQueue } from './animationQueue.js';

// Breakpoints
export {
  default as breakpoints,
  isMobile,
  isTablet,
  isMobileNav,
  getView,
  change,
} from './breakpoints.js';

// Delegation
export { register, deregister, trigger, debug } from './delegation.js';

// Event Options
export { eventParameterPassive, eventParameterActive } from './eventOptions.js';

// Easing
export {
  easeIn,
  easeOut,
  easeInOut,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
} from './easing.js';

// Intersection Observer
export { intersection } from './intersection.js';

// Scroll Hook
export {
  add as addScrollHook,
  remove as removeScrollHook,
} from './scrollHook.js';

// Queue
import queueModule from './queue.js';
export { queueModule as queueRunner };
export const {
  add: addToQueue,
  remove: removeFromQueue,
  run: runQueue,
} = queueModule;

// Configuration
export { init, getConfig, getBreakpoints, updateConfig } from './config.js';
