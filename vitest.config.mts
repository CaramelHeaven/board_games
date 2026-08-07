import { defineConfig } from "vitest/config";

/*
 * Tests cover the scoring core only — it is plain data and pure functions with
 * no React in it. `tsconfigPaths` makes the `@/*` alias resolve the same way it
 * does in the app, so tests import exactly what the app imports.
 *
 * The rules modules import `.webp` files; Vite resolves those to a URL string,
 * which is enough for the integrity test since it only inspects keys.
 */
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
