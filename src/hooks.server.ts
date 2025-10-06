import { PUBLIC_COOKIE_COLOR_SCHEME } from '$lib/constants'
import type { Handle } from '@sveltejs/kit'
import type { ColorScheme } from './app'

export const handle = (async ({ event, resolve }) => {
  const { locals, cookies } = event

  const cookiesColorScheme = cookies.get(PUBLIC_COOKIE_COLOR_SCHEME) as ColorScheme

  const newColorScheme: ColorScheme = cookiesColorScheme || 'system'

  locals.colorScheme = newColorScheme

  return await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%cookie-color-scheme%', newColorScheme),
    preload: ({ type }) => {
      return type === 'font' || type === 'js' || type === 'css' || type === 'asset'
    }
  })
}) satisfies Handle
