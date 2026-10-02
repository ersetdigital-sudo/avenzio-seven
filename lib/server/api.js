export function jsonError(e) {
  return Response.json(
    { error: (e && e.message) || 'Terjadi kesalahan' },
    { status: (e && e.status) || 500 }
  );
}

export function badRequest(msg, status = 400) {
  const e = new Error(msg);
  e.status = status;
  return e;
}
