import {defineCliConfig} from 'sanity/cli'
import {SANITY_DATASET, SANITY_PROJECT_ID} from './environments'

export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'e6xfk55amzy2kvcyp4ppq93t',
  },
  schemaExtraction: {
    enabled: true,
    enforceRequiredFields: true,
  },
  typegen: {
    /**
     * Generate types for the Sanity schema and queries
     * THE FRONTEND FOLDER MUST BE IN THE SAME DIRECTORY AS THE STUDIO
     */
    path: ['./schemaTypes/**/*.{ts,tsx}', '../astro-imaa/src/lib/queries/**/*.{ts,tsx,astro}'],
    schema: 'schema.json',
    generates: '../astro-imaa/src/lib/sanity.types.ts',
    overloadClientMethods: true,
  },
})
