import { useState } from 'react'
import { validateResetPassword } from '../utils/validation'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '../services/axios'

export const useResetPassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }
  const handleBlur = e => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const validationErrors = validateResetPassword(formData)
    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name],
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (isLoading) return
    setTouched({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true,
    })
    const validationErrors = validateResetPassword(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsLoading(true)
    try {
      await api.put('/auth/reset-password', formData)
      toast.success('Password Updated Successfully')
      localStorage.removeItem('token')
      navigate('/login')
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Reset password failed'
      )
    } finally {
      setIsLoading(false)
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setErrors({})
      setTouched({})
    }
  }

  return {
    formData,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
