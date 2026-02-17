import React from 'react'
import '../styles/input.css'
function Input({ label, err, ...props }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input {...props} />
      <small className="error">{err || '\u00A0'}</small>
    </div>
  )
}

export default Input
