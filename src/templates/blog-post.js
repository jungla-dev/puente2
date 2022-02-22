import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import FeatureGrid from '../components/Features'

export const BlogPostTemplate = ({
  contentComponent,
  tags,
  title,
  helmet,
  hero,
  location,
  content,
  gallery,
  credits,
  next,
  prev,
}) => {
  const PostContent = contentComponent || Content
 
  return (
    <>
      <section className="index-page-wrap">
        {helmet || ''}
        <>
          <div
            className="galo-container"
            style={{ marginTop: 'calc(var(--header-size) + 2rem)' }}
          >
            <PreviewCompatibleImage imageInfo={hero} />

            <div className="ag-project-info">
              <h1 className="ag-project-title">{title || ''}</h1>
              {location ? (
                <p className="ag-project-location">{location}</p>
              ) : null}
              {tags && tags.length ? (
                <div className="ag-tags">
                  {tags.map((tag, key) => {
                    return `${tag}${
                      tags.length &&
                      key >= 0 &&
                      tags.length - 1 !== key
                        ? ' + '
                        : ''
                    }`
                  })}
                </div>
              ) : null}
            </div>

            <PostContent
              content={content}
              className="ag-postContent"
            />
          </div>
        </>
      </section>
      <div className="index-page-wrap">
        <div className="galo-container">
          {gallery && gallery.length ? (
            <div className="ag-images">
              <FeatureGrid gridItems={gallery} title={title} />
            </div>
          ) : null}

          {credits ? (
            <p className="galo-project-credits">
              Credits — {credits}
            </p>
          ) : null}

          <div className="galo-post-navigation">
           { prev && <a
              className="galo-post-navigation-link"
              href={prev.fields.slug}
            >
              {prev.frontmatter.title}
            </a>}
            <a className="galo-post-navigation-link" href="/">
              Back to projects
            </a>
            {next && <a
              className="galo-post-navigation-link"
              href={next.fields.slug}
            >
              {next.frontmatter.title}
            </a>}
          </div>
        </div>
      </div>
    </>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post, previous, next } = data

  const gridColumnsTemplate = {
    1: [1],
    2: [1, 1],
    3: [1, 2, 2],
    4: [1, 2, 2, 1],
    5: [1, 2, 2, 1, 1],
    6: [1, 2, 2, 1, 2, 2],
  }
  const fullImages = post.frontmatter.galleryImages.map((data) => ({
    ...data,
    type: 1,
  }))
  const squareImages = post.frontmatter.squareGalleryImages.map(
    (data) => ({ ...data, type: 2 }),
  )

  const gallery = (template, full, square) =>
    template.map((size, index) => {
      if (size === 2) {
        return square.find((item, key) => key === index)
      } else {
        return full.find((item, key) => key === index)
      }
    })

  const finalGridImages = (full, square) => {
    const gridLength = full.length

    if (gridLength <= 6) {
      const template = gridColumnsTemplate[gridLength]
      return gallery(template, full, square)
    } else {
      const chunks = full.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 6)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
      }, [])

      const template = chunks.map(
        (chunk) => gridColumnsTemplate[chunk.length],
      )
      return gallery(template.flat(), full, square)
    }
  }

  const finalList = finalGridImages(fullImages, squareImages)

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        hero={post.frontmatter.hero}
        location={post.frontmatter.location}
        gallery={finalList}
        credits={post.frontmatter.credits}
        prev={previous}
        next={next}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    pageInfo: markdownRemark(
      frontmatter: { templateKey: { eq: "index-page" } }
    ) {
      frontmatter {
        title
        description
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        hero {
          childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        title
        description
        location
        tags
        credits
        galleryImages {
          childImageSharp {
            fluid(
              cropFocus: CENTER
              maxHeight: 280
              maxWidth: 380
              quality: 100
            ) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
        squareGalleryImages: galleryImages {
          childImageSharp {
            fluid(
              cropFocus: CENTER
              maxHeight: 200
              maxWidth: 200
              quality: 100
            ) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
    previous: markdownRemark(
      id: { eq: $previousPostId }
      fileAbsolutePath: { regex: "/(blog)/" }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(
      id: { eq: $nextPostId }
      fileAbsolutePath: { regex: "/(blog)/" }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
