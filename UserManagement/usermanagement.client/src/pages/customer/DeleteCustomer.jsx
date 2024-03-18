import React from 'react'

function DeleteCustomer ({ selectedCustomer, deleteCustomer }) {
  return (
    <div>
      {JSON.stringify(selectedCustomer)}
      <br />
      <button onClick={deleteCustomer}>Delete</button>
    </div>
  )
}

export default DeleteCustomer
