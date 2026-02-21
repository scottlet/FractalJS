/**
 * Default configuration for FractalJS
 * @type {{breakpoints: {mobile: number, tablet: number, desktop: number, mobileNav: number}, debug: boolean}}
 */
const DEFAULT_CONFIG = {
  breakpoints: {
    mobile: 599,
    tablet: 600,
    desktop: 1024,
    mobileNav: 599,
  },
  debug: false,
};

/**
 * Current global configuration store for FractalJS
 * @type {{breakpoints: {mobile: number, tablet: number, desktop: number, mobileNav: number} & Record<string, number>, debug: boolean}}
 */
let globalConfig = {
  ...DEFAULT_CONFIG,
  breakpoints: { ...DEFAULT_CONFIG.breakpoints },
};

/**
 * Initialize FractalJS with global configuration
 *
 * Supports both overriding default breakpoints and adding custom breakpoints:
 * - Default breakpoints: mobile (599px), tablet (600px), desktop (1024px), mobileNav (599px)
 * - Override example: init({breakpoints: {mobile: 768}})
 * - Custom example: init({breakpoints: {tabletNav: 900}})
 * - Combined: init({breakpoints: {mobile: 768, customBreakpoint: 1200}})
 * @param {{breakpoints?: Record<string, number>, debug?: boolean}} [config] - Configuration object with optional breakpoints (can override defaults or add custom) and debug flag
 * @returns {{breakpoints: {mobile: number, tablet: number, desktop: number, mobileNav: number} & Record<string, number>, debug: boolean}} Configuration object with merged breakpoints (defaults + overrides + custom)
 */
export function init(config = {}) {
  globalConfig = {
    breakpoints: {
      ...DEFAULT_CONFIG.breakpoints,
      ...config.breakpoints,
    },
    debug: config.debug ?? DEFAULT_CONFIG.debug,
  };

  return globalConfig;
}

/**
 * Get current global configuration
 * @returns {{breakpoints: {mobile: number, tablet: number, desktop: number, mobileNav: number} & Record<string, number>, debug: boolean}} Current configuration
 */
export function getConfig() {
  return globalConfig;
}

/**
 * Get breakpoint configuration
 * @returns {{mobile: number, tablet: number, desktop: number, mobileNav: number} & Record<string, number>} Breakpoint configuration (includes defaults: mobile, tablet, desktop, mobileNav + any custom breakpoints)
 */
export function getBreakpoints() {
  return globalConfig.breakpoints;
}

/**
 * Update configuration (merges with existing config, does not reset to defaults)
 * @param {{breakpoints?: Record<string, number>, debug?: boolean}} updates - Configuration updates
 * @returns {{breakpoints: {mobile: number, tablet: number, desktop: number, mobileNav: number} & Record<string, number>, debug: boolean}} Updated configuration
 */
export function updateConfig(updates) {
  globalConfig = {
    breakpoints: {
      ...globalConfig.breakpoints,
      ...(updates.breakpoints ?? {}),
    },
    debug: updates.debug ?? globalConfig.debug,
  };

  return globalConfig;
}

export default {
  init,
  getConfig,
  getBreakpoints,
  updateConfig,
};
