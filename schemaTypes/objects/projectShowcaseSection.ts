import {MdGroups} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectShowcaseSection',
  title: 'Vitrine de Projetos',
  type: 'object',
  icon: MdGroups,
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      description: 'Ex: "Nossos Corpos Artísticos".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 2,
      description: 'Breve descrição exibida abaixo do título.',
    }),
    defineField({
      name: 'items',
      title: 'Projetos',
      type: 'array',
      of: [{type: 'projectShowcaseItem'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', items: 'items'},
    prepare({heading, items}) {
      const count = items?.length ?? 0
      return {
        title: heading || 'Vitrine de Projetos',
        subtitle: `${count} projeto${count === 1 ? '' : 's'}`,
        media: MdGroups,
      }
    },
  },
})
