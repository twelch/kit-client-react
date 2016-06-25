import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
  messagesDirectory: '_translations',
  translationsDirectory: 'src/translations/',
  singleMessagesFile: true,
  languages: ['en','es','zh'], // any language you need
});