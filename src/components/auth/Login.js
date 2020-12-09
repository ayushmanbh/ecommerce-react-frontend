import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useUserContext } from '../../contexts/userContext'
import { useHistory } from 'react-router-dom'
import FormError from '../misc/FormError'

const API_DOMAIN = 'https://ash-ecommerce-api.herokuapp.com'

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { error, showError, setUserData } = useUserContext()
  const history = useHistory()

  useEffect(() => {
    showError()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLoginForm = async (e) => {
    e.preventDefault()
    try {
      const loginUser = { email, password }

      const loginResponse = await Axios.post(API_DOMAIN + '/users/login', loginUser)

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      })

      localStorage.setItem('auth-token', loginResponse.data.token)
      history.push('/')
    } catch (error) {
      error.response.data.message && showError(true, error.response.data.message)
    }
  }
  return (
    <div className='page'>
      <h2>Log in</h2>
      {
        error.status && <FormError message={error.msg} clearError={() => showError()} />
      }
      <form className="form" onSubmit={handleLoginForm}>
        <label htmlFor="login-email">Email: </label>
        <input
          id="login-email"
          type="email"
          placeholder='Enter valid email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password: </label>
        <input
          id="login-password"
          type="password"
          placeholder='Enter password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login
