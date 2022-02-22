import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'



export const ContactPageTemplate = ({
 
  helmet,
  
}) => {
 

  return (
    <>
      <section className="index-page-wrap">
        {helmet || ''}
        <div>Holi</div>
      </section>
      
    </>
  )
}

ContactPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const ContactContent = ({ data }) => {
  
  return (
    <Layout >
      <ContactPageTemplate
        
        helmet={
          <Helmet titleTemplate="%s | Blog">
           
            
          </Helmet>
        }
        
      />
    </Layout>
  )
}

ContactContent.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ContactContent

export const pageQuery = graphql`
  query ContactContent {
    pageInfo: markdownRemark(
      frontmatter: { templateKey: { eq: "contact-page" } }
    ) {
      frontmatter {
        title
        description
      }
    }
    
  }
`

// TODO: add tags al formatter
