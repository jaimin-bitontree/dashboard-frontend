import React from 'react'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'
import ProtectedRoute from './routes/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import ForgotPasswordRequest from './pages/ForgotPasswordRequest'
import PublicRoute from './routes/PublicRoute'

function App() {
  return (
    <div>
      <ToastContainer autoClose={2000} position='bottom-right' />
      {/* <Signup /> */}
      {/* <Login/> */}
      <Routes> 
        <Route element={<PublicRoute/>}>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="" element={<Login />}></Route>
        </Route>
        <Route path='/forgot-password/:token' element={<ForgotPassword/>}></Route>
        <Route path='/forgot-password-request' element={<ForgotPasswordRequest/>}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
