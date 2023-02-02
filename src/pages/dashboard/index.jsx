import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import SideBar from '../../components/sidebar'

import './DashBoard.css'


const DaskBoard = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const isLoged = window.sessionStorage.getItem('isLoged')
    if (isLoged === 'y') {
      navigate('/dash-board/add-expense')
    }
  }, [])

  return (
    <div>
      <div className='d-container flex'>
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}

export default DaskBoard
