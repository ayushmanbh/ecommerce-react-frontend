import React, { useEffect } from 'react'
import products from '../../fake-products'
import { useUserContext } from '../../contexts/userContext'
import ErrorNotice from '../misc/ErrorNotice'

const Home = () => {
  const { userData, error, showError, addItem } = useUserContext()

  useEffect(() => {
    showError()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='page'>
      {
        error.status && <ErrorNotice message={error.msg} clearError={() => showError()} />
      }
      <div className="heading">
        <h1>Welcome <span>{userData.user ? `${userData.user.displayName}, we're glad to see you!` : 'to your one stop shop.'}</span></h1>
        <p>{userData.user ? "We've added more products since your last visit :)" : "Just login and start adding things to your bag or if you're new here go and register with us. It's free!"}</p>
      </div>
      <div className="grid">
        {
          products.map(product => {
            return (
              <article key={product.id}>
                <img src={product.image} alt={product.title} />
                <div className="text">
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                  <button className='btn' onClick={() => addItem(product)}>Add to cart</button>
                </div>
              </article>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
