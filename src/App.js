import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import AddExpenses from './components/addexpenses'
import AllExpenses from './components/allexpenses'
import DaskBoard from './pages/dashboard'
import Header from './components/header'
import Login from './components/login'
import NotFound from './pages/pagenotfound'

import './app.css'


const App = () => {

  const [headerBtn, setHeaderBtn] = useState({
    isLogIn: false,
    btnName: 'Log-in'
  })
  
  return (
    <div>
      <Header headerBtn={headerBtn} setHeaderBtn={setHeaderBtn} />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/dash-board' element={<DaskBoard />}>
          <Route path='add-expense' element={<AddExpenses setHeaderBtn={setHeaderBtn} />}></Route>
          <Route path='all-expense' element={<AllExpenses />}></Route>
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
