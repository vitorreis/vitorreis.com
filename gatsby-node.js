const path = require(`path`)

const CONTENT_DIR = `${__dirname}/content/blog`

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { frontmatter: { date: DESC } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                langKey
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    const defaultLangKey = 'en'

    const defaultLangPosts = posts.filter(
      ({ node }) => node.fields.langKey === defaultLangKey
    )
    defaultLangPosts.forEach((post, index) => {
      const previous = index === defaultLangPosts.length - 1 ? null : defaultLangPosts[index + 1].node;
      const next = index === 0 ? null : defaultLangPosts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })

      const otherLangPosts = posts.filter(
        ({ node }) => node.fields.langKey !== defaultLangKey
      )
      otherLangPosts.forEach((post) => createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: { slug: post.node.fields.slug },
      }))
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type !== `MarkdownRemark`) return

  const relativePath = node.fileAbsolutePath.replace(CONTENT_DIR, '')
  // e.g. /2019/my-post/index.pt.md  or  /2019/my-post/index.md
  const segments = relativePath.split('/')
  const fileName = segments.pop()          // 'index.pt.md' or 'index.md'
  const dirPath = segments.join('/') + '/' // '/2019/my-post/'

  const parts = fileName.split('.')
  // ['index','pt','md'] (translated) or ['index','md'] (default)
  const langKey = parts.length === 3 ? parts[1] : 'en'
  const slug = langKey !== 'en' ? `/${langKey}${dirPath}` : dirPath

  createNodeField({ name: `slug`, node, value: slug })
  createNodeField({ name: `langKey`, node, value: langKey })
}
