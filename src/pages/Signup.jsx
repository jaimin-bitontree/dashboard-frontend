import React from 'react'
import Input from '../components/Input'
import '../styles/signup.css'
import Button from '../components/Button'
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom'
import { MdSupervisorAccount } from 'react-icons/md'

function Signup() {
  const {
    formData,
    handleBlur,
    errors,
    touched,
    isLoading,
    handleChange,
    handleSubmit,
  } = useSignup()
  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        <h2>
          <MdSupervisorAccount size={35} />
          SignUp{' '}
        </h2>

        <form onSubmit={handleSubmit} action="" className="signup-card">
          <Input
            err={touched.name ? errors.name : ''}
            value={formData.name}
            label="Full Name"
            type="Text"
            placeholder="FullName"
            required
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            err={touched.email ? errors.email : ''}
            value={formData.email}
            label="Email"
            type="email"
            placeholder="Email"
            required
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            err={touched.password ? errors.password : ''}
            value={formData.password}
            label="Password"
            type="password"
            placeholder="Enter a Password"
            required
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            err={touched.confirm_password ? errors.confirm_password : ''}
            value={formData.confirm_password}
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            required
            name="confirm_password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button disabled={isLoading} isLoading={isLoading}>
            Submit
          </Button>
        </form>
        <p>
          Already have an account?{' '}
          <Link className="auth-link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
