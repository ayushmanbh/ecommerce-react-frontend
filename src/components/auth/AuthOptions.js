import React from 'react'
import { useHistory } from 'react-router-dom'
import { useUserContext } from '../../contexts/userContext'
import CartIcon from '../misc/CartIcon'

const AuthOptions = () => {
  const { userData, setUserData } = useUserContext()

  const history = useHistory()
  const register = () => history.push('/register')
  const login = () => history.push('/login')
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    })
    localStorage.setItem('auth-token', '')
    login()
  }

  return (
    <nav className='auth-options'>
      <CartIcon />
      {
        userData.user ? (
          <>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
            <>
              <button onClick={register}>Register</button>
              <button onClick={login}>Login</button>
            </>
          )
      }
    </nav>
  )
}

export default AuthOptions
