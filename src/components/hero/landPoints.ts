/** Precomputed globe points (public/data/*.bin): Int16 LE pairs [lon*100, lat*100]. */
export function latLonToVec(lat: number, lon: number, r = 1): [number, number, number] {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo) * r, Math.sin(la) * r, Math.cos(la) * Math.cos(lo) * r];
}

export const GLOBE_DATA = { land: "/data/land-points.bin", ocean: "/data/ocean-points.bin" } as const;

export function decodePoints(buffer: ArrayBuffer, step = 1, radius = 1): Float32Array {
  const a = new Int16Array(buffer);
  const count = a.length / 2;
  const out: number[] = [];
  for (let i = 0; i < count; i += step) {
    out.push(...latLonToVec(a[2 * i + 1]! / 100, a[2 * i]! / 100, radius));
  }
  return new Float32Array(out);
}

type GlobePoints = { land: Float32Array; ocean: Float32Array | null };
const cache = new Map<string, Promise<GlobePoints>>();
const raw = new Map<string, Promise<ArrayBuffer>>();
const fetchBin = (url: string) => {
  if (!raw.has(url)) raw.set(url, fetch(url).then((r) => { if (!r.ok) throw new Error(`globe data ${r.status}`); return r.arrayBuffer(); }));
  return raw.get(url)!;
};

/** full: all land + ocean; lite: every 3rd land point, no ocean. Cached in memory. */
export function loadGlobePoints(lite: boolean): Promise<GlobePoints> {
  const key = lite ? "lite" : "full";
  if (!cache.has(key)) {
    const p = Promise.all([fetchBin(GLOBE_DATA.land), lite ? null : fetchBin(GLOBE_DATA.ocean)]).then(([l, o]) => ({
      land: decodePoints(l, lite ? 3 : 1),
      ocean: o ? decodePoints(o, 1, 1.001) : null,
    }));
    p.catch(() => cache.delete(key));
    cache.set(key, p);
  }
  return cache.get(key)!;
}
