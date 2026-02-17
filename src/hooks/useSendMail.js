import { useState } from 'react'
import { validateEmail } from '../utils/validation'
import api from '../services/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const useSendMail = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
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
    const validationErrors = validateEmail(formData)
    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name],
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (isLoading) return
    setTouched({ email: true })
    const validationErrors = validateEmail(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsLoading(true)
    try {
      await api.post('/auth/send-mail', formData)
      toast.success('Email Send Successfully')
      navigate('/login')
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to send reset email'
      )
    } finally {
      setIsLoading(false)
      setErrors({})
      setTouched({})
      setFormData({
        email: '',
      })
    }
  }
  return {
    handleBlur,
    touched,
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  }
}
