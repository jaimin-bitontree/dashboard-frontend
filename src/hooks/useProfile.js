import { useEffect, useState } from 'react'
import api from '../services/axios'
import { toast } from 'react-toastify'
import { validateProfileUpdate } from '../utils/validation'
import { useProfileContext } from '../context/ProfileContext'

export const useProfile = () => {
  const { profile, setProfile, loading } = useProfileContext()
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        age: profile.age || '',
        gender: profile.gender || '',
      })
    }
  }, [profile])
  const isChanged =
    formData.name !== profile?.name ||
    formData.age !== profile?.age ||
    formData.gender !== profile?.gender
  const startEdit = () => {
    setIsEditing(true)
  }
  const cancelEdit = () => {
    setErrors({})
    if (profile) {
      setFormData({
        name: profile.name || '',
        age: profile.age || '',
        gender: profile.gender || '',
      })
    }
    setIsEditing(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const saveProfile = async () => {
    if (!isChanged) return

    const validationError = validateProfileUpdate(formData)
    if (Object.keys(validationError).length > 0) {
      setErrors(validationError)
      return
    }
    setErrors({})
    try {
      setSaving(true)
      await api.put('/auth/profile', formData)
      toast.success('Profile Updated Successfully')
      setProfile(prev => ({ ...prev, ...formData }))
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
      setSaving(false)
    }
  }
  return {
    profile,
    saving,
    loading,
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
