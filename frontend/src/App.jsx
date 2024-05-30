import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Importing Pages
import HomePage from './pages/HomePage.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import ErrorHandler from './pages/ErrorHandler.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderPage from './pages/Orders.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<OrderPage />} />
        <Route path='*' element={<ErrorHandler />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App