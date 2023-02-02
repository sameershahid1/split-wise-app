import { dataBase } from '../../firebaseconfig'
import PropTypes from 'prop-types'
import { ref, set, onValue } from 'firebase/database'
import { useState, useEffect } from 'react'

import ExportToExcel from '../../helpingfiles/excel.js'
import TableRow from './TableRow'
import CellReport from './CellReport'
import HeaderTag from './HeaderTag'

import './Table.css'

const headerTagOrder = [
  { id: 1, email: 'Email' },
  { id: 2, email: 'Paid' },
  { id: 3, email: 'Order' }
]
const headerTagReport = [...headerTagOrder, { id: 4, email: 'Pending' }]

const Table = ({ setIsTable, dataSets, setDataSets, totalPrice, setValid, descriptiveInfo }) => {
  const [isReport, setIsReport] = useState(false)
  const [allReports, setAllReports] = useState([])
  useEffect(() => {
    const starCountRef = ref(dataBase, '/all-reports')
    onValue(starCountRef, snapShot => {
      const data = snapShot.val()
      setAllReports(data)
    })
  }, [])

  const cancelHandler = () => {
    setIsTable(prev => !prev)
  }

  const savingTheExpense = async data => {
    try {
      const refsData = ref(dataBase, '/all-reports')
      if (allReports == null) {
        set(refsData, [data])
      } else {
        set(refsData, [data, ...allReports])
      }

      setValid({
        isValid: false,
        message: 'The Expense is created Successfully',
        type: 'Message'
      })
      setIsReport(true)
    } catch (error) {
      setValid({
        isValid: false,
        message: 'Due to some network issue, we were not able to create expence',
        type: 'Error'
      })
    }
  }

  const reportHandler = () => {
    let totalOrder = 0
    dataSets.forEach(element => {
      totalOrder += element.order
    })

    totalPrice = parseInt(totalPrice)

    const unvalidatedObject = dataSets.find(element => {
      if (element.paid !== element.order) {
        return element
      }
    })

    if (totalOrder === totalPrice && !unvalidatedObject) {
      savingTheExpense({
        descriptiveInfo: descriptiveInfo,
        recordData: dataSets
      })
    } else if (unvalidatedObject) {
      setValid({
        isValid: false,
        message: `${unvalidatedObject.email} paid should be equal to order and paid needs to be positive.`,
        type: 'Error'
      })
    } else {
      setValid({
        isValid: false,
        message: 'The total order should be equal to total price.',
        type: 'Error'
      })
    }
  }

  return (
    <div className={`table-pay-order-container ${isReport&&'t-report-position'}`}>
      <div className='t-header-container flex-column'>
        <h1 className='t-header'>Table Pay & Order</h1>
        <p className='t-header-price'>Total-Price: {totalPrice}</p>
      </div>

      <div className='container-overflow-scroll'>
        <table className='table-container'>
          <thead>
            <tr className='t-row'>
              {isReport
                ? headerTagReport.map(element => (
                    <HeaderTag key={element.id} element={element.email} index={element.id} />
                  ))
                : headerTagOrder.map(element => (
                    <HeaderTag key={element.id} element={element.email} index={element.id} />
                  ))}
            </tr>
          </thead>
          <tbody>
            {isReport
              ? dataSets.map(element => (
                  <CellReport key={element.id} dataSets={dataSets} element={element} />
                ))
              : dataSets.map(element => (
                  <TableRow
                    key={element.id}
                    dataSets={dataSets}
                    setDataSets={setDataSets}
                    element={element}
                  />
                ))}
          </tbody>
        </table>
      </div>

      <div className='t-btn-container flex'>
        <button className='h-btn t-btn' type='button' onClick={cancelHandler}>
          Cancel
        </button>
        {isReport ? (
          <ExportToExcel className={'h-btn t-btn'} dataSet={dataSets} />
        ) : (
          <button className='h-btn t-btn' onClick={reportHandler} type='button'>
            Report
          </button>
        )}
      </div>
    </div>
  )
}

export default Table

Table.propTypes = {
  setIsTable: PropTypes.func.isRequired,
  dataSets: PropTypes.array.isRequired,
  setDataSets: PropTypes.func.isRequired,
  totalPrice: PropTypes.string.isRequired,
  setValid: PropTypes.func.isRequired,
  descriptiveInfo: PropTypes.object.isRequired
}
