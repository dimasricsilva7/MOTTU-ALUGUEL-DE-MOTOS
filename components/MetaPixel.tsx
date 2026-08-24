'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

  useEffect(() => {
    if (!pixelId) return;
    const eventId = `pageview_${crypto.randomUUID()}`;
    const sendServerEvent = () => {
      fetch('/api/meta/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, sourceUrl: window.location.href }),
        keepalive: true,
      }).catch(() => undefined);
    };
    const fire = () => {
      if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'PageView', {}, { eventID: eventId });
      }
      sendServerEvent();
    };
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') fire();
    else setTimeout(fire, 900);
  }, [pixelId]);

  if (!pixelId) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');`}
    </Script>
  );
}
