'use client';
import { MessageCircle } from 'lucide-react';
import { messages } from '../lib/content';
import CTA from './CTA';

export default function WhatsAppButton(){
  return <div className="wa-float-wrap"><CTA message={messages.attendant} variant="primary" showWhatsApp><span className="wa-float-label">WhatsApp</span></CTA></div>;
}
