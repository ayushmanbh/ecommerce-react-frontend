import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='page'>
      <h2>404 not found</h2>
      <Link className='btn' to='/'>Back to home</Link>
    </div>
  )
}

export default Error
