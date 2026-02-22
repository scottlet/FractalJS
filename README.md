# FractalJS

A tiny JavaScript library for modern DOM manipulation and event handling.

## Features

- **Event Delegation** - Efficient event handling with automatic drag detection
- **Touch Support** - Full touch and mouse event compatibility
- **Animation Queue** - Smooth animations with queuing system
- **Breakpoints** - Responsive breakpoint management
- **Intersection Observer** - Easy viewport detection
- **Zero Dependencies** - Except for the optional `debounce` package
- **Tree Shakeable** - Import only what you need
- **TypeScript Support** - Full JSDoc documentation with TS types

## Installation

```bash
npm install @ojoho/fractaljs
```

## Usage

### ES Modules

```javascript
import {
  register,
  deregister,
  breakpoints,
  AnimationQueue,
} from '@ojoho/fractaljs';

// Event delegation
register('click', (event, target) => {
  console.log('Clicked:', target);
});
```

### CommonJS

```javascript
const {
  register,
  deregister,
  breakpoints,
  AnimationQueue,
} = require('@ojoho/fractaljs');
```

### UMD (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/@ojoho/fractaljs/dist/index.min.js"></script>
<script>
  const { register } = FractalJS;
  // Use the library
</script>
```

## Configuration

FractalJS can be configured globally using the `init()` function from the config module. This is optional - the library works out of the box with sensible defaults.

### `init(config)`

Initialize FractalJS with custom configuration.

```javascript
import { init } from '@ojoho/fractaljs';

// Use defaults (no configuration needed)
// Defaults: mobile: 599px, tablet: 1024px, mobileNav: 599px

// Override default breakpoints
init({
  breakpoints: {
    mobile: 768,
    tablet: 1024,
  },
});

// Add custom breakpoints (keeps defaults)
init({
  breakpoints: {
    tabletNav: 900,
    largeDesktop: 1440,
  },
});

// Combine: override defaults AND add custom
init({
  breakpoints: {
    mobile: 768, // Override default
    customBreakpoint: 1200, // Add custom
  },
  debug: true, // Enable debug mode
});
```

### Default Breakpoints

| Breakpoint  | Default Value | Description                                                                                                              |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `mobile`    | 599px         | Maximum width for mobile layout (0–599px)                                                                                |
| `tablet`    | 1024px        | Maximum width for tablet layout (600–1024px); anything above is desktop                                                  |
| `mobileNav` | 599px         | Maximum width for showing mobile navigation (optional - can be set larger than `mobile` to cover small tablets too)      |

**Note:** `mobileNav` defaults to the same value as `mobile`. Set it higher to show mobile-style navigation on slightly larger devices (e.g., small tablets) without changing the mobile layout breakpoint.

### Configuration API

```javascript
import {
  init,
  getConfig,
  getBreakpoints,
  updateConfig,
} from '@ojoho/fractaljs';

// Initialize configuration
init({ breakpoints: { mobile: 768 } });

// Get current configuration
const config = getConfig();
console.log(config); // { breakpoints: {...}, debug: false }

// Get just breakpoints
const bp = getBreakpoints();
console.log(bp); // { mobile: 768, tablet: 1024, ... }

// Update configuration (merges with existing - does not reset other values)
updateConfig({ debug: true });
```

## API Reference

### Event Delegation

Event delegation works by listening to `data-action` attributes on DOM elements. All delegation functions are named exports.

#### `register(action, callback)`

Register an event handler for delegated events.

```javascript
import { register } from '@ojoho/fractaljs';

register('myAction', (event, target) => {
  console.log('Action triggered on:', target);
});
```

#### `deregister(action, callback)`

Remove an event handler.

```javascript
import { register, deregister } from '@ojoho/fractaljs';

const handler = (event, target) => console.log('Clicked');
register('click', handler);
deregister('click', handler);
```

#### `trigger(action, event, target)`

Manually trigger a delegated event.

```javascript
import { trigger } from '@ojoho/fractaljs';

