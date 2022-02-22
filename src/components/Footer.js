import React from 'react'


const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer is-pulled-right">
        <div className='galo-container'>
          <span>
            Todos los derechos reservados por Alina Galo®
          </span>
        <span>
        <a
                className="navbar-item"
                href="https://jungla.cc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                 UX UI by Jungla®
              </a>
        </span>
        </div>
        
       
      </footer>
    )
  }
}

export default Footer
