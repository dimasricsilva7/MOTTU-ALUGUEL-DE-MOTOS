import { NextResponse } from 'next/server';
import { sendMetaEvent } from '../../../../lib/meta';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const eventId = String(body.eventId || '').trim();
    const sourceUrl = String(body.sourceUrl || request.headers.get('referer') || '').trim();
    if (!eventId) return NextResponse.json({ ok: false }, { status: 400 });

    const cookieHeader = request.headers.get('cookie') || '';
    const fbp = cookieHeader.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1];
    const fbc = cookieHeader.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1];

    await sendMetaEvent({
      eventName: 'PageView',
      eventId,
      eventSourceUrl: sourceUrl || new URL(request.url).origin,
      clientIp: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || undefined,
      clientUserAgent: request.headers.get('user-agent') || undefined,
      fbp,
      fbc,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Meta CAPI PageView]', error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
