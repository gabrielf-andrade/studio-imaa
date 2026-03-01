import {MdAdsClick} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'Seção de Chamada para Ação',
  type: 'object',
  icon: MdAdsClick,
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subtítulo',
      type: 'text',
      rows: 2,
      description: 'Opcional. Texto de apoio exibido abaixo do título.',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Botão Principal',
      type: 'cta',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Botão Secundário',
      type: 'cta',
      description: 'Opcional.',
    }),
    defineField({
      name: 'background',
      title: 'Fundo',
      type: 'string',
      options: {
        list: [
          {title: 'Destaque (cor primária)', value: 'primary'},
          {title: 'Suave (muted)', value: 'muted'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'primary',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      background: 'background',
    },
    prepare({heading, background}) {
      const bgLabel = background === 'primary' ? 'Destaque' : 'Suave'
      return {
        title: heading || 'Seção CTA',
        subtitle: `CTA · ${bgLabel}`,
        media: MdAdsClick,
      }
    },
  },
})
