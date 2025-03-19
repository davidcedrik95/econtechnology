// src/i18n.js
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    home: 'Home',
    about: 'About',
    career: 'Career',
    services: 'Services',
    imprint: 'Imprint',
    leistungen: 'Services',
    elektrotechnik: 'Electrical Engineering',
    photovoltaik: 'Photovoltaics',
    industrietechnik: 'Industrial Technology',
    language: 'Language',
    deutsch: 'German',
    english: 'English',
    privacy_policy: 'Privacy Policy',
    terms_of_service: 'Terms of Service',
    footer_desc: 'Experts in electrical engineering, photovoltaics and industrial technology.',
    rights_reserved: 'All rights reserved',
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
    privacy_policy: 'Datenschutzrichtlinie',
    terms_of_service: 'Nutzungsbedingungen',
    footer_desc: 'Spezialisten für Elektrotechnik, Photovoltaik und Industrietechnik.',
    rights_reserved: 'Alle Rechte vorbehalten',
  },
};

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
