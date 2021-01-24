const _ = require('lodash');
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
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
    _.each(defaultLangPosts, (post, index) => {
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
      _.each(otherLangPosts, (post) => createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: { slug: post.node.fields.slug },
      }))
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === `MarkdownRemark` &&
    node.internal.fieldOwners.slug !== 'gatsby-plugin-i18n'
  ) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
