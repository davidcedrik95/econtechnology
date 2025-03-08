import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    home: 'Home',
    about: 'About',
    career: 'Career',
    services: 'Services',
    imprint: 'Imprint',
    leistungen: 'Performances',
    elektrotechnik: 'Electrical Engineering',
    photovoltaik: 'Photovoltaics',
    industrietechnik: 'Industrial Technology',
    language: 'Language',
    deutsch: 'German',
    english: 'English',
    this_is_home: 'This is the Home page.',
    this_is_about: 'This is the About page.',
  },
  de: {
    home: 'Startseite',
    about: 'Über uns',
    career: 'Karriere',
    services: 'Dienstleistungen',
    imprint: 'Impressum',
    leistungen: 'Leistungen',
    elektrotechnik: 'Elektrotechnik',
    photovoltaik: 'Photovoltaik',
    industrietechnik: 'Industrietechnik',
    language: 'Sprache',
    deutsch: 'Deutsch',
    english: 'Englisch',
    this_is_home: 'Dies ist die Startseite.',
    this_is_about: 'Dies ist die Über-uns-Seite.',
  },
};

const i18n = createI18n({
  locale: 'en', // Langue par défaut
  messages,
});

export default i18n;
