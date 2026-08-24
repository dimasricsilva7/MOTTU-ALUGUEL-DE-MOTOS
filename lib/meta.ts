import crypto from 'node:crypto';

export const META_PIXEL_ID = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

function sha256(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('55') ? digits : `55${digits}`;
}

export function hashEmail(email: string) {
  return sha256(normalizeEmail(email));
}

export function hashPhone(phone: string) {
  return sha256(normalizePhone(phone));
}

export function hashName(name: string) {
  const first = name.trim().toLowerCase().split(/\s+/)[0] || '';
  return sha256(first);
}

export async function sendMetaEvent({
  eventName,
  eventId,
  eventSourceUrl,
  email,
  phone,
  name,
  clientIp,
  clientUserAgent,
  fbp,
  fbc,
}: {
  eventName: 'PageView' | 'Lead';
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone?: string;
  name?: string;
  clientIp?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
}) {
  const pixelId = required('META_PIXEL_ID');
  const accessToken = required('META_ACCESS_TOKEN');
  const apiVersion = process.env.META_GRAPH_API_VERSION || 'v26.0';

  const userData: Record<string, unknown> = {};
  if (email) userData.em = [hashEmail(email)];
  if (phone) userData.ph = [hashPhone(phone)];
  if (name) userData.fn = [hashName(name)];
  if (clientIp) userData.client_ip_address = clientIp;
  if (clientUserAgent) userData.client_user_agent = clientUserAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  if (!email && !phone && !name && !clientIp && !clientUserAgent && !fbp && !fbc) {
    userData.client_user_agent = 'unknown';
  }

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: eventSourceUrl,
      user_data: userData,
    }],
  };

  const response = await fetch(`https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Meta CAPI ${response.status}: ${body}`);
  }

  return JSON.parse(body) as { events_received?: number; messages?: string[]; fbtrace_id?: string };
}

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}
