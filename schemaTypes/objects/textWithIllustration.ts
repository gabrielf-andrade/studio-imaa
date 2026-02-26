import {MdTextFields} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textWithIllustration',
  title: 'Texto com Ilustração',
  type: 'object',
  icon: MdTextFields,
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Texto / Descrição',
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
  ],
  preview: {
    select: {
      title: 'heading',
      image: 'image',
    },
    prepare({title, image}) {
      return {
        title: title || 'Texto com Ilustração sem título',
        subtitle: 'Texto com Ilustração',
        media: image || MdTextFields,
      }
    },
  },
})
