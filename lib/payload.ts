import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Returns a typed, local Payload CMS instance for querying collections
 * directly in Next.js Server Components and Server Actions without HTTP overhead.
 */
export const getPayloadClient = async () => {
  return await getPayload({ config })
}
