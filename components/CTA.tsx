'use client';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { messages } from '../lib/content';
import LeadModal from './LeadModal';
import { useState } from 'react';

type Variant = 'primary' | 'dark' | 'light' | 'outline';

export default function CTA({ children, message = messages.hero, variant = 'primary', showWhatsApp = false }: { children: React.ReactNode; message?: string; variant?: Variant; showWhatsApp?: boolean; }) {
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" className={`cta ${variant}`} onClick={() => setOpen(true)}>
      {showWhatsApp && <MessageCircle size={17} strokeWidth={2.2} />}
      <span>{children}</span><ArrowUpRight size={18} strokeWidth={2.2} />
    </button>
    <LeadModal open={open} message={message} onClose={() => setOpen(false)} />
  </>;
}
