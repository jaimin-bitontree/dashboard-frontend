const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex =
  /^(?=\S{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/

const validateRequired = (value, message) => {
  if (!value?.trim()) return message
  return null
}

const validateRegex = (value, regex, message) => {
  if (value && !regex.test(value.trim())) return message
  return null
}

const cleanErrors = errors => {
  Object.keys(errors).forEach(key => {
    if (!errors[key]) delete errors[key]
  })
  return errors
}

export const validateSignup = data => {
  const errors = {}
  errors.name =
    validateRequired(data.name, 'full name is required') ||
    validateRegex(data.name, nameRegex, 'Only alphabets are allowed')
  errors.email =
    validateRequired(data.email, 'Email is required') ||
    validateRegex(
      data.email,
      emailRegex,
      'Email format is not correct (ex: abc@gmail.com)'
    )
  errors.password =
    validateRequired(data.password, 'Password is required') ||
    validateRegex(
      data.password,
      passwordRegex,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
    )
  errors.confirm_password =
    validateRequired(data.confirm_password, 'Confirm password is required') ||
    (data.password?.trim() !== data.confirm_password?.trim() &&
      'Passwords do not match')
  return cleanErrors(errors)
}
export const validateLogin = data => {
  const errors = {}
  errors.email =
    validateRequired(data.email, 'Email is required') ||
    validateRegex(
      data.email,
      emailRegex,
      'Email format is not correct (ex:abc@gmail.com)'
    )
  errors.password =
    validateRequired(data.password, 'password is required') ||
    validateRegex(
      data.password,
      passwordRegex,
      'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
    )
  return cleanErrors(errors)
}

export const validateResetPassword = data => {
  const errors = {}
  errors.oldPassword =
    validateRequired(data.oldPassword, 'password is required') ||
    validateRegex(
      data.oldPassword,
      passwordRegex,
      'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
    )
  errors.newPassword =
    validateRequired(data.newPassword, 'password is required') ||
    validateRegex(
      data.newPassword,
      passwordRegex,
      'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
    )
  errors.confirmPassword =
    validateRequired(data.confirmPassword, 'Confirm password is required') ||
    (data.newPassword?.trim() !== data.confirmPassword?.trim() &&
      'Passwords do not match')
  return cleanErrors(errors)
}

export const validateEmail = data => {
  const errors = {}

  errors.email =
    validateRequired(data.email, 'Email is required') ||
    validateRegex(data.email, emailRegex, 'Email format is not correct')

  return cleanErrors(errors)
}

export const validateForgotPassword = data => {
  const errors = {}

  errors.newPassword =
    validateRequired(data.newPassword, 'New password is required') ||
    validateRegex(data.newPassword, passwordRegex, 'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.')

  errors.confirmPassword =
    validateRequired(data.confirmPassword, 'Confirm password is required') ||
    (data.newPassword?.trim() !== data.confirmPassword?.trim() &&
      'Passwords do not match')

  return cleanErrors(errors)
}

export const validateProfileUpdate = data =>{
  const errors={}
  errors.name=validateRequired(data.name,'name is required') || validateRegex(data.name,nameRegex,'Only alphabets are allowed')
  return cleanErrors(errors)
}
