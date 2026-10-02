// Tiny storage layer with graceful fallbacks (private mode / SSR safe).

const MEM = Object.create(null);

export function sget(key) {
  if (typeof window === 'undefined') return MEM[key] == null ? null : MEM[key];
  try {
    const v = localStorage.getItem(key);
    if (v != null) return v;
  } catch {}
  try {
    const v = sessionStorage.getItem(key);
    if (v != null) return v;
  } catch {}
  return MEM[key] == null ? null : MEM[key];
}

export function sset(key, value) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, value);
    } catch {}
    try {
      sessionStorage.setItem(key, value);
    } catch {}
  }
  MEM[key] = value;
}
