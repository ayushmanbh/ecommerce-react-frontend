import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useUserContext } from '../../contexts/userContext'
import { useHistory } from 'react-router-dom'
import FormError from '../misc/FormError'

const API_DOMAIN = 'https://ash-ecommerce-api.herokuapp.com'

const Register = () => {
  const [email, setEmail] = useState()
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  const [passwordCheck, setPasswordCheck] = useState()

  const { error, showError, setUserData } = useUserContext()
  const history = useHistory()

  useEffect(() => {
    showError()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleForm = async (e) => {
    e.preventDefault()

    try {
      const newUser = { username, email, password, passwordCheck }
      await Axios.post(API_DOMAIN + '/users/register', newUser)

      const loginResponse = await Axios.post(API_DOMAIN + '/users/login', {
        email, password
      })

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
      <h2>Register</h2>
      {
        error.status && <FormError message={error.msg} clearError={() => showError()} />
      }
      <form className='form' onSubmit={handleForm}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" placeholder='Enter Username' onChange={e => setUserName(e.target.value)} />

        <label htmlFor="register-email">Email: </label>
        <input type="email" id="register-email" placeholder='Valid email address' onChange={e => setEmail(e.target.value)} />

        <label htmlFor="register-password">Password: </label>
        <input type="password" id="register-password" placeholder='Password atleast 8 characters long' onChange={e => setPassword(e.target.value)} />

        <label htmlFor="verify-password">Confirm Password: </label>
        <input type="password" id="verify-password" placeholder='Type password again' onChange={e => setPasswordCheck(e.target.value)} />

        <input type="submit" value='Register' readOnly />
      </form>
    </div>
  )
}

export default Register
