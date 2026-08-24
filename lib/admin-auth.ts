import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'mottu_admin_session';
const MAX_AGE = 60 * 60 * 24;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error('Missing ADMIN_SESSION_SECRET');
  return value;
}

function sign(payload: string) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

export function createSession() {
  const payload = `${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function validSession(token?: string) {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  const created = Number(payload);
  return Number.isFinite(created) && Date.now() - created < MAX_AGE * 1000;
}

export async function isAdmin() {
  const store = await cookies();
  return validSession(store.get(COOKIE_NAME)?.value);
}

export function cookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  };
}

export { COOKIE_NAME };
