import {MdCelebration, MdFlag, MdHome, MdLibraryMusic, MdPhoto, MdSearch} from 'react-icons/md'
import {defineField, defineType} from 'sanity'
import {excerptField, titleField} from '../fields/shared'

export default defineType({
  name: 'homePage',
  title: 'Página Inicial',
  type: 'document',
  icon: MdHome,
  groups: [
    {name: 'hero', title: 'Hero', icon: MdPhoto, default: true},
    {name: 'blockHighlight', title: 'Bloco em Destaque', icon: MdCelebration},
    {name: 'mission', title: 'Missão', icon: MdFlag},
    {name: 'projects', title: 'Projetos', icon: MdLibraryMusic},
    {name: 'seo', title: 'SEO / Metadados', icon: MdSearch},
  ],
  fields: [
    titleField('Título da Página (SEO)', 'seo'),
    excerptField(),
    defineField({
      name: 'logo',
      title: 'Logo da Hero',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      description: 'Opcional. Se não preenchido, usa o logo definido nas Configurações do Site.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as {asset?: {_ref?: string}}
              if (parent?.asset?._ref && !value?.trim()) {
                return 'Texto alternativo é obrigatório quando uma imagem é fornecida.'
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'heroDescription',
      title: 'Texto Descritivo',
      type: 'text',
      rows: 4,
      group: 'hero',
      description: 'Texto exibido abaixo do título na seção hero.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Botão Principal',
      type: 'cta',
      group: 'hero',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Botão Secundário',
      type: 'cta',
      group: 'hero',
    }),
    defineField({
      name: 'blockHighlightSection',
      title: 'Seção - Bloco em Destaque',
      type: 'homeBlockHighlightSection',
      group: 'blockHighlight',
    }),
    defineField({
      name: 'missionSection',
      title: 'Seção - Missão',
      type: 'homeMissionSection',
      group: 'mission',
    }),
    defineField({
      name: 'projectsPreview',
      title: 'Seção - Projetos em Destaque',
      type: 'homeProjectsPreview',
      group: 'projects',
    }),
  ],
})
