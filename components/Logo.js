import { PROVS } from '@/lib/catalog';

/** Small square provider badge used on product cards / breadcrumbs (`.alogo`). */
export function Alogo({ prov, className = '' }) {
  const v = PROVS[prov] || [prov, prov, '#3D0B37', '#fff'];
  return (
    <span
      className={'alogo' + (className ? ' ' + className : '')}
      style={{ background: v[2], color: v[3] }}
    >
      {v[1]}
    </span>
  );
}

/** Provider badge used inside the PPOB widget / payment overlay (`.pp-lg`). */
export function PpLogo({ prov }) {
  const v = PROVS[prov] || [prov, prov, '#3D0B37', '#fff'];
  return (
    <span className="pp-lg" style={{ background: v[2], color: v[3] }}>
      {v[1]}
    </span>
  );
}
