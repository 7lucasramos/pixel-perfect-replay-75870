export const SHOW_MANUAL_SPECS = false;
export function specsVisible(preview?: string, published = SHOW_MANUAL_SPECS) {
  return published || preview === "specs";
}