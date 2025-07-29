import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, {
  alias: {
    "mylib": import.meta.resolve("./alt-mylib-index.js"),
  },
});

// now we want to run the first argument provided to this node js script
// and extract the second argument

const [, , secondArg] = process.argv;

const exportsFromFile = await jiti.import(secondArg, {});

for (const key of Object.keys(exportsFromFile)) {
  if (exportsFromFile[key].__DEFINE_THINGS_MARKER) {
    console.log("Found options for ", key, " = ", JSON.stringify(exportsFromFile[key].opts, null, 2));
  }
}
