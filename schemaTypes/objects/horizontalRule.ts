import {MdHorizontalRule} from 'react-icons/md'
import {defineField, defineType} from 'sanity'
import {HorizontalRuleInputDecorator} from '../../components/HorizontalRuleInputDecorator'

/**
 * Schema para inserção de uma linha horizontal (HR) no Portable Text.
 */
export default defineType({
  name: 'horizontalRule',
  title: 'Linha Divisória',
  type: 'object',
  icon: MdHorizontalRule,
  options: {
    modal: {type: 'popover'},
  },
  fields: [
    defineField({
      name: 'info',
      title: 'Nota Informativa',
      type: 'string',
      readOnly: true,
      components: {
        input: HorizontalRuleInputDecorator,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Linha Divisória',
        subtitle: 'Separador visual (HR)',
        media: MdHorizontalRule,
      }
    },
  },
})
