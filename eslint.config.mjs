import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  /*
   * The architecture rule from AGENTS.md, enforced instead of merely stated:
   * the scoring core and the game catalogue are plain data and pure functions.
   * They must stay free of React and of the UI layer — that is what keeps the
   * maths testable without a renderer.
   *
   * Done with the built-in rule rather than a boundaries plugin: two rules do
   * not justify a dependency in a project whose own rules forbid adding them.
   */
  {
    files: ["src/scoring/**", "src/data/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              message:
                "The scoring core must not depend on React. Put React code in src/components/.",
            },
            {
              name: "react-dom",
              message:
                "The scoring core must not depend on React. Put React code in src/components/.",
            },
          ],
          patterns: [
            {
              group: ["@/components/*", "@/app/*"],
              message:
                "The scoring core must not import the UI layer. Dependencies point the other way.",
            },
          ],
        },
      ],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
