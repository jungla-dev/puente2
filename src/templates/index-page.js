import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout';
import FeatureGrid from '../components/Features';
import useScrollHandler from '../hooks/useScrollHandler';


export const IndexPageTemplate = ({props}) => {
  const PostContent = HTMLContent || Content


  const scrollPosition = useScrollHandler();
  const changeMargin =
  scrollPosition > 20 || !!scrollPosition
    ? ''
    : 'changeMargin';

  const { description } = props?.pageInfo?.frontmatter || {};
  const projects = props?.projects?.nodes?.map( p => {
    return {
      image: p.frontmatter.hero,
      title: p.frontmatter.title,
      slug: p.fields.slug
    }
  });


  return (
    <div className={`index-page-wrap ${changeMargin} `}>
      <div className='galo-container'>
      <section className='index-page-description'>
        <PostContent content={description} />
       
      </section>
      <section className="index-page-projects">
        <FeatureGrid gridItems={projects} style={
       {width: '100vw',
        maxWidth: '1200px',}
    } />
      </section>
      </div>
      
    </div>
  );
};

const IndexPage = ({ data }) => {
  return (
    <Layout isIndex >
      <IndexPageTemplate props={data} />
    </Layout>
  );
};

IndexPage.propTypes = {
  pageInfo: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
  projects: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    pageInfo: markdownRemark(
      frontmatter: { templateKey: { eq: "index-page" } }
    ) {
      frontmatter {
        title
        description
      }
    }

    projects: 
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(blog)/" } }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            hero {
              childImageSharp {
                fluid(cropFocus: CENTER, maxHeight: 180, maxWidth: 280, quality: 100) {
                  base64 
                  aspectRatio 
                  src 
                  srcSet 
                  sizes 
                }
              }
            }
            title
          }
        }
      }
  }
`;
