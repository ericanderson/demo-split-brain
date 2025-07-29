# babel-plugin (Babel 7)

A Babel plugin that transforms calls to `defineThings` by replacing them with just the function argument.

## Purpose

This Babel plugin optimizes production builds by removing the `defineThings` wrapper function from the final output. It works by:

1. Identifying imports of `defineThings` (including aliased imports)
2. Finding calls to the imported function
3. Replacing those calls with just the first argument (the function itself)

## Transformation Example

**Input:**
```javascript
import { defineThings } from "my-lib";

export const myThing = defineThings(() => {
  console.log("hello world");
}, {
  a: 1,
  b: "hello",
  c: true
});
```

**Output:**
```javascript
import { defineThings } from "my-lib";

export const myThing = () => {
  console.log("hello world");
};
```

## Installation

Add the plugin to your Babel configuration:

```javascript
// babel.config.js
module.exports = {
  plugins: [
    // Add the plugin
    'babel-plugin' // Use '@babel/plugin-define-things' if published
  ]
};
```

## How It Works

The plugin uses Babel's AST traversal to:

1. Track imports of `defineThings` from any source and record any aliases
2. Find function calls that match the tracked import names
3. Check if the call has exactly 2 arguments (function and options)
4. Replace the call expression with just the function argument

This allows you to use `defineThings` in your source code for better developer experience and tooling support, while ensuring it gets optimized away in production.

## Testing

To see the plugin in action, check the `index.test.js` file which uses `babel-plugin-tester` to verify the transformations. The tests demonstrate various scenarios including:

- Transforming `defineThings` with import aliases
- Handling standard imports without aliases
- Correctly identifying which imports to transform
- Preserving other imports