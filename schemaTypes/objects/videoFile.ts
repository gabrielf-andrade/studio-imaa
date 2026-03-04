import {MdMovie} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'videoFile',
  title: 'Vídeo (Arquivo)',
  type: 'object',
  icon: MdMovie,
  fields: [
    defineField({
      name: 'file',
      title: 'Arquivo de Vídeo',
      type: 'file',
      options: {accept: 'video/mp4,video/webm'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Imagem de Capa (Poster)',
      type: 'image',
      options: {hotspot: true},
      description: 'Thumbnail exibida antes do vídeo iniciar.',
    }),
    defineField({
      name: 'caption',
      title: 'Legenda',
      type: 'string',
      description: 'Opcional. Exibida abaixo do vídeo.',
    }),
    defineField({
      name: 'autoplay',
      title: 'Reprodução automática',
      type: 'boolean',
      description: 'Se ativado, o vídeo inicia mudo e em loop automaticamente. Ignora o poster.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'posterImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Vídeo',
        subtitle: 'Arquivo de vídeo',
        media: media || MdMovie,
      }
    },
  },
})
