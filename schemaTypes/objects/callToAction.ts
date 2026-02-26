import {MdTouchApp} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'callToAction',
  title: 'Chamada para Ação (CTA)',
  type: 'object',
  icon: MdTouchApp,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'link',
      title: 'Link de Destino',
      type: 'url',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Texto do Botão',
      type: 'string',
      placeholder: 'Saiba mais',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      buttonLabel: 'buttonLabel',
    },
    prepare({title, buttonLabel}) {
      return {
        title: title || 'CTA sem título',
        subtitle: buttonLabel || 'Sem texto de botão',
        media: MdTouchApp,
      }
    },
  },
})
