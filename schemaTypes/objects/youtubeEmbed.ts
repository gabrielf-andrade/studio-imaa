import {SiYoutube} from 'react-icons/si'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'youtubeEmbed',
  title: 'YouTube Embed',
  type: 'object',
  icon: SiYoutube,
  fields: [
    defineField({
      name: 'url',
      title: 'URL do YouTube',
      type: 'url',
      validation: (Rule) =>
        Rule.required().custom((url) => {
          if (!url) return true
          const youtubeRegex =
            /^https:\/\/((www\.)?youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/
          return youtubeRegex.test(url) || 'URL do YouTube inválida'
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Legenda',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
    },
    prepare({url, caption}) {
      return {
        title: caption || 'YouTube Embed',
        subtitle: url,
        media: SiYoutube,
      }
    },
  },
})
