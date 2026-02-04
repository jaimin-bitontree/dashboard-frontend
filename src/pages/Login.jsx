import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import '../styles/login.css'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'
import { CiLogin } from 'react-icons/ci'
function Login() {
  const {
    formData,
    errors,
    handleBlur,
    touched,
    isLoading,
    handleChange,
    handleSubmit,
  } = useLogin()
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <CiLogin size={30} />

        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit} className="login-card">
          <Input
            err={touched.email ? errors.email : ''}
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
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
          <Button disabled={isLoading} isLoading={isLoading}>
            Login
          </Button>
        </form>
        <p>
          Don't have Account?{' '}
          <Link className="auth-link" to="/signup">
            Signup
          </Link>
        </p>
        <p>
          {' '}
          <Link className="auth-link" to="/forgot-password-request">
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
