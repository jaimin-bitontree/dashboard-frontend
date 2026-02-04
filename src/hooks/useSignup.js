import { useState } from 'react'
import { validateSignup } from '../utils/validation'
import api from '../services/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [touched, setTouched] = useState({})

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

    const validationErrors = validateSignup(formData)

    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name],
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isLoading) return
    setTouched({
      name: true,
      email: true,
      password: true,
      confirm_password: true,
    })
    const validationErrors = validateSignup(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsLoading(true)
    try {
      const res = await api.post('/auth/signup', formData)
      console.log('Signup success:', res)
      toast.success('Sign Up Successfully')
      navigate('/login')
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'signup failed'
      )
      setIsLoading(true)
    } finally {
      setIsLoading(false)
      setErrors({})
      setTouched({})
      setFormData({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      })
    }
  }
  return {
    touched,
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleBlur,
  }
}
