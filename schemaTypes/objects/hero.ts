import {LuLayoutPanelTop} from 'react-icons/lu'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: LuLayoutPanelTop,
  fields: [
    defineField({
      name: 'heading',
      title: 'Título Principal',
      type: 'string',
      description: 'Opcional. Se deixado em branco, o título da página será usado automaticamente.',
    }),
    defineField({
      name: 'tagline',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
      description: 'Opcional. Texto de apoio exibido abaixo do título.',
      validation: (Rule) => Rule.max(400).warning('Recomendado até 400 caracteres.'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Hero sem título',
        subtitle: 'Hero',
        media: LuLayoutPanelTop,
      }
    },
  },
})
