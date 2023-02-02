import PropTypes from 'prop-types'

const SelectedEmail = ({ dataSets }) => {
  return (
    <div className='selected-container flex'>
      <span>Selected Email: </span>
      <select className='selected ' name='selected' id=''>
        <option value={'emails'}>emails</option>
        {dataSets.length !== 0 &&
          dataSets.map(element => (
            <option value={element} className='ae-enterd-email' key={element.id}>
              {element.email}
            </option>
          ))}
      </select>
    </div>
  )
}

export default SelectedEmail

SelectedEmail.propTypes = {
  dataSets: PropTypes.array.isRequired
}
