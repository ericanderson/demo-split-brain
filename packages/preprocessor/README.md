# preprocessor

A tool that extracts configuration data from `defineThings` calls by replacing the implementation at import time.

## Purpose

This package demonstrates how to analyze code containing `defineThings` calls without actually running the original implementation. It works by:

1. Using path aliasing to substitute an alternative implementation of `mylib`
2. Extracting and logging the configuration options from each `defineThings` call
3. Marking each processed function with a special property

## How It Works

The preprocessor uses [jiti](https://github.com/unjs/jiti) to perform dynamic imports with path aliasing:

1. It creates a jiti instance that aliases `mylib` to a local implementation
2. The alternative implementation (`alt-mylib-index.js`) replaces `defineThings` with a version that:
   - Adds a marker property (`__DEFINE_THINGS_MARKER`)
   - Captures the options object
   - Returns an object instead of the original function

3. When importing a module that uses `defineThings`, the preprocessor can detect and extract the configuration data

## Usage

Run the preprocessor with a target file:

```bash
node packages/preprocessor/index.js ./packages/example/src/index.js
```

This will output the configuration options for each `defineThings` call found in the target file.

## Use Cases

This approach enables various tooling possibilities:

- Static analysis of configuration without running application code
- Generating documentation from code annotations
- Building dev tools that understand your application's structure
- Creating custom code generators based on configuration