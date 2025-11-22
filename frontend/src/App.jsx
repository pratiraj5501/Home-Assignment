import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import {Routes,createBrowserRouter,Route,BrowserRouter} from "react-router-dom"
import Home from './pages/Home'
import Stat from './pages/Stat'

function App() {

  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/code/:code' element={<Stat/>} />
    </Routes>
    
    
       
    </BrowserRouter>
  )
}

export default App
