import PropTypes from 'prop-types'

import noImageSelected from '../../assets/no-image.png'

const ImageContainer = ({ imgSelected }) => {
  return (
    <div className='ae-img-container flex-column'>
      {imgSelected.isSelected ? (
        <img className='ae-img' src={imgSelected.imgData} alt='No-File' />
      ) : (
        <img src={noImageSelected} alt='No-image' />
      )}
    </div>
  )
}
export default ImageContainer

ImageContainer.propTypes = {
  imgSelected: PropTypes.any.isRequired
}
