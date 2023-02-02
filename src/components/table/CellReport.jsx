import PropTypes from 'prop-types'

const CellReport = ({ element }) => {
  return (
    <tr className='t-row' key={element.id}>
      <td className='t-cell t-cell-down t-cell-right'>{element.email}</td>
      <td className='t-cell t-cell-down t-cell-right'>{element.paid}</td>
      <td className='t-cell t-cell-down t-cell-right'>{element.order}</td>
      <td className='t-cell t-cell-down t-cell-right'>{element.pending}</td>
    </tr>
  )
}

export default CellReport

CellReport.propTypes = {
  element: PropTypes.object.isRequired
}
