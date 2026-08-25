import { CheckCircle2, ChevronDown, Headphones, MessageCircle, ShieldCheck, Wrench, WalletCards, Tag, ArrowRight, CalendarDays } from 'lucide-react';
import CTA from '../components/CTA';
import WhatsAppButton from '../components/WhatsAppButton';
import { IMAGE_URLS, messages } from '../lib/content';

const plans = [
  {
    name: 'MINHA MOTTU',
    price: 'R$ 20,00/dia',
    desc: 'Você aluga e no final a moto poderá ser sua.',
    items: ['Plano com duração de 2 ou 3 anos.', 'Você pode escolher entre uma moto 0 km ou usada.', 'A moto poderá ser sua no final do plano.'],
    message: messages.minha,
  },
  {
    name: 'ILIMITADO',
    price: 'R$ 24,00/dia',
    desc: 'Para trabalhar sem limite de km.',
    items: ['Plano com duração de 1 ano.', 'Kms ilimitados.', 'Melhor custo-benefício para quem roda muito.'],
    message: messages.ilimitado,
  },
];

const bikes = [
  { name: 'Mottu Sport ESD', image: IMAGE_URLS.sportEsd },
  { name: 'Mottu Sport', image: IMAGE_URLS.sport },
  { name: 'Pop 110i', image: IMAGE_URLS.pop110i },
  { name: 'Mottu-E', image: IMAGE_URLS.mottuE },
];

const faq = [
  ['Quanto preciso para começar?', 'O valor inicial informado nesta página é de R$ 540,00: R$ 400,00 de caução + R$ 140,00 referentes à primeira parcela semanal.'],
  ['Quando o pagamento é realizado?', 'Os pagamentos iniciais são realizados no ato da contratação.'],
  ['Como faço para contratar?', 'Clique em qualquer botão de atendimento e fale diretamente com um atendente pelo WhatsApp.'],
  ['Preciso baixar algum aplicativo para contratar?', 'A contratação nesta página é direcionada ao atendimento pelo WhatsApp. O atendente orientará você sobre os próximos passos.'],
  ['Quais são os planos?', 'Os planos apresentados são Minha Mottu e Ilimitado, conforme as informações desta página.'],
];

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="Mottu - início">
      <span className="logo-mark">M</span>
      <span className="logo-word">mottu</span>
    </a>
  );
}

