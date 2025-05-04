import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'
import fr from './locales/fr.json'

const messages = {
  en,
  de,
  fr
}

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages
})

export default i18n