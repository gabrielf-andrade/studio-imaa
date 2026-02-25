import {MdMenu} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'menu',
  title: 'Menu',
  type: 'object',
  icon: MdMenu,
  fields: [
    defineField({
      name: 'label',
      title: 'Label do Menu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Itens do Menu',
      type: 'array',
      of: [{type: 'menuItem'}],
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
  },
})