export default function Home() {
  return (
    <main id="inicio">
      <header className="header">
        <div className="container nav">
          <Logo />
          <nav aria-label="Navegação principal">
            <a className="active" href="#inicio">Início</a>
            <a href="#motos">Nossas Motos</a>
            <a href="#planos">Planos</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#como">Como funciona</a>
            <a href="#faq">FAQ</a>
          </nav>
          <CTA variant="outline" message={messages.attendant} showWhatsApp>FALAR COM ATENDENTE</CTA>
        </div>
      </header>

      <section className="hero">
        <div className="hero-bg-glow" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">PRONTO PARA COMEÇAR?</span>
            <h1>Alugue sua moto<br/>de forma <em>simples<br/>e rápida.</em></h1>
            <p className="lead">Consulte disponibilidade, escolha a opção de locação e fale diretamente com um atendente para realizar a contratação.</p>
            <div className="hero-points">
              <span><CheckCircle2/> Sem complicações</span>
              <span><CheckCircle2/> Atendimento rápido</span>
              <span><CheckCircle2/> A moto certa para você</span>
            </div>
            <div className="actions">
              <CTA message={messages.hero} showWhatsApp>QUERO ALUGAR UMA MOTO</CTA>
              <CTA variant="outline" message={messages.attendant}>FALAR COM ATENDENTE</CTA>
            </div>
            <p className="micro">🔒 &nbsp; Pagamento inicial realizado no ato da contratação.</p>
          </div>

          <div className="hero-visual">
            <div className="hero-letter">M</div>
            <div className="hero-floor" />
            <img src={IMAGE_URLS.hero} alt="Mottu Sport" className="hero-bike" fetchPriority="high" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      <section id="valor" className="value-card-section">
        <div className="container">
          <div className="value-card">
            <div className="value-intro">
              <span className="kicker">COMECE SUA LOCAÇÃO</span>
              <h2>R$ 540,00</h2>
              <p>Um valor inicial claro para você saber exatamente o que considerar antes de contratar.</p>
              <span className="payment-pill"><WalletCards size={15}/> Pagamentos realizados no ato da contratação.</span>
            </div>
            <div className="cost-boxes">
              <div className="cost-box"><ShieldCheck/><strong>R$ 400,00</strong><small>Caução</small></div>
              <span className="plus">+</span>
              <div className="cost-box"><CalendarDays/><strong>R$ 140,00</strong><small>1ª parcela semanal</small></div>
            </div>
            <CTA message={messages.availability} showWhatsApp>CONSULTAR E CONTRATAR</CTA>
          </div>
        </div>
      </section>

      <section id="beneficios" className="section benefits">
        <div className="container">
          <div className="section-head compact"><span className="kicker">VANTAGENS DE SER MOTTU</span><h2>Benefícios de ser Mottu</h2></div>
          <div className="benefit-grid">
            <article><Tag/><h3>Economia de verdade</h3><p>Motos econômicas que fazem até 60km/litro, e sem impostos anuais. De Mottu você não paga IPVA e licenciamento.</p></article>
            <article><ShieldCheck/><h3>Proteção e suporte</h3><p>Com a Mottu você não está sozinho. Furou pneu, se envolveu em um acidente? É só chamar que o nosso time vai até você para te ajudar.</p></article>
            <article><Wrench/><h3>Manutenção preventiva</h3><p>A manutenção preventiva é toda por nossa conta, sem surpresas!</p></article>
          </div>
        </div>
      </section>

      <section id="motos" className="section bikes-section">
        <div className="container">
          <div className="section-head compact"><span className="kicker">MINHAS MOTOS</span><h2>Nossas motos</h2><p>Nossas motos são ideais para o dia a dia da cidade, super econômicas e fáceis de conduzir. Consulte mais detalhes dos modelos e a disponibilidade na sua região pelo atendimento.</p></div>
          <div className="bike-grid">
            {bikes.map((bike) => (
              <article className="bike-card" key={bike.name}>
                <div className="bike-image"><img src={bike.image} alt={bike.name} loading="lazy" referrerPolicy="no-referrer" /></div>
                <div className="bike-footer"><strong>{bike.name}</strong><ArrowRight size={20}/></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="section plans">
        <div className="container">
          <div className="section-head compact"><span className="kicker">NOSSOS PLANOS</span><h2>Temos o plano ideal para você</h2><p>Temos opções de planos que cabem no seu bolso, você pode escolher pelo pagamento semanal ou pagamento mensal antecipado com até 10% de desconto. Tudo de forma simples, com orientação do nosso atendimento.</p></div>
          <div className="plan-grid">
            {plans.map((p) => (
              <article className="plan" key={p.name}>
                <span className="plan-label">PLANO</span>
                <h3>{p.name}</h3>
                <span className="plan-price">{p.price}</span>
                <p className="plan-desc">{p.desc}</p>
                <ul>{p.items.map((item) => <li key={item}><CheckCircle2/>{item}</li>)}</ul>
                <CTA message={p.message} showWhatsApp>QUERO ESSE PLANO</CTA>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como" className="section how">
        <div className="container how-grid">
          <div className="section-head compact"><span className="kicker">COMO FUNCIONA</span><h2>Do primeiro contato à locação.</h2><p>Fale com nosso atendimento, consulte a disponibilidade, escolha a opção de locação e siga as orientações para concluir.</p><CTA showWhatsApp>COMEÇAR AGORA</CTA></div>
          <div className="steps">
            {[['01','Fale com nosso atendimento','Clique no botão e converse com um atendente pelo WhatsApp.'],['02','Escolha a opção de locação','O atendente orientará você sobre disponibilidade, plano e contratação.'],['03','Realize os pagamentos','Pagamento inicial de R$ 400,00 de caução + R$ 140,00 da primeira parcela semanal.'],['04','Finalize sua locação','O atendimento orientará você sobre os próximos passos.']].map(([n,t,d]) => (
              <div className="step" key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div className="cta-icon"><Headphones/></div>
          <div className="cta-band-copy"><h2>Fale com um atendente agora.</h2><p>Consulte disponibilidade e receba orientação para sua locação.</p></div>
          <CTA variant="outline" message={messages.attendant} showWhatsApp>FALAR COM ATENDENTE</CTA>
        </div>
      </section>

      <section id="faq" className="section faq"><div className="container faq-wrap"><div className="section-head compact"><span className="kicker">AINDA COM DÚVIDAS?</span><h2>Perguntas frequentes</h2></div><div className="faq-list">{faq.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div></div></section>

      <div className="trust-bar"><div className="container trust-inner"><span><MessageCircle/> Atendimento via WhatsApp</span><i/><span><WalletCards/> Sem burocracia</span><i/><span><WalletCards/> Pagamento no ato</span><i/><span><Wrench/> Motos revisadas</span></div></div>
      <footer className="footer"><div className="container footer-bottom"><span>© 2026 • Landing page de atendimento.</span><span>Informações sujeitas à disponibilidade e confirmação no atendimento.</span></div></footer>
      <WhatsAppButton />
    </main>
  );
}
