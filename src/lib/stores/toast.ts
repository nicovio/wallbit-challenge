import type { Snippet } from 'svelte'
import { writable } from 'svelte/store'

export interface Toast {
  id: string
  title: string
  type: 'error' | 'info' | 'success' | 'warning'
  description?: Snippet | string
}

export const toasts = writable<Toast[]>([])

/**
 * Añade una nueva notificación toast a la store.
 * @param title El título a mostrar.
 * @param duration Cuánto tiempo mostrar el toast en milisegundos.
 * @param autoClose Si se debe cerrar automáticamente el toast.
 * @param description Descripción del toast.
 */
const createToast = ({ type = 'info' }: { type?: 'error' | 'info' | 'success' | 'warning' }) => {
  return ({
    title,
    duration = 3000,
    autoClose = true,
    description
  }: {
    title: string
    duration?: number
    autoClose?: boolean
    description?: Snippet | string
  }): void => {
    const id = crypto.randomUUID()

    const newToast: Toast = { id, title, type, description }

    toasts.update((allToasts) => [newToast, ...allToasts])

    if (autoClose) {
      setTimeout(() => remove(id), duration)
    }
  }
}

/**
 * Elimina una notificación toast de la store por su ID.
 * @param id El ID del toast a eliminar.
 */
const remove = (id: string): void => {
  toasts.update((allToasts) => allToasts.filter((toast) => toast.id !== id))
}

const success = createToast({ type: 'success' })

const error = createToast({ type: 'error' })

export const toastService = {
  success,
  error,
  remove
}
