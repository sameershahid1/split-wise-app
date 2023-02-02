import PropTypes from 'prop-types'

import closeImg from '../../assets/close.png'

import './Message.css'


const Message = ({ valid, setValid }) => {

  const { message, type } = valid

  const closeHandler = () => {
    setValid({ isValid: true, message: '', type: '' })
  }

  return (
    <div className='message-container flex-column'>
      <div className='m-header flex'>
        <h3 className='m-title'>{type}</h3>
        <img className='m-close' src={closeImg} onClick={closeHandler} alt='close' />
      </div>
      <p className='m-text'>{message}</p>
    </div>
  )
}

export default Message

Message.propTypes = {
  valid: PropTypes.object.isRequired,
  setValid: PropTypes.func.isRequired
}
