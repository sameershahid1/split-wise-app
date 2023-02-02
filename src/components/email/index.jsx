import PropTypes from 'prop-types'


const Email = ({ emailHandler }) => {

  return (
    <div className='ae-email-container flex'>
      <label className='ae-label' htmlFor='email'>With you and: </label>
      <input
        className=' ae-email ae-input'
        placeholder='example@gmail.com'
        name='email'
        type='email'
        id='email'
        onKeyPress={emailHandler}
      />
    </div>
  )
}

export default Email

Email.propTypes = {
  emailHandler: PropTypes.func.isRequired
}
