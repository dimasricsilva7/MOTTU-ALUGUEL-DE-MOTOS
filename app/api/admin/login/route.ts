import { NextResponse } from 'next/server';
import { cookieOptions, createSession } from '../../../../lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || String(password || '') !== expected) {
      return NextResponse.json({ ok: false, error: 'Senha inválida.' }, { status: 401 });
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.set({ ...cookieOptions(), value: createSession() });
    return response;
  } catch {
    return NextResponse.json({ ok: false, error: 'Não foi possível entrar.' }, { status: 500 });
  }
}
