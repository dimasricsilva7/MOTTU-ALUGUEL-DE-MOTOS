# Mottu WhatsApp Landing — Meta Pixel + CAPI + Leads

Landing page Next.js/TypeScript com:

- Modal obrigatório antes de qualquer CTA de WhatsApp
- Captura de nome, telefone e e-mail
- Registro dos leads em Supabase
- Meta Pixel com `PageView` e `Lead`
- Meta Conversions API (CAPI) para `PageView` e `Lead`
- Deduplicação Pixel/CAPI usando o mesmo `event_id`
- Hash SHA-256 de e-mail, telefone e primeiro nome no CAPI
- Preservação de `_fbp` e `_fbc` quando disponíveis
- Painel administrativo em `/admin`
- Login protegido por senha armazenada no servidor
- Exclusão de leads pelo painel
- Contador de leads total e do dia

## 1. Banco de dados

Crie um projeto no Supabase e abra **SQL Editor**. Execute o conteúdo de `supabase-schema.sql`.

A tabela `leads` armazena apenas os campos necessários para o atendimento, além de ID, data, URL de origem e `event_id` para rastreabilidade/deduplicação.

## 2. Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_META_PIXEL_ID=1341452934854249
META_PIXEL_ID=1341452934854249
META_ACCESS_TOKEN=SEU_TOKEN_SECRETO
META_GRAPH_API_VERSION=v26.0
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY
ADMIN_PASSWORD=UMA_SENHA_FORTE
ADMIN_SESSION_SECRET=UMA_STRING_ALEATORIA_LONGA
```

**Nunca** coloque o token da Meta ou a `SUPABASE_SERVICE_ROLE_KEY` em variável `NEXT_PUBLIC_*` e nunca envie `.env.local` para o GitHub.

## 3. Rodar localmente

```bash
npm install
npm run dev
```

Site: `http://localhost:3000`

Painel: `http://localhost:3000/admin`

## 4. Como o tracking funciona

### PageView

Ao carregar a página:

1. O Meta Pixel dispara `PageView` no navegador.
2. O navegador chama `/api/meta/pageview`.
3. O servidor envia `PageView` pela CAPI.
4. O mesmo `event_id` é usado nos dois lados para deduplicação.

### Lead

Ao clicar em qualquer CTA:

1. Abre o modal.
2. Usuário preenche nome, telefone e e-mail.
3. `/api/leads` grava o lead no Supabase.
4. O servidor envia `Lead` pela CAPI com dados de matching protegidos por hash.
5. O navegador dispara `Lead` pelo Pixel com o mesmo `eventID`.
6. Só depois o usuário é direcionado ao WhatsApp.

## 5. GitHub

Dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "feat: landing com leads e Meta CAPI"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

## 6. Vercel

Importe o repositório no Vercel, selecione o framework Next.js e mantenha os comandos padrão.

Depois vá em **Settings → Environment Variables** e crie as mesmas variáveis do `.env.local`, especialmente os segredos. Faça um novo deploy depois de salvá-las.

Variáveis públicas:

- `NEXT_PUBLIC_META_PIXEL_ID`

Variáveis privadas:

- `META_PIXEL_ID`
- `META_ACCESS_TOKEN`
- `META_GRAPH_API_VERSION`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## 7. Segurança

- Token Meta somente no servidor.
- Service Role Key somente no servidor.
- Cookie de admin `HttpOnly`, `SameSite=Strict` e `Secure` em produção.
- RLS habilitado na tabela `leads`.
- Não há credenciais reais neste repositório.

## 8. Teste na Meta

Depois do deploy, use o **Events Manager → Test Events** da sua fonte de dados para validar `PageView` e `Lead`. Faça um envio real de teste pelo formulário e confirme que o evento aparece com conexão Browser + Server e que a deduplicação está ocorrendo pelo mesmo `event_id`.

## Imagens das motos

As quatro imagens da seção de motos e a imagem principal do Hero foram incorporadas em `public/images/motos/` para evitar falhas de hotlink/bloqueio de imagens externas no navegador e na Vercel. Os arquivos foram obtidos das URLs fornecidas para o projeto.
