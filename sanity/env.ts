const configuredProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const configuredDataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-11'
export const projectId = configuredProjectId || 'midnight-daily'
export const dataset = configuredDataset || 'production'
export const isSanityConfigured = Boolean(configuredProjectId && configuredDataset)
