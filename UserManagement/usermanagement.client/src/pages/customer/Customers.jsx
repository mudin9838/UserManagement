import React, { useState, useEffect } from 'react'
import instance from '../../api/axiosconfig'
import { Link } from 'react-router-dom'
import {
  Add,
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined
} from '@mui/icons-material'
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
//import './customer.css'
import DeleteCustomer from './DeleteCustomer'
import { useTheme } from '../../hooks/useTheme'

function Customers () {
  const [customers, setCustomers] = useState([])
  const [editCompleted, setEditCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [success, setSuccess] = useState(false)
  const theme = useTheme()
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true)
      try {
        const response = await instance.get('/api/customer/getall')
        setCustomers(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [success])

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditCompleted(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [editCompleted])

  const toggle = mode => {
    setModal(!modal)
    setMode(mode)
  }

  async function addCustomer (data) {
    try {
      const response = await instance.post('/api/Customer/Create', data)
      const newCustomer = response.data
      setCustomers(prevCustomers => {
        const newCustomers = [newCustomer, ...prevCustomers]
        return newCustomers
      })
      //setCustomers(prevCustomers => [...prevCustomers, newCustomer])
      toggle('')
      setSuccess(true)
    } catch (error) {
      setError(error)
    }
  }

  async function editCustomer (updatedCustomer) {
    try {
      const updated = { ...updatedCustomer }
      const selected = { ...selectedCustomer }

      if (updatedCustomer.id === selectedCustomer.id) {
        delete updated.id
        delete selected.id
        delete selected.createdDate
        delete selected.modifiedDate
      }

      if (JSON.stringify(selected) === JSON.stringify(updated)) {
        toggle('')
        setEditCompleted(true)
        return
      }
      const response = await instance.put(
        `/api/Customer/edit/${updatedCustomer.id}`,
        updatedCustomer
      )
      const updatedCustomerIndex = customers.findIndex(
        customer => customer.id === updatedCustomer.id
      )
      const updatedCustomers = [...customers]
      updatedCustomers[updatedCustomerIndex] = updatedCustomer
      setCustomers(updatedCustomers)
      console.log('OK')
      toggle('')
      setEditCompleted(true)
    } catch (error) {
      setError(error)
      setEditCompleted(false)
      console.log('ERROR:', error)
    }
  }

  async function deleteCustomer (customer) {
    try {
      //const response = await instance.delete('/api/Customer/Delete', customer)
      // const newCustomer = response.data
      console.log('before:', customers.length)
      var cs = customers.filter(c => c !== customer)
      setCustomers(cs)
      console.log('before:', cs.length)
      //setCustomers(prevCustomers => [...prevCustomers, newCustomer])
      toggle('')
      setSuccess(true)
    } catch (error) {
      setError(error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const handleEditClick = customer => {
    setSelectedCustomer(customer)
    setSuccess(false)
    toggle('edit')
    console.log('MODE => ', mode)
  }

  const handleDeleteClick = customerId => {
    setSelectedCustomer(customerId)
    // setSuccess(false)
    toggle('delete')
    console.log('MODE => ', mode)
    console.log('ID => ', customerId)
  }

  console.log('new theme:', theme)
  return (
    <div>
      <div className='d-flex justify-content-between  align-items-baseline'>
        <h5>Customers</h5>
        <Button
          data-bs-theme='dark'
          color='primary'
          size='sm'
          className='pb-2'
          onClick={() => toggle('add')}
        >
          <Add className='primary' />
          {/* New */}
        </Button>
      </div>
      <hr />
      <div className='table-responsive'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>First Name</th>
              <th scope='col'>Last Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Contact</th>
              <th scope='col'>Address</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((c, index) => (
                <tr
                  key={index}
                  className={`${
                    editCompleted &&
                    selectedCustomer &&
                    selectedCustomer.id === c.id
                      ? 'border border-success'
                      : ''
                  }
                     ${success && index === 0 ? 'border border-danger' : ''}`}
                >
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td>{c.email}</td>
                  <td>{c.contactNumber}</td>
                  <td>{c.address}</td>
                  <td>
                    <Link
                      onClick={() => handleEditClick(c)}
                      style={{ marginRight: '6px' }}
                    >
                      <EditOutlined className='text-warning' />
                    </Link>
                    <Link
                      onClick={() => handleDeleteClick(c.id)}
                      style={{ marginRight: '6px' }}
                    >
                      <DeleteOutlined className='text-danger' />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='text-center text-danger'>
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modal}
        toggle={() => toggle(mode)}
        centered={true}
        backdrop={false}
      >
        <ModalHeader toggle={() => toggle(mode)}>
          {mode === 'add' ? 'New Customer' : 'Edit Customer'}
        </ModalHeader>
        <ModalBody>
          {mode === 'add' && <AddCustomer addCustomer={addCustomer} />}
          {mode === 'edit' && (
            <EditCustomer
              selectedCustomer={selectedCustomer}
              editCustomer={editCustomer}
            />
          )}
          {mode === 'delete' && (
            <DeleteCustomer
              selectedCustomer={selectedCustomer}
              deleteCustomer={deleteCustomer}
            />
          )}
        </ModalBody>
        {error && (
          <ModalFooter>
            <span>error</span>
          </ModalFooter>
        )}
      </Modal>
    </div>
  )
}

export default Customers
