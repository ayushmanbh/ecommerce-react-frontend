import React, { createContext, useState, useContext, useEffect } from "react"
import Axios from 'axios'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ status: false, msg: '' })
  const [cart, setCart] = useState([])
  const [totals, setTotals] = useState({ totalPrice: 0, totalQuantity: 0 })

  let localCart = localStorage.getItem("cart")

  useEffect(() => {
    getTotals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  useEffect(() => {
    //turn it into js
    // eslint-disable-next-line react-hooks/exhaustive-deps
    localCart = JSON.parse(localCart);
    //load persisted cart into state if it exists
    if (localCart) setCart(localCart)
  }, [])

  const getTotals = () => {
    let { totalPrice, totalQuantity } = cart.reduce(
      (cartTotal, cartItem) => {
        const { price, quantity } = cartItem
        const itemTotal = price * quantity

        cartTotal.totalPrice += itemTotal
        cartTotal.totalQuantity += quantity
        return cartTotal
      },
      {
        totalPrice: 0,
        totalQuantity: 0,
      }
    )
    totalPrice = parseFloat(totalPrice.toFixed(2))

    setTotals({ totalPrice, totalQuantity })
  }

  const addItem = (item) => {

    //create a copy of our cart state, avoid overwritting existing state
    let cartCopy = [...cart];

    //assuming we have an ID field in our item
    let { id } = item;

    //look for item in cart array
    let existingItem = cartCopy.find(cartItem => cartItem.id === id);

    //if item already exists
    if (existingItem) {
      existingItem.quantity += 1 //update item
    } else { //if item doesn't exist, simply add it
      cartCopy.push(item)
    }

    //update app state
    setCart(cartCopy)

    //make cart a string and store in local space
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart)

  }

  const editItem = (itemID, amount) => {

    let cartCopy = [...cart]

    //find if item exists, just in case
    let existentItem = cartCopy.find(item => item.id === itemID);

    //if it doesnt exist simply return
    if (!existentItem) return

    //continue and update quantity
    existentItem.quantity += amount;

    //validate result
    if (existentItem.quantity <= 0) {
      //remove item  by filtering it from cart array
      cartCopy = cartCopy.filter(item => item.id !== itemID)
    }

    //again, update state and localState
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  }

  const removeItem = (itemID) => {

    //create cartCopy
    let cartCopy = [...cart]

    cartCopy = cartCopy.filter(item => item.id !== itemID);

    //update state and local
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy)
    localStorage.setItem('cart', cartString)
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const showError = (status = false, msg = '') => {
    setError({ status, msg })
    setTimeout(() => {
      setError({ status: false, msg: '' })
    }, 5000)
  }

  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token')
    if (token === null) {
      localStorage.setItem('auth-token', '')
      token = ''
    }
    try {
      const tokenResponse = await Axios.post('http://localhost:5000/users/tokenIsValid', null, {
        headers: { 'Authorization': token }
      })
      if (tokenResponse.data) {
        const userResponse = await Axios.get('http://localhost:5000/users/', {
          headers: { 'Authorization': 'Bearer ' + token }
        })

        setUserData({
          token,
          user: userResponse.data
        })
      }
    } catch (err) {
      if (err.message === 'Network Error') {
        showError(true, 'Something went wrong. Check your connection.')
      }
      if (err.response) {
        if (err.response.data.error.name === 'TokenExpiredError') {
          setUserData({
            token: undefined,
            user: undefined
          })
          localStorage.setItem('auth-token', '')
          showError(true, 'Please login.')
        } else {
          showError(true, err.response.data.message)
        }
      }
      if (err.request) {
        showError(true, 'Something went wrong. Check your connection or try again.')
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        checkLoggedIn,
        error,
        showError,
        loading,
        setLoading,
        cart,
        addItem,
        editItem,
        removeItem,
        clearCart,
        totals,
        getTotals
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}

export { UserContext, UserProvider }
