import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AuthRoutes() {
  return (
    <div>
           <Routes>
            <Route index element={<Login/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path='/Register' element={<Register/>} />
        </Routes>

    </div>
  )
}
