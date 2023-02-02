import { useNavigate } from 'react-router-dom'

import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate()
  const goingFromNotFoundToLoginOrDashBoard = () => {
    const isLoged = window.sessionStorage.getItem('isLoged')
    if (isLoged === 'y') {
      navigate('/dash-board/all-expense')
    } else {
      navigate('/')
    }
  }

  return (
    <div className='nf-not-found-container'>
      <h1 className='nf-error'>404</h1>
      <h3 className='nf-message'>Oops!This Page Could Not Be Found</h3>
      <p className='nf-text'>
        sorry but the page you are looking for does not exist, have been removed name changed or
        temporarily unavailable.
      </p>
      <button onClick={goingFromNotFoundToLoginOrDashBoard} className='l-btn nf-btn'>
        go to homepage
      </button>
    </div>
  )
}

export default NotFound
