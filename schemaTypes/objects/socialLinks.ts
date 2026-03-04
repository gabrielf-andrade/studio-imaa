import {MdShare} from 'react-icons/md'
import {SiBluesky, SiFacebook, SiInstagram, SiX, SiYoutube} from 'react-icons/si'
import {defineField, defineType} from 'sanity'

const titleMap = {
  instagram: {title: 'Instagram', icon: SiInstagram},
  facebook: {title: 'Facebook', icon: SiFacebook},
  youtube: {title: 'YouTube', icon: SiYoutube},
  twitter: {title: 'X / Twitter', icon: SiX},
  bluesky: {title: 'Bluesky', icon: SiBluesky},
} as const

export default defineType({
  name: 'socialLink',
  title: 'Rede Social',
  type: 'object',
  icon: MdShare,
  fields: [
    defineField({
      name: 'platform',
      title: 'Plataforma',
      type: 'string',
      options: {
        list: (Object.keys(titleMap) as Array<keyof typeof titleMap>).map((value) => ({
          title: titleMap[value].title,
          value,
        })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL do Perfil',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Handle / Nome do Perfil',
      description:
        'Handle ou nome do perfil exibido no site (ex: "@chora_bananeira" no Instagram, "@chorabananeira" no YouTube, "Bloco Chora Bananeira" no Facebook). Também usado como texto de acessibilidade.',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagem de Capa',
      type: 'image',
      options: {hotspot: true},
      description:
        'Imagem exibida na seção de redes sociais da home. Proporção quadrada recomendada.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
      media: 'image',
    },
    prepare({platform, url}: {platform?: string; url?: string; media?: unknown}) {
      const displayPlatform = platform
        ? titleMap[platform as keyof typeof titleMap]?.title ||
          platform.charAt(0).toUpperCase() + platform.slice(1)
        : 'Rede Social'
      return {
        title: displayPlatform,
        subtitle: url,
        media: titleMap[platform as keyof typeof titleMap]?.icon || MdShare,
      }
    },
  },
})