trigger('customAction', customEvent, targetElement);
```

#### `debug(enabled)`

Enable or disable debug mode for console logging.

```javascript
import { debug } from '@ojoho/fractaljs';

debug(true); // Enable debug
debug(false); // Disable debug
```

### Animation Queue

#### `AnimationQueue([initialQueue], [callback])`

Create an animation queue instance. Returns an object with `start`, `add`, and `addItem` methods.

```javascript
import { AnimationQueue } from '@ojoho/fractaljs';

const queue = AnimationQueue();
```

#### `addItem(item)`

Add a single animation to the queue. `fn` is the function to call, `time` is the delay offset in milliseconds from the previous item.

```javascript
queue.addItem({
  fn: () => {
    element.style.opacity = '1';
  },
  time: 1000,
});
```

#### `add(newQueue)`

Replace the entire queue with a new array of animation items.

```javascript
queue.add([
  {
    fn: () => {
      element.style.opacity = '0';
    },
    time: 500,
  },
  {
    fn: () => {
      element.style.display = 'none';
    },
    time: 200,
  },
]);
```

#### `start()`

Execute all queued animations in sequence. Each item fires after the accumulated delay of all preceding items.

```javascript
queue.start();
```

### Breakpoints

Initialize the breakpoint system and get responsive utilities.

```javascript
import { breakpoints } from '@ojoho/fractaljs';

// Initialize breakpoint system (sets up resize listeners)
const { getView, isMobile, isTablet, isMobileNav, change } = breakpoints();
```

The named utilities (`isMobile`, `isTablet`, etc.) are also available as direct imports if you only need to query the current state without setting up listeners:

```javascript
import { isMobile, getView } from '@ojoho/fractaljs';
```

#### `getView()`

Get the current breakpoint view.

```javascript
console.log(getView()); // 'mobile', 'tablet', or 'desktop'
```

#### `isMobile()`

Check if current layout is mobile.

```javascript
if (isMobile()) {
  console.log('Mobile layout active');
}
```

#### `isTablet()`

Check if current layout is tablet.

```javascript
if (isTablet()) {
  console.log('Tablet layout active');
}
```

#### `isMobileNav()`

Check if mobile navigation should be shown.

```javascript
if (isMobileNav()) {
  console.log('Show mobile navigation');
}
```

#### `change(callback)`

Register a callback for breakpoint changes.

```javascript
change((view) => {
  console.log('Breakpoint changed to:', view);
});
```

## Examples

### Basic Event Delegation

```html
<div data-action="save">Save</div>
<div data-action="cancel">Cancel</div>

<script type="module">
  import { register } from '@ojoho/fractaljs';

  register('save', () => {
    console.log('Saving...');
  });

  register('cancel', () => {
    console.log('Cancelled');
  });
</script>
```

### Animation Queue

```javascript
import { AnimationQueue } from '@ojoho/fractaljs';

const element = document.querySelector('.box');
const queue = AnimationQueue();

queue.addItem({
  fn: () => {
    element.style.transform = 'translateX(100px)';
  },
  time: 500,
});

queue.addItem({
  fn: () => {
    element.style.opacity = '0';
  },
  time: 300,
});

queue.start();
```

### Responsive Breakpoints

```javascript
import { init, breakpoints } from '@ojoho/fractaljs';

// Optional: Configure custom breakpoints
init({
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    mobileNav: 900, // Show mobile nav up to 900px
  },
});

// Initialize breakpoint system
const { getView, isMobile, isMobileNav, change } = breakpoints();

// Check current breakpoint
if (isMobile()) {
  console.log('Mobile layout');
}

// Listen for breakpoint changes
change((view) => {
  if (view === 'mobile') {
    // Mobile-specific logic
  } else if (view === 'desktop') {
    // Desktop-specific logic
  }
});

// Use mobileNav for navigation display
if (isMobileNav()) {
  showMobileMenu();
} else {
  showDesktopMenu();
}
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## License

MIT © [scottlet](https://github.com/scottlet)
