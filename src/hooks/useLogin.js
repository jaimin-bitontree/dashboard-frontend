import { useState } from 'react'
import { validateLogin } from '../utils/validation'
import api from '../services/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'email' ? value.toLowerCase() : value,
    }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }
  const handleBlur = e => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const validationErrors = validateLogin(formData)
    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name],
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (isLoading) return
    setTouched({
      email: true,
      password: true,
    })
    const validationErrors = validateLogin(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsLoading(true)
    try {
      const res = await api.post('/auth/login', formData)
      localStorage.setItem('token', res.data.token)
      console.log('login success:', res)
      toast.success('Login Successfully')
      navigate('/dashboard')
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Login failed'
      )
    } finally {
      setIsLoading(false)
      setErrors({})
      setTouched({})
      setFormData({
        email: '',
        password: '',
      })
    }
  }
  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
  }
}
