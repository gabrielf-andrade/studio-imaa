import {MdViewSidebar} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textWithIllustration',
  title: 'Texto com Ilustração',
  type: 'object',
  icon: MdViewSidebar,
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      description: 'Opcional. Título da seção.',
    }),
    defineField({
      name: 'text',
      title: 'Parágrafo',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
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
      name: 'imagePosition',
      title: 'Posição da imagem',
      type: 'string',
      options: {
        list: [
          {title: 'Direita', value: 'right'},
          {title: 'Esquerda', value: 'left'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'heading', image: 'image'},
    prepare({title, image}) {
      return {
        title: title || 'Texto com Ilustração',
        subtitle: 'Texto com Ilustração',
        media: image || MdViewSidebar,
      }
    },
  },
})
