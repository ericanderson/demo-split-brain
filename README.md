# Split Brain Demo

This monorepo demonstrates a pattern for creating "split brain" functionality in JavaScript/TypeScript applications, where code can be handled differently depending on the build/execution context.

## Overview

The demo showcases how a utility function (`defineThings`) can have different behaviors:

1. **Development/Authoring**: In source code, developers can use the function without running a transform 
2. **Production/Runtime**: The `defineThings` function is completely removed (no-op) via a Babel plugin for optimized builds
3. **Analysis/Preprocessing**: The function implementation can be replaced to extract metadata from the options

## Packages

- **mylib**: Core library providing the `defineThings` utility function
- **babel-plugin**: Babel transformation that removes `defineThings` calls at build time
- **preprocessor**: Tool that uses path aliasing to extract configuration from `defineThings` calls
- **example**: Demonstration of how to use the pattern in a TypeScript project

## Use Cases

This pattern is useful for:

- Stripping development-only code from production builds
- Extracting configuration/metadata from code without executing it
- Creating compile-time optimizations while preserving developer ergonomics
- Enabling tooling to analyze application structure without runtime overhead

## Getting Started

See the individual package READMEs for details on how each component works.