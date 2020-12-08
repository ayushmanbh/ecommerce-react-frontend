import React, { useEffect } from 'react'
import products from '../../fake-products'
import { useUserContext } from '../../contexts/userContext'
import FormError from '../misc/FormError'

const Home = () => {
  const { error, showError, addItem } = useUserContext()

  useEffect(() => {
    showError()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='page'>
      {
        error.status && <FormError message={error.msg} clearError={() => showError()} />
      }
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
