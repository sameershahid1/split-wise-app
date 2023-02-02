import { dataBase } from '../../firebaseconfig.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ref, set, onValue } from 'firebase/database'

import Message from '../message/Message'

import './Allexpence.css'

const AllExpenses = () => {
  const [allReports, setAllReports] = useState([])
  const navigate = useNavigate()
  const [valid, setValid] = useState({
    isValid: true,
    message: '',
    type: ''
  })
  useEffect(() => {
    const isLoged = window.sessionStorage.getItem('isLoged')
    if (isLoged === 'y') {
      navigate('/dash-board/all-expense')
    } else {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const starCountRef = ref(dataBase, '/all-reports')
    onValue(starCountRef, snapShot => {
      let data = snapShot.val()
      let id = 0
      data.map(element => {
        element.id = id++
        return element
      })
      setAllReports(data)
    })
  }, [])

  const deleteExpenceHandler = id => {
    const filterdExpence = allReports.filter(element => {
      if (element.id !== id) {
        return element
      }
    })

    try {
      const refsData = ref(dataBase, '/all-reports')
      set(refsData, [...filterdExpence])
      setAllReports([...filterdExpence])
      setValid({
        isValid: false,
        message: 'The Expense is successfully Deleted',
        type: 'Message'
      })
    } catch (error) {
      setValid({
        isValid: false,
        message: 'Due to some network issue, we were not able to delete expence',
        type: 'Error'
      })
    }
  }

  return (
    <>
      {!valid.isValid ? <div className='background'></div> : null}
      {!valid.isValid ? <Message valid={valid} setValid={setValid} /> : null}
      <div className='add-expence-container flex-column'>
        <h1 className='adde-title'>All-Expenses:</h1>
        <div className='adde-items-contianer flex-column'>
          {allReports.map((element, i) => (
            <div className='adde-expense-container flex' key={element.id}>
              <div className='adde-sub-container flex'>
                <span className='adde-id'>
                  <strong>Expense#</strong>
                  {i + 1}
                </span>
                <span className='adde-price'>
                  <strong>Totla-Price:</strong> {element.descriptiveInfo.totalPrice}
                </span>
                <span className='adde-descriptive'>
                  <strong>Date:</strong> {element.descriptiveInfo.date}
                </span>
              </div>
              <button
                className='l-btn all-'
                onClick={() => {
                  deleteExpenceHandler(element.id)
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AllExpenses
