import {MdContactPage, MdHome, MdSettings} from 'react-icons/md'
import {ListBuilder, StructureBuilder} from 'sanity/structure'

export const singletonTypes = new Set(['siteSettings', 'homePage', 'contactPage'])
const hiddenDocTypes = new Set(['menuItem', 'media.tag', ...singletonTypes])

export const deskStructure = (S: StructureBuilder): ListBuilder =>
  S.list()
    .title('Conteúdo')
    .items([
      // Configurações do Site (Singleton)
      S.listItem()
        .title('Configurações do Site')
        .id('siteSettings')
        .icon(MdSettings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Configurações Gerais'),
        ),
      // Página Inicial
      S.listItem()
        .title('Página Inicial')
        .id('homePage')
        .icon(MdHome)
        .child(S.document().schemaType('homePage').documentId('homePage').title('Página Inicial')),
      // Página de Contato
      S.listItem()
        .title('Página de Contato')
        .id('contactPage')
        .icon(MdContactPage)
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Página de Contato'),
        ),

      S.divider(),

      // Lista automática dos outros documentos
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId() ?? ''
        return !hiddenDocTypes.has(id)
      }),
    ])
