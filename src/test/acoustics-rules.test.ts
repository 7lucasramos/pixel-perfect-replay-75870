import { describe, expect, it } from "vitest";
import { beamProgress, counts, DEFAULT_LAYERS, DURATION, GRID, stage, topRays } from "@/components/acoustics/scene-config";

describe("Conceptual scene rules", () => {
  it("uses six seconds for autoplay", () => expect(DURATION).toBe(6));
  it("enables all six layers initially", () => expect(Object.values(DEFAULT_LAYERS)).toEqual([true, true, true, true, true, true]));
  it("keeps full geometry within eighteen beams and fourteen arcs", () => { expect(counts(false).beams * 2).toBe(18); expect(counts(false).waves * 2).toBe(14); });
  it("uses five beams per source and eight total waves in lite mode", () => { expect(counts(true).beams).toBe(5); expect(counts(true).waves * 2).toBe(8); });
  it("keeps the dot grid within four hundred points", () => expect(GRID.length).toBeLessThanOrEqual(400));
  it("draws beams progressively and reversibly by the specified end", () => {
    expect(beamProgress(0, 0, 9, 0)).toBe(0);
    expect(beamProgress(.45, 8, 9, 1)).toBe(1);
    expect(beamProgress(.2, 0, 9, 0)).toBeGreaterThan(beamProgress(.1, 0, 9, 0));
    expect(beamProgress(.1, 0, 9, 1)).toBeLessThan(beamProgress(.1, 0, 9, 0));
    expect(topRays(9, 270)).toHaveLength(9);
  });
  it("fills coverage only during its requested interval", () => { expect(stage(.35, .35, .8)).toBe(0); expect(stage(.8, .35, .8)).toBe(1); expect(stage(.5, .35, .8)).toBeGreaterThan(0); });
  it("reveals overlap and labels only in the final interval", () => { expect(stage(.6, .6, 1)).toBe(0); expect(stage(1, .6, 1)).toBe(1); });
});