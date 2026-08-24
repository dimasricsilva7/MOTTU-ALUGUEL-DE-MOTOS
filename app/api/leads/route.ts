import { NextResponse } from 'next/server';
import { sendMetaEvent } from '../../../lib/meta';
import { supabaseRequest } from '../../../lib/supabase';

export const runtime = 'nodejs';

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || undefined;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const phone = String(body.phone || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const eventId = String(body.eventId || '').trim();
    const sourceUrl = String(body.sourceUrl || request.headers.get('referer') || '').trim();

    if (name.length < 2 || phone.replace(/\D/g, '').length < 10 || !/^\S+@\S+\.\S+$/.test(email) || !eventId) {
      return NextResponse.json({ ok: false, error: 'Preencha nome, telefone e e-mail corretamente.' }, { status: 400 });
    }

    const lead = await supabaseRequest('leads', {
      method: 'POST',
      body: JSON.stringify({ name, phone, email, event_id: eventId, source_url: sourceUrl || null }),
    });

    const cookieHeader = request.headers.get('cookie') || '';
    const fbp = cookieHeader.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1];
    const fbc = cookieHeader.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1];

    let meta: unknown = null;
    try {
      meta = await sendMetaEvent({
        eventName: 'Lead',
        eventId,
        eventSourceUrl: sourceUrl || new URL(request.url).origin,
        email,
        phone,
        name,
        clientIp: clientIp(request),
        clientUserAgent: request.headers.get('user-agent') || undefined,
        fbp,
        fbc,
      });
    } catch (error) {
      console.error('[Meta CAPI Lead]', error);
    }

    return NextResponse.json({ ok: true, lead, meta });
  } catch (error) {
    console.error('[Lead API]', error);
    return NextResponse.json({ ok: false, error: 'Não foi possível registrar seus dados. Tente novamente.' }, { status: 500 });
  }
}
