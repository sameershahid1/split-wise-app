import PropTypes from 'prop-types'


const HeaderTag = ({ element, index }) => {

  return (
    <th key={index} className='t-cell t-cell-down t-cell-right'>
      {element}
    </th>
  )
}

export default HeaderTag

HeaderTag.propTypes = {
  element: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}
