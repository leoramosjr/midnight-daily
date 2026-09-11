import { createClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId } from '../env'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

export { isSanityConfigured }
