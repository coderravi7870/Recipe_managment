import React from 'react'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import {LoginPage,SignUpPage,HomePage} from "./Route/Route"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignUpPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App