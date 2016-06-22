import en from './en.json'
import es from './es.json'
import zh from './zh.json'

export const translations = {
  en,
  'en-US': en, // Reuse en translations for multiple locales
  es,
  zh
}
