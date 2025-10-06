export type ColorScheme = 'dark' | 'light' | 'system'
declare global {
  namespace App {
    interface Locals {
      colorScheme: ColorScheme
    }
  }
}

export {}
