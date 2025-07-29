import { pluginTester } from "babel-plugin-tester";
import { describe, it } from "vitest";
import plugin from "./index.js";

globalThis.describe = describe;
globalThis.it = it;

pluginTester({
  plugin,
  pluginName: "babel-plugin-define-things",
  tests: {
    "transform defineThings imported as an alias": {
      code: `
        import { defineThings as foo } from "my-lib";

        export const x = foo(() => {}, {});
      `,
      output: `
        import { defineThings as foo } from "my-lib";
        export const x = () => {};`,
    },

    "transform defineThings imported with no alias": {
      code: `
        import { defineThings } from "my-lib";

        export const x = defineThings(() => {}, {});
      `,
      output: `
        import { defineThings } from "my-lib";
        export const x = () => {};`,
    },

    "do not transform other imports named defineThings": {
      code: `
        import { foo as defineThings } from "my-lib";
        import { defineThings as dt } from "my-lib";
        export const y = dt(() => {}, {});
        export const z = defineThings(() => {}, {});`,

      output: `
        import { foo as defineThings } from "my-lib";
        import { defineThings as dt } from "my-lib";
        export const y = () => {};
        export const z = defineThings(() => {}, {});`,
    },

    "do not transform other imports": {
      code: "import { somethingElse } from 'my-lib';",
      output: "import { somethingElse } from \"my-lib\";",
    },
  },
});
