/**
 * Per-project cover art, in three flavors:
 *   - shipped products with a UI      → a real screenshot
 *   - integrations with no UI to show → a live 3D scene of what they do
 *   - the rest                        → stylized SVG
 *
 * This lives outside CoverArt.tsx on purpose: the stills are also needed as
 * video `poster` frames, and exporting a helper from a component file breaks
 * React fast refresh for that file.
 */

export type CoverVariant =
  | "resonate"
  | "aura"
  | "ultracore"
  | "hana"
  | "phonepe"
  | "makhana"
  | "vanam"
  | "school"
  | "dapigo"
  | "zipmart"
  | "quantx";

export type CoverStill = { src: string; alt: string };

const SHOTS: Partial<Record<CoverVariant, CoverStill>> = {
  makhana: { src: "/covers/makhana.webp", alt: "Makhana Health King storefront" },
  vanam: { src: "/covers/vanam.webp", alt: "Vanam furniture storefront with a 3D hero" },
  school: { src: "/covers/school.webp", alt: "AVAASchool admin dashboard" },
  dapigo: { src: "/covers/dapigo.webp", alt: "DapiGO customer storefront" },
  quantx: {
    src: "/covers/quantx.webp",
    alt: "QuantX trading dashboard — equity curve and signal stats",
  },
};

/**
 * The still screenshot for a cover variant, if it has one.
 *
 * Returns undefined for the SVG and 3D covers, which are generated at runtime
 * and have no image file to offer as a poster.
 */
export function coverStill(variant: CoverVariant): CoverStill | undefined {
  return SHOTS[variant];
}
