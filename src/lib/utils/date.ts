const formatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
} as const

function formatDate(ISODate: string): string {
  const date = new Date(ISODate)

  const formatoFecha = new Intl.DateTimeFormat('es-ES', formatOptions).format(date)

  return formatoFecha.replace(', ', ' - ')
}

export const dateUtils = {
  formatDate
}
