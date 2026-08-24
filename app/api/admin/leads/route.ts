import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/admin-auth';
import { supabaseRequest } from '../../../../lib/supabase';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ ok: false, error: 'Não autorizado.' }, { status: 401 });
  try {
    const leads = await supabaseRequest('leads?select=id,name,phone,email,created_at&order=created_at.desc&limit=1000', { method: 'GET' });
    return NextResponse.json({ ok: true, leads });
  } catch (error) {
    console.error('[Admin leads]', error);
    return NextResponse.json({ ok: false, error: 'Não foi possível carregar os leads.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ ok: false, error: 'Não autorizado.' }, { status: 401 });
  try {
    const body = await request.json();
    const id = String(body.id || '').trim();
    if (!id) return NextResponse.json({ ok: false, error: 'Lead inválido.' }, { status: 400 });
    await supabaseRequest(`leads?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Admin delete]', error);
    return NextResponse.json({ ok: false, error: 'Não foi possível excluir o lead.' }, { status: 500 });
  }
}
