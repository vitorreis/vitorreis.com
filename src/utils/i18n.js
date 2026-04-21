export const codeToLanguage = (code) => ({
    en: 'English',
    pt: 'Português',
    zh_TW: 'Chinese (Traditional)',
  }[code])
  
  export const createLanguageLink = (slug, lang) => {
    const rawSlug = lang !== 'en' ? slug.replace(`/${lang}`, '') : slug

    return (targetLang) => targetLang === 'en'
      ? rawSlug
      : `/${targetLang}${rawSlug}`
  }
