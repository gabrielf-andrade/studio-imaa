import {MdCelebration} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homeBlockHighlightSection',
  title: 'Seção - Bloco em Destaque',
  type: 'object',
  icon: MdCelebration,
  fields: [
    defineField({
      name: 'label',
      title: 'Chapéu',
      type: 'string',
      description: 'Texto curto acima do título (ex: Retomada cultural).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'milestone',
      title: 'Marco (número ou texto)',
      type: 'string',
      initialValue: '10',
      description: 'Ex: "10", "mais de 10", "+10". Altere conforme o ano passa.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'milestoneLabel',
      title: 'Label do Marco',
      type: 'string',
      initialValue: 'anos',
      description: 'Texto ao lado do marco. Ex: "anos".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      initialValue: 'Bloco Chora Bananeira',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Texto Principal',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footer',
      title: 'Texto de Rodapé (itálico)',
      type: 'text',
      rows: 3,
      description: 'Frase de encerramento exibida em itálico com destaque amarelo.',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      milestone: 'milestone',
      milestoneLabel: 'milestoneLabel',
    },
    prepare({heading, milestone, milestoneLabel}) {
      return {
        title: heading || 'Bloco em Destaque',
        subtitle: `${milestone} ${milestoneLabel}`,
        media: MdCelebration,
      }
    },
  },
})
