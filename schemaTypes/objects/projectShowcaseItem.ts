import {MdMusicNote} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectShowcaseItem',
  title: 'Projeto',
  type: 'object',
  icon: MdMusicNote,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Projeto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Link (opcional)',
      type: 'cta',
      description: 'Ex: link para o Instagram ou página do projeto.',
    }),
  ],
  preview: {
    select: {name: 'name', description: 'description'},
    prepare({name, description}) {
      return {
        title: name || 'Projeto sem nome',
        subtitle: description
          ? `${description.substring(0, 80)}${description.length > 80 ? '…' : ''}`
          : '',
        media: MdMusicNote,
      }
    },
  },
})
