import {SiYoutube} from 'react-icons/si'
import {defineField, defineType} from 'sanity'

const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([^&\n?#]+)/

function extractYouTubeId(url: string): string | null {
  return url.match(YOUTUBE_REGEX)?.[1] ?? null
}

export default defineType({
  name: 'youtubeEmbed',
  title: 'Vídeo do YouTube',
  type: 'object',
  icon: SiYoutube,
  fields: [
    defineField({
      name: 'url',
      title: 'URL do YouTube',
      type: 'url',
      description: 'Cole a URL completa do vídeo. Ex: https://www.youtube.com/watch?v=abc123',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true
          if (!extractYouTubeId(value)) {
            return 'URL inválida. Use o formato: https://www.youtube.com/watch?v=ID'
          }
          return true
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Legenda',
      type: 'string',
      description: 'Opcional. Exibida abaixo do vídeo.',
    }),
  ],
  preview: {
    select: {caption: 'caption', url: 'url'},
    prepare({caption, url}) {
      return {
        title: caption || 'Vídeo do YouTube',
        subtitle: url || '',
        media: SiYoutube,
      }
    },
  },
})
