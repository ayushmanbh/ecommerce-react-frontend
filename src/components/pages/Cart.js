import React, { useEffect } from 'react'
import { useUserContext } from '../../contexts/userContext'
import ErrorNotice from '../misc/ErrorNotice'


const Cart = () => {
  const { userData, cart, error, showError, totals, removeItem, editItem, clearCart } = useUserContext()

  useEffect(() => {
    showError()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='page'>
      {
        error.status && <ErrorNotice message={error.msg} clearError={() => showError()} />
      }
      {
        userData.user ? (
          <section className='cart'>
            <header>
              <h2>your shopping bag</h2>
            </header>
            <div>
              {cart.length === 0 ? <h3 className='cart-empty-text'>It's empty here :(</h3> : cart.map((item) => {
                return (
                  <article key={item.id} className='cart-item'>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <h4>{item.title}</h4>
                      <h4 className='item-price'>${item.price}</h4>
                      {/* remove button */}
                      <button className='remove-btn' onClick={() => removeItem(item.id)}>
                        remove
                      </button>
                    </div>
                    <div>
                      {/* increase amount */}
                      <button className='amount-btn' onClick={() => editItem(item.id, 1)}>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                          <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
                        </svg>
                      </button>
                      {/* amount */}
                      <p className='amount'>{item.quantity}</p>
                      {/* decrease amount */}
                      <button className='amount-btn' onClick={() => editItem(item.id, -1)}>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                        </svg>
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
            <footer>
              <hr />
              <div className='cart-total'>
                <h4>
                  total <span>${totals.totalPrice}</span>
                </h4>
              </div>
              <button className='btn clear-btn' onClick={clearCart}>
                clear cart
        </button>
            </footer>
          </section>
        ) : (
            <div className='cart-login-prompt'>
              <h3>You need to login in order to see your cart.</h3>
            </div>
          )
      }

    </div>
  )
}

export default Cart
