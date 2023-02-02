import { auth } from '../../firebaseconfig'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

import Message from '../message/Message'
import ResetFrom from '../resetpassword/ResetFrom'

import loadingImg from '../../assets/loading.png'

import './Login.css'

const LoginForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const [load, setLoad] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [valid, setValid] = useState({
    isValid: true,
    message: '',
    type: ''
  })

  useEffect(() => {
    const isLoged = window.sessionStorage.getItem('isLoged')
    if (isLoged === 'y') {
      navigate('/dash-board')
    }
  }, [])

  const submitHandeler = () => {
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then(() => {
        const timing = 2000
        setTimeout(() => {
          window.sessionStorage.setItem('isLoged', 'y')
          setLoad(false)
          navigate('/dash-board')
        }, timing)
      })
      .catch(error => {
        console.log(error)
        setLoad(false)
        setValid({
          isValid: false,
          message: 'Invalid email or password',
          type: 'Error'
        })
      })

    setLoad(true)
  }

  const resetHandler = () => {
    setIsReset(true)
  }

  return (
    <div className='l-background'>
      {!valid.isValid || isReset ? <div className='background'></div> : null}
      {isReset && <ResetFrom setIsReset={setIsReset} setValid={setValid} />}
      {!valid.isValid && <Message valid={valid} setValid={setValid} />}
      <form className='login-form flex-column l-form-position'>
        <h1 className='l-title'>Log in</h1>
        <div className='l-container'>
          <label className='l-label' htmlFor='email'>
            Email address
          </label>
          <input ref={emailRef} className='l-input' type='email' id='email' name='email' />
        </div>
        <div className='l-container'>
          <label className='l-label' htmlFor='password'>
            Password
          </label>
          <input
            className='l-input'
            type='password'
            id='password'
            name='password'
            ref={passwordRef}
          />
        </div>
        <div className='l-btn-container'>
          <button onClick={submitHandeler} className='l-btn' type='button'>
            Log in
          </button>
          <button onClick={resetHandler} className='l-btn l-' type='button'>
            Reset Password
          </button>
        </div>
        {load && <img className='loading' src={loadingImg} alt='Loading' />}
      </form>
    </div>
  )
}

export default LoginForm
