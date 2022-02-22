import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo }) => {
  const imageStyle = { borderRadius: '0' }
  const { title , childImageSharp, image } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={title} />
    )
  }

  if (!!childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={title} />
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={title} />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.oneOfType([ 
          PropTypes.shape({}),
          PropTypes.arrayOf(PropTypes.shape({})),          
         ]),
       }),
    }),
    style: PropTypes.object,
  }).isRequired,
}

export default PreviewCompatibleImage
