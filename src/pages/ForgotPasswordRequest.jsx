import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import '../styles/forgotpasswordrequest.css'
import { useSendMail } from '../hooks/useSendMail'
function ForgotPasswordRequest() {
  const {
    formData,
    errors,
    touched,
    handleBlur,
    isLoading,
    handleChange,
    handleSubmit,
  } = useSendMail()

  return (
    <div className="mailsend-page">
      <div className="request-wrapper">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link</p>
        <form action="" onSubmit={handleSubmit} className="request-card">
          <Input
            err={touched.email ? errors.email : ''}
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            onBlur={handleBlur}
          />
          <Button disabled={isLoading} isLoading={isLoading}>
            Send Email
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordRequest
