import {MdAssignment} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'form',
  title: 'Formulário',
  type: 'object',
  icon: MdAssignment,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'formType',
      title: 'Tipo de Formulário',
      type: 'string',
      options: {
        list: [
          {title: 'Contato', value: 'contact'},
          {title: 'Inscrição', value: 'application'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'submitLabel',
      title: 'Texto do Botão Enviar',
      type: 'string',
      placeholder: 'Enviar',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      formType: 'formType',
    },
    prepare({title, formType}) {
      return {
        title: title || 'Formulário sem título',
        subtitle: formType ? `Tipo: ${formType}` : 'Formulário',
        media: MdAssignment,
      }
    },
  },
})
