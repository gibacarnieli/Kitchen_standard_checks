import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import logoIcon from '../images/logo-png.png'


// Bootstrap components
import Modal from 'react-bootstrap/Modal'

// Helpers
import { activeUser, removeToken } from '../utilities/helpers/common'

export default function Nav() {

  const navigate = useNavigate()

// ! State
  const [show, setShow] = useState(false)

  function handleLogOut(){
    // Remove token from storage
    removeToken()
    // Navigate to the log in page
    navigate('/')
  }

  return (
    <>
      <header className='navbar'>
      <Link to="/"><img className='logo-icon' src={logoIcon} alt="kitchen standard checks" /></Link>
        <button className='nav-toggle' onClick={() => setShow(true)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <nav onClick={() => setShow(false)} className='link-container'>
            <Link to="/">Home</Link>
            { activeUser() ?
              <>                
                <Link to="/">Profile</Link>
                <span className='logout' onClick={handleLogOut}>Log out</span>
              </>
              :
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            }
          </nav>
        </Modal.Header>
      </Modal>
    </>
  )

}

