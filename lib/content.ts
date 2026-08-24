export const WHATSAPP_NUMBER = '5511914753826';

// Imagens locais do projeto. Cada modelo tem sua própria pasta em public/images/motos/.
// Para trocar uma moto, substitua o arquivo dentro da pasta correspondente mantendo o mesmo nome.
export const IMAGE_URLS = {
  logo: 'https://mottu.com.br/',
  hero: '/images/motos/02-mottu-sport/mottu-sport.webp',
  sportEsd: '/images/motos/01-mottu-sport-esd/mottu-sport-esd.webp',
  sport: '/images/motos/02-mottu-sport/mottu-sport.webp',
  pop110i: '/images/motos/03-pop-110i/pop-110i.webp',
  mottuE: '/images/motos/04-mottu-e/mottu-e.webp',
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  hero: 'Olá! Quero alugar uma moto e gostaria de falar com um atendente para realizar a contratação.',
  attendant: 'Olá! Quero saber mais sobre o aluguel de motos e gostaria de falar com um atendente.',
  minha: 'Olá! Tenho interesse no plano Minha Mottu de R$ 20,00 e gostaria de falar com um atendente para realizar a locação.',
  ilimitado: 'Olá! Tenho interesse no plano Ilimitado de R$ 24,00 e gostaria de falar com um atendente para realizar a locação.',
  availability: 'Olá! Quero consultar a disponibilidade de uma moto para locação e gostaria de falar com um atendente.',
};
