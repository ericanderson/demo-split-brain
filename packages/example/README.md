# example

A TypeScript example demonstrating the use of the `defineThings` function from `mylib`.

## Overview

This package shows how to use the `defineThings` utility in a TypeScript project. It demonstrates:

1. How to import and use the `defineThings` function
2. The expected TypeScript type definitions
3. A pattern that works with the Babel plugin and preprocessor tools

## Example Code

The main example file (`src/index.ts`) shows:

```typescript
import { defineThings } from "mylib";

export const myThing = defineThings((myArg: number) => {
  console.log("inside my defined thing", { myArg });
}, {
  a: 1,
  b: "hello",
  c: true,
});
```

## Different Behaviors

The same code will behave differently depending on the context:

1. **Standard Import**: The function works as defined in `mylib` - it simply returns the function.
2. **With Babel Plugin**: In a production build with the Babel plugin, the output becomes:
   ```typescript
   export const myThing = (myArg: number) => {
     console.log("inside my defined thing", { myArg });
   };
   ```
3. **With Preprocessor**: When analyzed by the preprocessor, the configuration is extracted:
   ```
   Found options for myThing = {
     "a": 1,
     "b": "hello",
     "c": true
   }
   ```

## Running the Example

To see the different behaviors:

1. **Normal execution**: `tsx src/index.ts`
2. **With Babel plugin**: (Requires Babel setup)
3. **With preprocessor**: `node ../preprocessor/index.js ./src/index.ts`