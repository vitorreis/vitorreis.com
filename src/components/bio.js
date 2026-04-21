import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { rhythm } from "../utils/typography"

function Bio() {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          gatsbyImageData(width: 50, height: 50, layout: FIXED)
        }
      }
      site {
        siteMetadata {
          author
          description
          social {
            twitter
            linkedIn
          }
        }
      }
    }
  `)

  const { author, social, description } = data.site.siteMetadata
  const avatar = getImage(data.avatar)

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <GatsbyImage
        image={avatar}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        {description}
        {` `}
        <a href={`https://linkedin.com/${social.linkedIn}`}>
          Follow me on LinkedIn
        </a>
      </p>
    </div>
  )
}

export default Bio
