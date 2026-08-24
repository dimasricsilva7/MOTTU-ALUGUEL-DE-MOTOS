'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ArrowUpRight, Loader2, MessageCircle, X } from 'lucide-react';
import { whatsappUrl } from '../lib/content';

declare global {
  interface Window { fbq?: (...args: any[]) => void; }
}

type Props = { open: boolean; message: string; onClose: () => void };

export default function LeadModal({ open, message, onClose }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  if (!open) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const eventId = `lead_${crypto.randomUUID()}`;
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, eventId, sourceUrl: window.location.href }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Não foi possível registrar seus dados.');

      window.fbq?.('track', 'Lead', { content_name: 'WhatsApp lead' }, { eventID: eventId });
      window.location.assign(whatsappUrl(message));
      onClose();
      setName(''); setPhone(''); setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
        <button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={20}/></button>
        <div className="modal-icon"><MessageCircle size={24}/></div>
        <span className="kicker">FALAR COM UM ATENDENTE</span>
        <h2 id="lead-modal-title">Preencha as informações para falar com um atendente.</h2>
        <p>Informe seus dados. Em seguida, abriremos o WhatsApp com a mensagem de atendimento.</p>
        <form onSubmit={submit}>
          <label>Nome<input required minLength={2} value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" autoComplete="name" /></label>
          <label>Telefone<input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-9999" inputMode="tel" autoComplete="tel" /></label>
          <label>E-mail<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" autoComplete="email" /></label>
          <p className="modal-privacy">Seus dados serão usados para registrar o contato e permitir o atendimento solicitado.</p>
          {error && <div className="modal-error">{error}</div>}
          <button className="modal-submit" disabled={loading}>{loading ? <><Loader2 className="spin" size={18}/> Enviando...</> : <>CONTINUAR PARA O WHATSAPP <ArrowUpRight size={18}/></>}</button>
        </form>
      </div>
    </div>
  );
}
