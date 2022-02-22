import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { site, sitePage, contact} = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        contact: markdownRemark(
          frontmatter: { templateKey: { eq: "contact-page" } }
        ) {
          frontmatter {
            email
            bullet
            instagram
            behance
          }
        }
        sitePage {
          path
        }
      }
    `
  )
  return {
    contact: contact.frontmatter,
    ...site.siteMetadata,
    ...sitePage
  }
}

export default useSiteMetadata
