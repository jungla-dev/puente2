import React from 'react'
import { Link } from 'gatsby'
import useScrollHandler from '../hooks/useScrollHandler'

import logo from '../img/logo.svg'

const Navbar = ({ isIndex, data }) => {
  const { email, bullet, instagram, behance } = data

  const containerInitialState = {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    flexFlow: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  }

  const logoInitialState = {
    width: '50vw',
  }

  const scrollPosition = useScrollHandler()

  const firstPosition =
    !isIndex || (isIndex && !!scrollPosition)
      ? {
          display: 'flex',
          width: 'auto',
          maxWidth: '1200px',
          margin: 'auto',
          height: '4rem',
          flexFlow: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }
      : containerInitialState

  const tinyLogo = {
    width: '9rem',
    margin: 'auto',
  }

  const logoScroll =
    scrollPosition > 30 || !!scrollPosition
      ? tinyLogo
      : logoInitialState

  const firstPositionLogo = !!isIndex ? logoScroll : tinyLogo

  const iconMargin =
    !!isIndex && scrollPosition > 30 && scrollPosition < 100
      ? {
          margin: '0 0',
        }
      : scrollPosition > 100 || !isIndex
      ? {
          margin: '0 0',
          width: '9rem',
        }
      : { margin: '0 0', justifyContent: 'center' }

  const descriptionTransition =
    !isIndex || (!!scrollPosition && scrollPosition > 50 && isIndex)
      ? { display: 'flex', opacity: '1' }
      : { display: 'none', opacity: '0' }

  const hideDescription = !!isIndex
    ? !scrollPosition && !(scrollPosition > 30)
    : false

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="index-page-wrap ">
        <div className="galo-container" style={{ display: 'flex' }}>
          <div
            style={{
              ...firstPosition,
              transition: 'opacity 1.5s ease-out',
            }}
            className="icon-logo"
          >
            <Link to="/" style={{ ...iconMargin }}>
              <img
                src={logo}
                alt="Atelier"
                style={{
                  ...firstPositionLogo,
                  transition: 'all 0.3s ease-out',
                }}
              />
            </Link>
          </div>
          {!hideDescription && (
            <div
              className="navigation-links"
              style={descriptionTransition}
            >
              <span className="description">{bullet || ''}</span>
              <div className="galo-media-links">
                <span className="email">
                  <a
                    href={`mailto:${email || 'hola@ateliergalo.com'}`}
                  >
                    {email || ''}
                  </a>
                </span>

                <span className="circle white">
                  <a href={behance || ''}>BH</a>{' '}
                </span>
                <span className="circle black">
                  <a href={instagram || ''}>IG</a>{' '}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
