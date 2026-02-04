import React from 'react'
import { useProfile } from '../hooks/useProfile'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { CiEdit } from 'react-icons/ci'
import '../styles/profile.css'
import { FaSave } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'
function Profile() {
  const navigate = useNavigate()

  const {
    errors,
    details,
    formData,
    loading,
    error,
    isEditing,
    startEdit,
    cancelEdit,
    handleChange,
    saveProfile,
    isChanged,
  } = useProfile()
  if (loading && !isEditing) {
    return (
      <div className="profile-loading">
        <ClipLoader size={40} color="#4f46e5"></ClipLoader>
        Loading Profile...
      </div>
    )
  }
  if (error) {
    return <div className="profile-error">{error}</div>
  }
  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        <Input
          err={errors.name}
          label="Full Name"
          name="name"
          value={isEditing ? formData.name : details.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Input label="Email" name="email" value={details.email} disabled />
        <Input
          label="Age"
          type="number"
          name="age"
          value={isEditing ? formData.age : details.age || ''}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <div className="input-group">
          <label>Gender</label>
          <select
            name="gender"
            value={isEditing ? formData.gender : details.gender || ''}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <small className="error">{'\u00A0'}</small>
        </div>
        <div className="profile-action">
          {isEditing ? (
            <>
              <Button
                type="button"
                disabled={!isChanged}
                onClick={saveProfile}
                isLoading={loading}
              >
                <FaSave />
                Save
              </Button>
              <Button type="button" onClick={cancelEdit} disabled={loading}>
                <MdOutlineCancel />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button type="button" onClick={startEdit}>
                <CiEdit size={20} />
                Edit Profile
              </Button>
              <Button type="button" onClick={() => navigate('/reset-password')}>
                Reset Password
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
