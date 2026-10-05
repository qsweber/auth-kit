import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  // ESM only, deliberately: this package is private and only ever consumed
  // by Next.js apps. Shipping both CJS and ESM risks a dual-package hazard
  // (webpack loading both builds for different reasons, giving React/Emotion
  // two live module instances) which caused real, hard-to-reproduce
  // intermittent hydration failures when this was format: ["cjs", "esm"].
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  // Every export in this package is a client component / client-only hook,
  // so every output chunk needs the directive - simplest to just banner it
  // rather than track "use client" per source file through the bundler.
  banner: {
    js: '"use client";',
  },
  external: [
    "react",
    "react-dom",
    "next",
    "aws-amplify",
    "@emotion/react",
    "@emotion/styled",
  ],
});
