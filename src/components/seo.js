import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, title }) {
  const { site } = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = `${title} | ${site.siteMetadata.title}`

  return (
    <>
      <html lang={lang} />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
}

export default SEO
