import Link from 'next/link';
import { PROVS } from '@/lib/catalog';
import { rp } from '@/lib/format';

/** Product tile used on the home grid and (legacy) catalog grid. */
export default function ProductCard({ p }) {
  const v = PROVS[p.prov] || [p.prov, p.prov, '#3D0B37', '#fff'];
  return (
    <Link className="apc" href={'/produk/' + p.slug}>
      <div className="apc-top">
        <span className="alogo" style={{ background: v[2], color: v[3] }}>
          {v[1]}
        </span>
        <span className="apc-prov">{p.provName}</span>
      </div>
      <div className="apc-name">{p.kind}</div>
      <div className="apc-nom">{p.nominal}</div>
      <div className="apc-bot">
        <div className="apc-price">
          {p.bill ? <small>Admin</small> : null}
          {rp(p.price)}
        </div>
        <span className="apc-buy">Beli</span>
      </div>
    </Link>
  );
}
