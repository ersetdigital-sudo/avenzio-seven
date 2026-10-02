import crypto from 'crypto';
import { isAdmin } from '@/lib/server/adminAuth';
import { jsonError } from '@/lib/server/api';

function sign(params) {
  const str = Object.keys(params)
    .sort()
    .map((k) => k + '=' + params[k])
    .join('&');
  return crypto.createHash('sha1').update(str + process.env.CLOUDINARY_API_SECRET).digest('hex');
}

/**
 * POST { action: 'upload' }        -> signature untuk upload signed
 * POST { action: 'destroy', public_id } -> signature untuk hapus aset
 */
export async function POST(req) {
  if (!(await isAdmin())) return jsonError({ message: 'Unauthorized', status: 401 });

  let body = {};
  try {
    body = await req.json();
  } catch {}

  const publicId = String(body.public_id || body.publicId || '');
  const timestamp = Math.floor(Date.now() / 1000);
  const params =
    body.action === 'destroy'
      ? { public_id: publicId, timestamp }
      : { timestamp, upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET };

  if (body.action === 'destroy' && !publicId) {
    return jsonError({ message: 'public_id wajib diisi', status: 400 });
  }

  return Response.json({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    timestamp,
    signature: sign(params),
  });
}
