import { useState } from 'react'
import { validateForgotPassword } from '../utils/validation'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '../services/axios'

export const useForgotPassword = token => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }
  const handleBlur = e => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const validationErrors = validateForgotPassword(formData)
    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name],
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (isLoading) return
    setTouched({
      newPassword: true,
      confirmPassword: true,
    })
    const validationErrors = validateForgotPassword(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsLoading(true)
    try {
      const res = await api.put('/auth/forgot-password', {
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      })
      console.log('password updated', res)
      toast.success('Password Updated Successfully')
      navigate('/login', { replace: true })
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'reset password failed'
      )
    } finally {
      setIsLoading(false)
      setErrors({})
      setTouched({})
      setFormData({
        newPassword: '',
        confirmPassword: '',
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
