import type { Handle } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
  return await resolve(event, {
    preload: ({ type }) => {
      return type === 'font' || type === 'js' || type === 'css' || type === 'asset'
    }
  })
}) satisfies Handle
