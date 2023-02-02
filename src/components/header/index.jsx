import { auth } from '../../firebaseconfig'
import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import Logo from '../logo'

import './Header.css'


const Header = ( { headerBtn, setHeaderBtn } ) => {
  const navigate = useNavigate()

  useEffect(() => {
    const logToken = window.sessionStorage.getItem('isLoged')
    if (logToken === 'y') {
      setHeaderBtn({ isLogIn: true, btnName: 'Log-out' })
    }
  }, [])

  const signOutHandler = () => {
    signOut(auth)
      .then(()=> {
        window.sessionStorage.setItem('isLoged', 'n')
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const logedInHandler = () => {
    navigate('/')
  }

  const logChecker = () => {
    const logToken = window.sessionStorage.getItem('isLoged')
    if (logToken === 'y') {
      setHeaderBtn({ isLogIn: false, btnName: 'Log-in' })
      signOutHandler()
    } else if (!logToken === 'n' && !headerBtn.isLogIn) {
      logedInHandler()
    }
  }

  return (
    <header className={`header-container ${headerBtn.isLogIn && 'header-background'}`}>
      <Logo />
      <button
        className={`h-btn ${headerBtn.isLogIn && 'd-btn link'}`}
        type='button'
        onClick={logChecker}
      >
        {headerBtn.btnName}
      </button>
    </header>
  )
}

export default Header

Header.propTypes = {
  headerBtn:PropTypes.object.isRequired,
  setHeaderBtn:PropTypes.func.isRequired
}
