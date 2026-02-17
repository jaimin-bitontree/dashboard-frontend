import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isTokenExpired } from '../utils/auth'
const ProtectedRoute = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  if (isTokenExpired(token)) {
    localStorage.removeItem('token')
    // toast.error('session expired login again')
    return <Navigate to="/login" replace></Navigate>
  }
  return <Outlet />
}

export default ProtectedRoute
