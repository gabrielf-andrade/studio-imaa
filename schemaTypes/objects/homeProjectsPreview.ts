import {MdLibraryMusic, MdOutlineViewAgenda} from 'react-icons/md'
import {defineArrayMember, defineField, defineType} from 'sanity'

const PROJECT_ACCENT_LABEL_MAP = {
  secondary: 'Dourado (secundário)',
  primary: 'Azul (primário)',
  primaryLight: 'Azul claro',
  accent: 'Laranja (acento)',
  muted: 'Creme (suave / muted)',
} as const

export default defineType({
  name: 'homeProjectsPreview',
  title: 'Seção - Projetos em Destaque',
  type: 'object',
  icon: MdLibraryMusic,
  fields: [
    defineField({
      name: 'label',
      title: 'Chapéu',
      type: 'string',
      description: 'Texto curto acima do título (ex: O que fazemos).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem Principal',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          description: 'Descrição para acessibilidade (obrigatório se a imagem for enviada).',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as {asset?: {_ref?: string}}
              if (parent?.asset?._ref && !value?.trim()) {
                return 'O texto alternativo é obrigatório quando uma imagem é selecionada.'
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Projetos',
      type: 'array',
      description: 'Lista de projetos exibida ao lado da imagem.',
      of: [
        defineArrayMember({
          name: 'project',
          title: 'Projeto',
          type: 'object',
          icon: MdOutlineViewAgenda,
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'accent',
              title: 'Cor da Barra',
              type: 'string',
              options: {
                list: [
                  {title: 'Dourado (secundário)', value: 'secondary'},
                  {title: 'Azul (primário)', value: 'primary'},
                  {title: 'Azul claro', value: 'primaryLight'},
                  {title: 'Laranja (acento)', value: 'accent'},
                  {title: 'Creme (suave / muted)', value: 'muted'},
                ],
              },
              initialValue: 'secondary',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'accent',
            },
            prepare({title, subtitle}) {
              const accentLabel = subtitle
                ? PROJECT_ACCENT_LABEL_MAP[subtitle as keyof typeof PROJECT_ACCENT_LABEL_MAP]
                : undefined
              return {
                title: title || 'Projeto sem título',
                subtitle: accentLabel ? `Barra: ${accentLabel}` : 'Barra não definida',
                media: MdOutlineViewAgenda,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(3),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'label',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Seção de Projetos',
        subtitle,
        media,
      }
    },
  },
})
