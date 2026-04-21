import { codeToLanguage, createLanguageLink } from "../i18n"

describe("codeToLanguage", () => {
  it("maps 'en' to English", () => {
    expect(codeToLanguage("en")).toBe("English")
  })

  it("maps 'pt' to Português", () => {
    expect(codeToLanguage("pt")).toBe("Português")
  })

  it("maps 'zh_TW' to Chinese (Traditional)", () => {
    expect(codeToLanguage("zh_TW")).toBe("Chinese (Traditional)")
  })

  it("returns undefined for unknown codes", () => {
    expect(codeToLanguage("fr")).toBeUndefined()
  })
})

describe("createLanguageLink", () => {
  describe("from an English post", () => {
    const slug = "/2019/end-to-end-test-automation/"
    const languageLink = createLanguageLink(slug, "en")

    it("links to the Portuguese translation", () => {
      expect(languageLink("pt")).toBe("/pt/2019/end-to-end-test-automation/")
    })

    it("links back to itself in English", () => {
      expect(languageLink("en")).toBe("/2019/end-to-end-test-automation/")
    })
  })

  describe("from a Portuguese post", () => {
    const slug = "/pt/2019/end-to-end-test-automation/"
    const languageLink = createLanguageLink(slug, "pt")

    it("links to the English original", () => {
      expect(languageLink("en")).toBe("/2019/end-to-end-test-automation/")
    })

    it("links back to itself in Portuguese", () => {
      expect(languageLink("pt")).toBe("/pt/2019/end-to-end-test-automation/")
    })
  })
})
