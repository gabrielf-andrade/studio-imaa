import {MdFlag} from 'react-icons/md'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'homeMissionSection',
  title: 'Seção - Missão',
  type: 'object',
  icon: MdFlag,
  fields: [
    defineField({
      name: 'label',
      title: 'Chapéu',
      type: 'string',
      description: 'Texto curto acima do título (ex: Nossa missão).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Destaque do Título',
      type: 'string',
      description: 'Trecho do título com cor de destaque.',
    }),
    defineField({
      name: 'description',
      title: 'Descrição Principal',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryDescription',
      title: 'Descrição Secundária',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
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
      name: 'pillars',
      title: 'Pilares',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'pillar',
          title: 'Pilar',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              options: {
                list: [
                  {title: 'Música', value: 'music'},
                  {title: 'Cultura', value: 'heart'},
                  {title: 'Inclusão', value: 'users'},
                  {title: 'Transparência', value: 'star'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              validation: (Rule) => Rule.required(),
            }),
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
              name: 'color',
              title: 'Cor do Ícone',
              type: 'string',
              options: {
                list: [
                  {title: 'Verde (primário)', value: 'primary'},
                  {title: 'Amarelo (secundário)', value: 'secondary'},
                  {title: 'Laranja (acento)', value: 'accent'},
                  {title: 'Verde claro', value: 'primaryLight'},
                  {title: 'Amarelo escuro', value: 'secondaryDark'},
                ],
              },
              initialValue: 'primary',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'icon',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(4),
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
        title: title || 'Seção de Missão',
        subtitle,
        media,
      }
    },
  },
})
