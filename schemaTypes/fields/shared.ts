import {MdContentPaste, MdSearch} from 'react-icons/md'
import {defineArrayMember, defineField, type FieldGroupDefinition} from 'sanity'

/**
 * Grupos padrão para documentos do tipo "página"
 */
export const baseGroups: FieldGroupDefinition[] = [
  {name: 'content', title: 'Conteúdo', icon: MdContentPaste, default: true},
  {name: 'seo', title: 'SEO / Metadados', icon: MdSearch},
]

/**
 * Campo de título padrão
 */
export const titleField = (title: string = 'Título') =>
  defineField({
    name: 'title',
    title,
    type: 'string',
    group: 'content',
    validation: (Rule) => Rule.required(),
  })

/**
 * Campo de slug padrão baseado no título
 */
export const slugField = (source: string = 'title') =>
  defineField({
    name: 'slug',
    title: 'Slug (URL)',
    type: 'slug',
    group: 'content',
    options: {
      source,
      maxLength: 96,
    },
    validation: (Rule) => Rule.required(),
    hidden: ({document}) => !(document as Record<string, unknown>)?.[source],
  })

/**
 * Campo de imagem destacada (usa o objeto customizado featuredImage)
 */
export const featuredImageField = defineField({
  name: 'featuredImage',
  title: 'Imagem Destacada',
  type: 'featuredImage',
  group: 'content',
  description: 'Imagem principal que aparece no topo',
})

/**
 * Campo de conteúdo Portable Text
 */
export const contentField = defineField({
  name: 'content',
  title: 'Corpo do Conteúdo',
  type: 'blockContent',
  group: 'content',
})

/**
 * Campo de galeria
 */
export const galleryField = defineField({
  name: 'gallery',
  title: 'Galeria de Imagens',
  type: 'gallery',
  group: 'content',
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
      name: 'hero',
      title: 'Hero',
      type: 'hero',
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
      name: 'downloadableFile',
      title: 'Link para PDF',
      type: 'downloadableFile',
    }),
    defineArrayMember({
      name: 'form',
      title: 'Formulário',
      type: 'form',
    }),
    defineArrayMember({
      name: 'callToAction',
      title: 'Chamada para Ação (CTA)',
      type: 'callToAction',
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
export const excerptField = defineField({
  name: 'excerpt',
  title: 'Resumo / Sinopse',
  type: 'text',
  group: 'seo',
  rows: 3,
  description: 'Usado para SEO e listagens automáticas.',
  validation: (Rule) =>
    Rule.max(160).warning('O ideal é manter abaixo de 160 caracteres para melhor SEO.'),
})

/**
 * Base completa para páginas (campos comuns)
 * Nota: usa titleField() e slugField() com os valores padrão.
 * Para personalizar título ou fonte do slug, componha os campos individualmente.
 */
export const basePageFields = [
  titleField(),
  slugField(),
  featuredImageField,
  contentField,
  pageBuilderField,
  excerptField,
]
