import {MdAdsClick} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Chamada para Ação (CTA)',
  type: 'object',
  icon: MdAdsClick,
  fields: [
    defineField({
      name: 'label',
      title: 'Texto do Botão',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string}
          if (!value && parent?.linkType) return 'O texto do botão é obrigatório.'
          return true
        }),
    }),
    defineField({
      name: 'linkType',
      title: 'Tipo de Link',
      type: 'string',
      options: {
        list: [
          {title: 'Página interna', value: 'internal'},
          {title: 'Link externo', value: 'external'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: undefined,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {label?: string}
          if (parent?.label && !value) return 'Selecione o tipo de link.'
          return true
        }),
    }),
    defineField({
      name: 'pageReference',
      title: 'Página de Destino',
      type: 'reference',
      to: [{type: 'page'}, {type: 'homePage'}, {type: 'contactPage'}],
      hidden: ({parent}) => (parent as {linkType?: string})?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {label?: string; linkType?: string}
          if (parent?.label && parent?.linkType === 'internal' && !value)
            return 'Selecione uma página de destino.'
          return true
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL Externa',
      type: 'url',
      hidden: ({parent}) => (parent as {linkType?: string})?.linkType !== 'external',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https', 'mailto', 'tel'],
        }).custom((value, context) => {
          const parent = context.parent as {label?: string; linkType?: string}
          if (parent?.label && parent?.linkType === 'external' && !value)
            return 'Informe a URL externa.'
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Abrir em nova aba?',
      type: 'boolean',
      initialValue: true,
      hidden: ({parent}) => (parent as {linkType?: string})?.linkType !== 'external',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      page: 'pageReference.title',
      externalUrl: 'externalUrl',
    },
    prepare({label, linkType, page, externalUrl}) {
      const destination =
        linkType === 'external' ? externalUrl || 'Sem URL' : page ? `→ ${page}` : 'Sem destino'
      return {
        title: label || 'CTA sem label',
        subtitle: destination,
        media: MdAdsClick,
      }
    },
  },
})
