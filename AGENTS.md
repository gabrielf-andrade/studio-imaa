# AGENTS.md

Guia para agentes trabalhando no repositório `studio-imaa/`.

## 1) Escopo do repositório

- Sanity Studio do projeto IMAA.
- Responsável por schemas, desk structure, validações editoriais, plugins e TypeGen para o frontend.
- Integra com `../astro-imaa/`, frontend público em Astro.
- O frontend usa Page Builder para páginas flexíveis e API routes para formulários.

## 2) Arquitetura Studio -> Query -> Frontend

Fluxo-base:

1. Modelagem de conteúdo neste repo em `schemaTypes/**`.
2. Organização editorial em `structure/deskStructure.ts`.
3. Frontend define contratos GROQ em `../astro-imaa/src/lib/queries/**`.
4. `pnpm codegen` neste Studio gera `../astro-imaa/src/lib/sanity.types.ts`.
5. Frontend consome aliases em `../astro-imaa/src/lib/sanity-derived-types.ts`.

Princípio: schema é fonte de verdade; query define contrato; frontend consome contrato tipado.

## 3) Entrypoints principais

- `sanity.config.ts`: plugins, schema registry, singleton actions/templates e webhook trigger.
- `sanity.cli.ts`: schema extraction e typegen para o frontend.
- `schemaTypes/index.ts`: registro único dos schemas.
- `schemaTypes/documents/**`: documentos principais.
- `schemaTypes/objects/**`: objetos reutilizáveis e blocos de page builder.
- `schemaTypes/arrays/blockContent.ts`: Portable Text e objetos embutidos.
- `structure/deskStructure.ts`: desk structure e singletons.
- `environments.ts`: contratos de ambiente do Studio.

## 4) Conteúdo e contratos atuais

Documentos principais:

- `siteSettings`: configurações globais consumidas pelo middleware/layout do frontend.
- `homePage`: conteúdo da página inicial.
- `contactPage`: página de contato e configuração editorial do formulário.
- `page`: páginas genéricas renderizadas pelo Page Builder em `astro-imaa/src/pages/[slug].astro`.
- `transparencySection`: seções do Portal da Transparência.

Objetos/blocos relevantes:

- `hero`, `featuredImage`, `cta`, `ctaSection`.
- `richText`, `textWithIllustration`, `gallery`, `videoFile`, `youtubeEmbed`.
- `downloadableFile`, `horizontalRule`, `projectShowcaseSection`.
- `menu`, `menuItem`, `socialLinks`, `contactInfo`, `formField`.

## 5) Singletons e desk

- Singletons atuais: `siteSettings`, `homePage`, `contactPage`.
- Templates e actions devem ser filtrados para impedir criação duplicada de singletons.
- Alterações em labels/instruções editoriais devem manter pt-BR.
- Mudanças de desk devem preservar o acesso editorial aos documentos principais e singletons.

## 6) Page Builder e Portable Text

Ao adicionar novo bloco no Page Builder:

1. Criar schema em `schemaTypes/objects/`.
2. Registrar em `schemaTypes/index.ts`.
3. Incluir o bloco no schema que usa `pageBuilder`.
4. Projetar no `PAGE_BUILDER_FRAGMENT` em `../astro-imaa/src/lib/queries/fragments.ts`.
5. Rodar `pnpm codegen`.
6. Implementar renderer em `../astro-imaa/src/components/common/pagebuilder/**`.
7. Ajustar tipos derivados no frontend quando necessário.

Ao alterar Portable Text:

- Conferir `schemaTypes/arrays/blockContent.ts`.
- Conferir renderer em `../astro-imaa/src/components/common/portabletext/**`.
- Validar imagens, arquivos, vídeos, links e objetos embutidos.

## 7) TypeGen e integração com frontend

- `pnpm codegen` deve atualizar `../astro-imaa/src/lib/sanity.types.ts`.
- Queries lidas pelo typegen ficam em `../astro-imaa/src/lib/queries/**`.
- Não editar manualmente `sanity.types.ts` no frontend.
- Mudou schema ou projeção GROQ: rodar codegen e depois validar o frontend com `pnpm typecheck`.
- No frontend, tipos de consumo devem ser centralizados em `src/lib/sanity-derived-types.ts`.

## 8) Plugins com impacto operacional

- `sanity-plugin-webhooks-trigger`: ação no Studio para disparar deploy do frontend (`githubEventType: deploy-production`).
- `sanity-plugin-media`: fluxo editorial de upload/organização de assets.
- `@sanity/vision`: suporte para validar/depurar GROQ.
- `@sanity/locale-pt-br`: interface editorial em pt-BR.

## 9) Variáveis de ambiente

Studio:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_WEBHOOK_SALT`

Frontend/Worker relacionado:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_DEPLOY_MODE`
- `FROM_EMAIL`
- `TO_EMAIL`
- `RESEND_API_KEY`
- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

## 10) Comandos

- `pnpm dev`
- `pnpm build`
- `pnpm deploy`
- `pnpm codegen`
- `pnpm validate-documents`

Fluxo mínimo após mudança de schema/query:

1. `pnpm codegen` neste repo.
2. `pnpm typecheck` em `../astro-imaa`.

## 11) Fluxos recomendados

### Alterar schema existente

1. Ajustar schema em `schemaTypes/**`.
2. Ajustar validações/labels/fields.
3. Conferir desk em `structure/deskStructure.ts` se a mudança afetar edição.
4. Ajustar queries no frontend, se a projeção precisar mudar.
5. Rodar `pnpm codegen`.
6. Validar frontend com `pnpm typecheck`.
7. Rodar `pnpm validate-documents` se a mudança afetar conteúdo existente.

### Criar novo documento

1. Criar schema em `schemaTypes/documents/`.
2. Registrar em `schemaTypes/index.ts`.
3. Expor no desk se aplicável.
4. Criar/ajustar queries no frontend.
5. Rodar `pnpm codegen`.
6. Ajustar tipos derivados e rotas no frontend.

### Alterar menu/navegação

1. Ajustar schema/objects de menu.
2. Ajustar desk/labels se necessário.
3. Ajustar fragments/queries no frontend.
4. Rodar `pnpm codegen`.
5. Validar normalização de links no frontend (`link-utils.ts`) e estados desktop/mobile.

## 12) Checklist rápido

- Schema registrado em `schemaTypes/index.ts`.
- Desk continua expondo os documentos/singletons corretos.
- Labels e descrições editoriais em pt-BR.
- `pnpm codegen` executado quando contrato mudar.
- `pnpm validate-documents` quando houver impacto em conteúdo existente.
- Frontend validado com `pnpm typecheck` quando query/schema mudar.
