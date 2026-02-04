import { useEffect, useState } from 'react'
import api from '../services/axios'
import { toast } from 'react-toastify'
import { validateProfileUpdate } from '../utils/validation'
export const useProfile = () => {
  const [errors, setErrors] = useState({})

  const [details, setDetails] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
  })
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
  })
  const isChanged =
    formData.name !== details.name ||
    formData.age !== details.age ||
    formData.gender !== details.gender
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetchDetails()
  }, [])
  const fetchDetails = async () => {
    try {
      setLoading(true)
      const result = await api.get('/auth/details')
      const profile = result.data.payload
      // console.log(result.data.payload)
      setDetails(profile)
      setFormData({
        name: profile.name || '',
        age: profile.age || '',
        gender: profile.gender || '',
      })
    } catch (error) {
      console.log('error while fetch the data', error)
      setError('Failed to fetch the details')
    } finally {
      setLoading(false)
    }
  }
  const startEdit = () => {
    setIsEditing(true)
  }
  const cancelEdit = () => {
    setErrors({})
    setFormData({
      name: details.name,
      age: details.age,
      gender: details.gender,
    })
    setIsEditing(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const saveProfile = async () => {
    const validationError = validateProfileUpdate(formData)
    if (Object.keys(validationError).length > 0) {
      setErrors(validationError)
      return
    }
    setErrors({})
    try {
      setLoading(true)
      await api.put('/auth/profile', formData)
      toast.success('Profile Updated Successfully')
      setDetails(prev => ({ ...prev, ...formData }))
      setIsEditing(false)
    } catch (error) {
      console.log('update profile error:', error)
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Profile update fail'
      )
      setIsEditing(false)
    } finally {
      setLoading(false)
    }
  }
  return {
    details,
    loading,
    error,
    formData,
    startEdit,
    cancelEdit,
    handleChange,
    saveProfile,
    isEditing,
    errors,
    isChanged,
  }
}
