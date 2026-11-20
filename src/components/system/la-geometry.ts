// Geometry of the 8-module J-shaped line array (units: 100 per metre). Top-front corner of module 1 is at (104.8, 15).
export const LA_VIEWBOX = "0 0 120 311";
export const LA_TOP_FRONT: [number, number] = [104.8, 15];
export const LA_POLYS: { n: number; kind: "TW" | "M"; points: string; front: [number, number, number, number] }[] = [
  { n: 1, kind: "TW", points: "104.8,15.0 104.8,51.0 48.8,48.0 48.8,18.0", front: [104.8, 15.0, 104.8, 51.0] },
  { n: 2, kind: "M", points: "104.8,51.0 104.5,87.0 48.5,83.5 48.8,53.5", front: [104.8, 51.0, 104.5, 87.0] },
  { n: 3, kind: "M", points: "104.5,87.0 103.5,123.0 47.6,118.5 48.4,88.5", front: [104.5, 87.0, 103.5, 123.0] },
  { n: 4, kind: "M", points: "103.5,123.0 101.6,158.9 45.9,153.0 47.4,123.1", front: [103.5, 123.0, 101.6, 158.9] },
  { n: 5, kind: "TW", points: "101.6,158.9 97.9,194.7 42.5,185.9 45.6,156.1", front: [101.6, 158.9, 97.9, 194.7] },
  { n: 6, kind: "M", points: "97.9,194.7 91.0,230.1 36.6,216.4 42.3,187.0", front: [97.9, 194.7, 91.0, 230.1] },
  { n: 7, kind: "M", points: "91.0,230.1 79.9,264.3 27.5,244.2 36.8,215.6", front: [91.0, 230.1, 79.9, 264.3] },
  { n: 8, kind: "M", points: "79.9,264.3 63.5,296.4 15.0,268.3 28.6,241.6", front: [79.9, 264.3, 63.5, 296.4] },
];
