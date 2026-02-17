import React from 'react'
import { useParams } from 'react-router-dom'
import { useForgotPassword } from '../hooks/useForgotPassword'
import Input from '../components/Input'
import Button from '../components/Button'
import '../styles/forgotpassword.css'
function ForgotPassword() {
  const { token } = useParams()
  const {
    formData,
    errors,
    handleChange,
    touched,
    handleBlur,
    handleSubmit,
    isLoading,
  } = useForgotPassword(token)
  return (
    <div className="forgotpassword-page">
      <div className="forgotpassword-wrapper">
        <h2>Forgot Password </h2>
        <form onSubmit={handleSubmit} action="" className="forgotpassword-card">
          <Input
            err={touched.newPassword ? errors.newPassword : ''}
            value={formData.newPassword}
            label="New Password"
            type="password"
            placeholder="Enter New Password"
            required
            name="newPassword"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            err={touched.confirmPassword ? errors.confirmPassword : ''}
            value={formData.confirmPassword}
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            required
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button disabled={isLoading} isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
