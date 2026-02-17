import React from 'react'
import '../styles/button.css'
function Button({ children, type = 'submit', disabled, isLoading, ...props }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`custom-button ${isLoading ? 'loading' : ''} `}
      {...props}
    >
      {isLoading ? 'Submitting' : children}
    </button>
  )
}

export default Button
