import { Link } from 'react-router-dom'

import './SideBar.css'


const SideBar = () => {

  return (
    <ul className='side-bar-container flex-column'>
      <li className='s-list'>
        <Link className='s-link' to={'/dash-board/add-expense'}>
          Add Expence
        </Link>
      </li>
      <li className='s-list'>
        <Link className='s-link' to={'/dash-board/all-expense'}>
          All Expenses
        </Link>
      </li>
    </ul>
  )
}

export default SideBar
