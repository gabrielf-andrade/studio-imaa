import blockContent from './arrays/blockContent'
import contactPage from './documents/contactPage'
import homePage from './documents/homePage'
import page from './documents/page'
import siteSettings from './documents/siteSettings'
import transparencySection from './documents/transparencySection'
import contactInfo from './objects/contactInfo'
import cta from './objects/cta'
import ctaSection from './objects/ctaSection'
import downloadableFile from './objects/downloadableFile'
import featuredImage from './objects/featuredImage'
import formField from './objects/formField'
import gallery from './objects/gallery'
import hero from './objects/hero'
import homeBlockHighligthtSection from './objects/homeBlockHighligthtSection'
import homeMissionSection from './objects/homeMissionSection'
import homeProjectsPreview from './objects/homeProjectsPreview'
import horizontalRule from './objects/horizontalRule'
import projectShowcaseItem from './objects/projectShowcaseItem'
import projectShowcaseSection from './objects/projectShowcaseSection'
import menu from './objects/menu'
import menuItem from './objects/menuItem'
import richText from './objects/richText'
import socialLinks from './objects/socialLinks'
import textWithIllustration from './objects/textWithIllustration'
import videoFile from './objects/videoFile'
import youtubeEmbed from './objects/youtubeEmbed'

const documents = [homePage, contactPage, page, siteSettings, transparencySection]

const objects = [
  menu,
  menuItem,
  hero,
  richText,
  textWithIllustration,
  gallery,
  featuredImage,
  horizontalRule,
  homeBlockHighligthtSection,
  homeProjectsPreview,
  homeMissionSection,
  downloadableFile,
  youtubeEmbed,
  videoFile,
  contactInfo,
  socialLinks,
  cta,
  formField,
  ctaSection,
  projectShowcaseItem,
  projectShowcaseSection,
]

const blocks = [blockContent]

export const schemaTypes = [...documents, ...objects, ...blocks]
