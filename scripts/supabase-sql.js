// Jalankan file SQL ke Supabase via Management API (personal access token).
// Pakai: node scripts/supabase-sql.js supabase/schema.sql [file.sql ...]
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT = process.env.SUPABASE_PROJECT_REF || 'ydxjpswevvqwqvhbjhcx';

if (!TOKEN) {
  console.error('Set env SUPABASE_ACCESS_TOKEN dulu (token sbp_ dari Supabase dashboard).');
  process.exit(1);
}

(async () => {
  for (const file of process.argv.slice(2)) {
    const sql = fs.readFileSync(path.resolve(file), 'utf8');
    const res = await fetch(
      `https://api.supabase.com/v1/projects/${PROJECT}/database/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sql }),
      }
    );
    const text = await res.text();
    if (!res.ok) {
      console.error(`FAIL ${file} (${res.status}): ${text}`);
      process.exitCode = 1;
    } else {
      console.log(`OK   ${file} -> ${text.slice(0, 200)}`);
    }
  }
})();
