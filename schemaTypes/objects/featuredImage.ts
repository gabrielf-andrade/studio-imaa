import {MdImage} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featuredImage',
  title: 'Imagem Destacada',
  type: 'image',
  icon: MdImage,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Texto Alternativo',
      type: 'string',
      description: 'Descrição para acessibilidade (obrigatório se a imagem for enviada).',
      // Validação condicional: só exige o ALT se houver um ASSET (imagem)
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {asset?: {_ref?: string; _type?: 'reference'}}
          if (parent?.asset?._ref && !value?.trim()) {
            return 'O texto alternativo é obrigatório quando uma imagem é selecionada.'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset',
    },
    prepare({title, media}) {
      return {
        title: title || 'Imagem sem texto alternativo',
        subtitle: 'Imagem Destacada',
        media,
      }
    },
  },
})
