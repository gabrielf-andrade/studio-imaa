import {LuLayoutPanelTop} from 'react-icons/lu'
import {MdContentPaste, MdSearch} from 'react-icons/md'
import {defineArrayMember, defineField, type FieldGroupDefinition} from 'sanity'

/**
 * Grupos padrão para documentos do tipo "página"
 */
export const baseGroups: FieldGroupDefinition[] = [
  {name: 'content', title: 'Conteúdo', icon: MdContentPaste, default: true},
  {name: 'hero', title: 'Hero', icon: LuLayoutPanelTop},
  {name: 'seo', title: 'SEO / Metadados', icon: MdSearch},
]

/**
 * Campo de título padrão
 */
export const titleField = (title: string = 'Título', group: string = 'content') =>
  defineField({
    name: 'title',
    title,
    type: 'string',
    group,
    validation: (Rule) => Rule.required(),
  })

/**
 * Campo de slug padrão baseado no título
 */
export const slugField = (source: string = 'title', group: string = 'content') =>
  defineField({
    name: 'slug',
    title: 'Slug (URL)',
    type: 'slug',
    group,
    options: {
      source,
      maxLength: 96,
    },
    validation: (Rule) => Rule.required(),
    hidden: ({document}) => !(document as Record<string, unknown>)?.[source],
  })

/**
 * Campo de hero (usa o objeto customizado hero)
 */
export const heroField = (group: string = 'hero') =>
  defineField({
    name: 'hero',
    title: 'Hero',
    type: 'hero',
    group,
  })

/**
 * Campo de imagem destacada (usa o objeto customizado featuredImage)
 */
export const featuredImageField = (group: string = 'seo') =>
  defineField({
    name: 'featuredImage',
    title: 'Imagem Destacada',
    type: 'featuredImage',
    group,
    description:
      'Usada como imagem de pré-visualização ao compartilhar em redes sociais. Se "Exibir na página" estiver ativado, aparece abaixo do título da página.',
  })

/**
 * Campo de galeria
 */
export const galleryField = (group: string = 'content') =>
  defineField({
    name: 'gallery',
    title: 'Galeria de Imagens',
    type: 'gallery',
    group,
  })

/**
 * Campo de page builder - Array de blocos modulares para construção de páginas
 */
export const pageBuilderField = defineField({
  name: 'pageBuilder',
  title: 'Construtor de Página',
  type: 'array',
  group: 'content',
  options: {
    layout: 'list',
    insertMenu: {
      filter: true,
      views: [{name: 'list'}, {name: 'grid'}],
    },
  },
  of: [
    defineArrayMember({
      name: 'richText',
      title: 'Texto Rico',
      type: 'richText',
    }),
    defineArrayMember({
      name: 'textWithIllustration',
      title: 'Texto com Ilustração',
      type: 'textWithIllustration',
    }),
    defineArrayMember({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'gallery',
    }),
    defineArrayMember({
      name: 'videoFile',
      title: 'Vídeo (Arquivo)',
      type: 'videoFile',
    }),
    defineArrayMember({
      name: 'youtubeEmbed',
      title: 'YouTube Embed',
      type: 'youtubeEmbed',
    }),
    defineArrayMember({
      name: 'horizontalRule',
      title: 'Linha Horizontal',
      type: 'horizontalRule',
    }),
  ],
})

/**
 * Campo de resumo para SEO e listas
 */
export const excerptField = (group: string = 'seo') =>
  defineField({
    name: 'excerpt',
    title: 'Descrição para SEO',
    type: 'text',
    rows: 3,
    group,
    validation: (Rule) => [
      Rule.required().error('A descrição para SEO é obrigatória.'),
      Rule.max(160).warning('Recomendado até 160 caracteres para melhor SEO.'),
    ],
    description: 'Resumo exibido em buscadores e redes sociais. Máximo 160 caracteres.',
  })

/**
 * Base completa para páginas (campos comuns)
 * Nota: usa titleField() e slugField() com os valores padrão.
 * Para personalizar título ou fonte do slug, componha os campos individualmente.
 */
export const basePageFields = [
  titleField(),
  slugField(),
  heroField(),
  featuredImageField(),
  excerptField(),
  pageBuilderField,
]
