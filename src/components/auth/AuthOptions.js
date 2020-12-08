import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useUserContext } from '../../contexts/userContext'

const AuthOptions = () => {
  const { userData, setUserData, totals } = useUserContext()

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
      {
        userData.user ? (
          <>
            <Link className='cart-icon' to='/cart'>
              <div className='nav-container'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                  <path d='M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z' />
                </svg>
                <div className='amount-container'>
                  <p className='total-amount'>{totals && totals.totalQuantity}</p>
                </div>
              </div>
            </Link>
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
