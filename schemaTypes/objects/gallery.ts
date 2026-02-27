import {MdPhotoLibrary} from 'react-icons/md'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galeria de Imagens',
  type: 'object',
  icon: MdPhotoLibrary,
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      description: 'Opcional.',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid 2 colunas', value: 'grid2'},
          {title: 'Grid 3 colunas', value: 'grid3'},
          {title: 'Masonry', value: 'masonry'},
          {title: 'Carrossel', value: 'carousel'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'grid3',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
              description: 'Descrição da imagem para acessibilidade.',
            }),
            defineField({
              name: 'caption',
              title: 'Legenda',
              type: 'string',
              description: 'Opcional. Exibida no lightbox.',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading', images: 'images', media: 'images.0'},
    prepare({title, images, media}) {
      const count = images ? Object.keys(images).length : 0
      return {
        title: title || 'Galeria',
        subtitle: `${count} image${count === 1 ? 'm' : 'ns'}`,
        media: media || MdPhotoLibrary,
      }
    },
  },
})
