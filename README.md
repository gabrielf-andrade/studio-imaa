# studio-imaa

Sanity Studio do Instituto Maestro Abiud. Este repositório define schemas, estrutura editorial, Page Builder e geração de tipos para o frontend.

## Stack

- Sanity Studio 5
- TypeScript
- Sanity TypeGen

## Requisitos

- Node.js 22+
- pnpm 10+

## Instalação

```bash
pnpm install
```

## Variáveis de ambiente

Arquivo local: `.env.local`

Obrigatórias:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_WEBHOOK_SALT`

## Scripts

- `pnpm dev` inicia o Studio local
- `pnpm build` gera build do Studio
- `pnpm deploy` publica no Sanity Hosting
- `pnpm codegen` extrai schema e gera tipos para o frontend
- `pnpm validate-documents` valida documentos no dataset

## Plugins usados

- `structureTool` (`sanity/structure`): aplica a estrutura customizada do Desk (`deskStructure`)
- `visionTool` (`@sanity/vision`): inspeção e teste de queries GROQ
- `media` (`sanity-plugin-media`): gerenciamento de mídia no Studio
- `ptBRLocale` (`@sanity/locale-pt-br`): interface do Studio em português (pt-BR)
- `webhooksTrigger` (`sanity-plugin-webhooks-trigger`): botão para disparar o deploy do site público

## Estrutura principal

- `schemaTypes/documents/**` modelos de documento
- `schemaTypes/objects/**` objetos reutilizáveis
- `schemaTypes/arrays/**` blocos/arrays
- `structure/deskStructure.ts` organização do painel editorial
- `sanity.config.ts` configuração de plugins, singletons e ações
- `sanity.cli.ts` configuração de schema extraction e typegen

## Singletons atuais

- `siteSettings`
- `homePage`
- `contactPage`

## Modelagem principal

- `page`: páginas genéricas renderizadas pelo Page Builder no frontend
- `transparencySection`: seções do Portal da Transparência
- blocos em `schemaTypes/objects/**` para rich text, gallery, CTA, vídeo, arquivos e showcases

## Integração com Frontend

O typegen está configurado para gerar:

- `../astro-imaa/src/lib/sanity.types.ts`

Após mudar schema/query, rode `pnpm codegen` aqui e valide no frontend com `pnpm typecheck` em `astro-imaa`.

## Guia para agentes

Veja também: [`AGENTS.md`](./AGENTS.md)
