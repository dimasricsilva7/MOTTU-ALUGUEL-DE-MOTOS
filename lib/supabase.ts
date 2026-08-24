function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function supabaseConfig() {
  return {
    url: required('SUPABASE_URL').replace(/\/$/, ''),
    key: required('SUPABASE_SERVICE_ROLE_KEY'),
  };
}

export async function supabaseRequest(path: string, init: RequestInit = {}) {
  const { url, key } = supabaseConfig();
  const headers = new Headers(init.headers);
  headers.set('apikey', key);
  headers.set('Authorization', `Bearer ${key}`);
  headers.set('Content-Type', 'application/json');
  headers.set('Prefer', headers.get('Prefer') || 'return=representation');
  const response = await fetch(`${url}/rest/v1/${path}`, { ...init, headers, cache: 'no-store' });
  const text = await response.text();
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${text}`);
  return text ? JSON.parse(text) : null;
}
