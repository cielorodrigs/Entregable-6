import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import ProductId from './pages/ProductId'
import NavBar from './components/NavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'
import SignUp from './store/slices/SignUp'

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <NavBar/>
      {isLoading &&
        <LoadingScreen/>
      }
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <SignUp /> } />
        <Route path='/product/:id' element={ <ProductId /> } />          
        <Route element={<ProtectedRoutes />} >
          <Route path='/purchases' element={ <Purchases />} />
        </Route>
      </Routes>
      <footer>
        <h4 className='footer-text'>Developer</h4>
        <h6 className='footer-text'>Cielo Rodriguez</h6>
        <a className='footer-text' href="https://github.com/CciClo/Entregable-6-E-commercer-React">
          <i  className="bi bi-github"></i>
        </a>
      </footer>
    </HashRouter>
  )
}

export default App