export const codeToLanguage = (code) => ({
    en: 'English',
    pt: 'Português',
    zh_TW: 'Chinese (Traditional)',
  }[code])
  
  export const createLanguageLink = (slug, lang) => {
    const rawSlug = slug.replace(`${lang}/`, '')
  
    return (targetLang) => targetLang === 'en'
      ? rawSlug
      : `${targetLang}/${rawSlug}`
  }
