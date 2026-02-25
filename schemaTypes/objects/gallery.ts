import {MdPhotoLibrary} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galeria de Imagens',
  type: 'object',
  icon: MdPhotoLibrary,
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Galeria',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
              description: 'Descrição para acessibilidade (obrigatório se a imagem for enviada)',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as {asset?: any}
                  if (parent?.asset && !value) {
                    return 'O texto alternativo é obrigatório.'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'caption',
              title: 'Legenda',
              type: 'string',
              description: 'Exibida como legenda da imagem na galeria (opcional).',
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Adicione pelo menos uma imagem à galeria.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      media: 'images.0',
    },
    prepare({title, images, media}) {
      const imageCount = images?.length || 0
      return {
        title: title || 'Galeria sem título',
        subtitle: `${imageCount} ${imageCount === 1 ? 'imagem' : 'imagens'}`,
        media,
      }
    },
  },
})
