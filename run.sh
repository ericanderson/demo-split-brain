#!/bin/bash

# Exit on error
set -e

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script directory
cd "$SCRIPT_DIR"

# Helper function to print section headers
print_header() {
  echo
  echo "============================================================"
  echo "  $1"
  echo "============================================================"
  
}

# Step 1: Install dependencies
print_header "INSTALLING DEPENDENCIES"
pnpm install --silent
echo "✅ Dependencies installed successfully!"

# Step 2: Run the babel plugin tests
print_header "RUNNING BABEL PLUGIN TESTS"
(cd packages/babel-plugin && pnpm --silent run test)
echo "✅ Babel plugin tests completed!"

# Step 3: Run the preprocessor against the example
print_header "RUNNING PREPROCESSOR"
cd packages/preprocessor
pnpm run --silent analyze ../example/src/index.ts
cd ../..

print_header "EXPLORE FURTHER"
echo ""
echo "To learn more, check out the README files in each package:"
echo "- /README.md                       # Overview of the pattern"
echo "- /packages/*/README.md            # Package-specific details"
