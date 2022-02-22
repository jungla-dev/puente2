import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const FeatureGrid = ({ gridItems, title, style }) => {
  return (
    <div className="columns galo-images-grid" style={style || {}}>
      {gridItems.map((item, key) => {
  
        if (item.slug) {
          return (
            <Link key={key} to={item.slug} className="column is-2">
              <section className="section">
                <div className="has-text-centered ">
                  <div
                  className='img'
                    style={{
                      width: 'calc(100% - 5px)',

                    }}
                  >
                    <PreviewCompatibleImage imageInfo={item} />
                  </div>
                </div>
              </section>
            </Link>
          )
        } else {
          return (
            <div
              className={`column ${
                item.type === 1 ? 'is-1' : 'is-2'
              }`}
            >
              <section className="section">
                <div className="has-text-centered">
                  <div
                    style={{
                      width: 'calc(100% - 6px)',
                      display: 'inline-block',
                      marginBottom: '6px',
                    }}
                  >
                    <PreviewCompatibleImage imageInfo={item} />
                  </div>
                </div>
              </section>
            </div>
          )
        }
      })}
    </div>
  )
}

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
      ]),
      title: PropTypes.string,
    }),
  ),
}

export default FeatureGrid
