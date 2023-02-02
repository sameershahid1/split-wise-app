import { dataBase } from '../../firebaseconfig'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import { ref, onValue } from 'firebase/database'


import Message from '../message/Message'
import SelectedEmail from './SelectedEmail'
import Table from '../table/Table'
import ImageContainer from './ImageContainer'
import Email from './Email'

import './Addexpense.css'

const findingEmailHandler = (element, email) => {
  if (element === email) {
    return email
  }
}

const AddExpenses = ({ setHeaderBtn }) => {
  const [imgSelected, setImgSelected] = useState({
    imgData: {},
    isSelected: false
  })

  const maxLength=25
  const [allEmail, setAllEmail] = useState([])
  const [dataSets, setDataSets] = useState([])
  const navigate = useNavigate()
  const [valid, setValid] = useState({
    isValid: true,
    message: '',
    type: ''
  })
  const [isTable, setIsTable] = useState(false)

  const descriptionRef = useRef(null)
  const priceRef = useRef(null)
  const dateRef = useRef(null)

  const imageHandler = e => {
    const imgFile = e.target.files[0]
    setImgSelected({ imgData: URL.createObjectURL(imgFile), isSelected: true })
  }

  useEffect(() => {
    const isLoged = window.sessionStorage.getItem('isLoged')
    if (isLoged === 'y') {
      setHeaderBtn({ isLogIn: true, btnName: 'Log-out' })
      navigate('/dash-board/add-expense')
    } else {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const emailFethcer = () => {
      const work = ref(dataBase, '/')
      onValue(work, snap => {
        setAllEmail([...snap.val().email])
      })
    }
    emailFethcer()
  }, [])

  const addExpenseHandler = () => {
    const description = descriptionRef.current.value
    const price = priceRef.current.value
    const date = dateRef.current.value

    if (dataSets.length === 0) {
      setValid({
        isValid: false,
        message: 'Please dont left email empty, and enter friends email not your own.',
        type: 'Error'
      })
    } else if (description.trim().length < maxLength || description.trim() === '') {
      setValid({
        isValid: false,
        message:
          'The description must contain 25 or more letters and dont left description emplty.',
        type: 'Error'
      })
    } else if (price <= 0) {
      setValid({
        isValid: false,
        message: 'The total price must be positive number and not be zero',
        type: 'Error'
      })
    } else if (date === '') {
      setValid({
        isValid: false,
        message: 'The date is not entered',
        type: 'Error'
      })
    } else if (imgSelected.isSelected === false) {
      setValid({
        isValid: false,
        message: 'The recite image is not selected.',
        type: 'Error'
      })
    } else {
      setIsTable(true)
    }
  }

  const emailHandler = e => {
    if (e.key === 'Enter') {
      const emailRegex = /[\w]*@[a-z]*[.]com/g
      const emailString = e.target.value
      let checker = true
      if (emailRegex.test(emailString)) {
        const findedEmail = allEmail.find(element => findingEmailHandler(element, emailString))

        const repeatedElement = dataSets.find(element => {
          if (element.email === emailString) {
            return element
          }
        })

        if (findedEmail && !repeatedElement) {
          checker = false
          setDataSets(prev => [
            ...prev,
            {
              id: dataSets.length + 1,
              email: emailString,
              paid: 0,
              order: 0,
              pending: 0
            }
          ])

          setValid({
            isValid: false,
            message: `Successfully added ${findedEmail}`,
            type: 'Message'
          })
          e.target.value = ''
        }
      }

      if (checker) {
        setValid({
          isValid: false,
          message: 'This email does not exist, please enter correct email.',
          type: 'Error'
        })
      }
    }
  }

  return (
    <>
      {(!valid.isValid || isTable) && <div className='background'></div>}
      {isTable && (
        <Table
          dataSets={dataSets}
          setDataSets={setDataSets}
          setIsTable={setIsTable}
          totalPrice={priceRef.current.value}
          setValid={setValid}
          descriptiveInfo={{
            description: descriptionRef.current.value,
            totalPrice: priceRef.current.value,
            date: dateRef.current.value
          }}
        />
      )}
      {!valid.isValid ? <Message valid={valid} setValid={setValid} /> : null}
      <div className='flex-column'>
        <div className='add-expense-container flex'>
          <form className='ae-form flex-column'>
            <Email emailHandler={emailHandler}/>
            <SelectedEmail dataSets={dataSets} />
            <input
              className='l-input ae-input'
              placeholder='Descriptioin'
              type='text'
              name='description'
              id='description'
              ref={descriptionRef}
            />
            <input
              className='l-input ae-input'
              type='number'
              placeholder='$0.00'
              name='price'
              id='price'
              ref={priceRef}
            />
            <input className='l-input ae-input' ref={dateRef} type='date' name='date' />
            <input
              className='l-input ae-input'
              type='file'
              accept='.jpg,.jpeg,.peg'
              onChange={imageHandler}
            />
          </form>
          <ImageContainer imgSelected={imgSelected}/>
        </div>
        <div className='ae-btn-container'>
          <button className='ae-btn l-btn h-btn' onClick={addExpenseHandler}>
            Add
          </button>
        </div>
      </div>
    </>
  )
}

export default AddExpenses

AddExpenses.propTypes = {
  setHeaderBtn: PropTypes.func.isRequired,
};
