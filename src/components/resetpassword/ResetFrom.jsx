import { auth } from '../../firebaseconfig'
import closeImg from '../../assets/close.png'
import { sendPasswordResetEmail } from 'firebase/auth'
import PropTypes from 'prop-types'
import { useRef } from 'react'

const ResetFrom = ({ setIsReset, setValid }) => {
  const emailRef = useRef(null)

  const cancelHandler = () => {
    setIsReset(false)
  }

  const resettingPasswordHandler = () => {
    if (emailRef.current.value.trim() !== '') {
      sendPasswordResetEmail(auth, emailRef.current.value)
        .then(() => {
          setValid({
            isValid: false,
            message: 'Email is send to your inbox',
            type: 'Message'
          })
        })
        .catch(error => {
          console.log(error)
          setValid({
            isValid: false,
            message: 'Invalid email',
            type: 'Error'
          })
        })
    } else {
      setValid({
        isValid: false,
        message: 'Please dont enter empty email.',
        type: 'Error'
      })
    }
  }

  return (
    <form className='reset-container login-form flex-column l-form-position'>
      <div className='reset-header m-header flex'>
        <h2 className='l-label'>Password-Reset:</h2>
        <img className='m-close' onClick={cancelHandler} src={closeImg} alt='close-imgae' />
      </div>
      <input type='email' ref={emailRef} className='l-input' placeholder='example@gmail.com' />
      <button className='h-btn' onClick={resettingPasswordHandler} type='button'>
        Send
      </button>
    </form>
  )
}

export default ResetFrom

ResetFrom.propTypes = {
  setIsReset: PropTypes.func.isRequired,
  setValid: PropTypes.func.isRequired
}
