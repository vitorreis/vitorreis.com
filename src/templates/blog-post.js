import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { codeToLanguage, createLanguageLink } from '../utils/i18n'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next, slug } = this.props.pageContext
    const lang = post.fields.langKey
    const translations = (post.frontmatter.langs || [])
      .filter(l => l !== 'en')

    const languageLink = createLanguageLink(slug, lang)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        {translations.length > 0 &&
          <>
            {(translations.length > 1 || lang === 'en') &&
              <p><i>This article is also available into {translations
                .map((l, i) => (
                  <React.Fragment key={l}>
                    {l === lang ?
                      <b>{codeToLanguage(l)}</b> :
                      <Link to={languageLink(l)}>{codeToLanguage(l)}</Link>
                    }
                    {i === translations.length - 1 ? '' : (i === translations.length - 2 ? (i === 0 ? ' and ' : ', and ') : ', ')}
                  </React.Fragment>
                ))
              }.
              </i></p>
            }
            {lang !== 'en' &&
              <p><i>
                You can also <Link to={languageLink('en')}>read the original in English</Link>
              </i></p>
            }
          </>
        }
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        langs
      }
      fields {
        slug
        langKey
      }
    }
  }
`
