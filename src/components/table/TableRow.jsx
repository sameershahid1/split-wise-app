import PropTypes from 'prop-types'

const TableRow = ({ element, dataSets, setDataSets }) => {
  const handelingPaidOrderField = (id, value, type) => {
    const data = dataSets.filter(element => {
      if (element.id !== id) {
        return element
      }
    })

    const valueInt = parseInt(value)
    const temp = {
      id: id,
      email: dataSets[id - 1].email,
      paid: dataSets[id - 1].paid,
      order: dataSets[id - 1].order,
      pending: dataSets[id - 1].pending
    }

    temp[type] = valueInt
    temp.pending = temp.order - temp.paid
    data.push(temp)
    data.sort((a, b) => a.id - b.id)
    setDataSets([...data])
  }

  const orderHanlder = e => {
    handelingPaidOrderField(element.id, e.target.value, 'order')
  }

  const paidHanlder = e => {
    handelingPaidOrderField(element.id, e.target.value, 'paid')
  }

  return (
    <tr className='t-row' key={element.id}>
      <td className='zt-cell t-cell-down t-cell-right'>{element.email}</td>
      <td className='t-cell t-cell-down t-cell-right'>
        <input className='t-input' onChange={paidHanlder} name='paid' type='number' />
      </td>
      <td className='t-cell t-cell-down t-cell-right'>
        <input className='t-input' name='order' onChange={orderHanlder} type='number' />
      </td>
    </tr>
  )
}

export default TableRow

TableRow.propTypes = {
  element: PropTypes.object.isRequired,
  dataSets: PropTypes.array.isRequired,
  setDataSets: PropTypes.func.isRequired
}
