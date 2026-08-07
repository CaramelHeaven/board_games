/// <reference types="next/image-types/global" />

/*
 * Static image imports (`.webp`, `.jpg`, `.png`) get their `StaticImageData`
 * type from Next. Next normally supplies it through the generated
 * `next-env.d.ts`, but that file is gitignored and only appears after
 * `next dev` or `next build` has run — so on a fresh clone `tsc --noEmit`
 * failed with 122 "Cannot find module '@/assets/…'" errors before the build
 * step ever ran. CI hit exactly that.
 *
 * This file is committed and Next never rewrites it, so the type check stands
 * on its own no matter what has or has not been generated yet.
 */
