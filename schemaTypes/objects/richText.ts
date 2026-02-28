import {MdTextFields} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'richText',
  title: 'Texto Rico',
  type: 'object',
  icon: MdTextFields,
  fields: [
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'background',
      title: 'Fundo',
      type: 'string',
      options: {
        list: [
          {title: 'Padrão', value: 'default'},
          {title: 'Suave', value: 'muted'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'default',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {content: 'content'},
    prepare({content}) {
      const firstBlock = content?.[0]
      const text = firstBlock?.children?.map((c: {text: string}) => c.text).join('') ?? ''
      return {
        title: text || 'Texto Rico',
        subtitle: 'Bloco de texto',
        media: MdTextFields,
      }
    },
  },
})
