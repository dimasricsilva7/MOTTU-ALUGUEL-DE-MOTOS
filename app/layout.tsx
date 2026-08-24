import type { Metadata } from 'next';
import './globals.css';
import MetaPixel from '../components/MetaPixel';
export const metadata: Metadata = {
 title:'Aluguel de Moto | Fale com um Atendente',
 description:'Consulte as opções de aluguel de motos e fale diretamente com um atendente pelo WhatsApp.',
 openGraph:{title:'Aluguel de Moto | Fale com um Atendente',description:'Consulte a locação e fale com um atendente pelo WhatsApp.',type:'website'},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}<MetaPixel /></body></html>}
