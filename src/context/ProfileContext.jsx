import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/axios'

const ProfileContext = createContext(null)

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const res = await api.get('/auth/details')
      setProfile(res.data.payload)
      setError(null)
    } catch (err) {
      console.error('Fetch profile error:', err)
      setError('Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  // console.log(profile);
  // console.log("hello");

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        error,
        fetchUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfileContext = () => {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error('useProfileContext must be used inside ProfileProvider')
  }

  return context
}

export default ProfileContext
