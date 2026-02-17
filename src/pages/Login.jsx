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
      <div className="login-container">
        <div className="login-left">
          <h1>Hello!</h1>
          <h2>
            Have a <br />
            GOOD DAY
          </h2>
        </div>
        <div className="login-right">
          <CiLogin size={32} className="login-icon" />

          <h2>Login</h2>

          <form onSubmit={handleSubmit} className="login-card">
            <Input
              err={touched.email ? errors.email : ''}
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              // required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              err={touched.password ? errors.password : ''}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter a Password"
              // required
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button disabled={isLoading} isLoading={isLoading}>
              Login
            </Button>
          </form>

          <p>
            Don&apos;t have an account?{' '}
            <Link className="auth-link" to="/signup">
              Signup
            </Link>
          </p>

          <Link className="auth-link" to="/forgot-password-request">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
