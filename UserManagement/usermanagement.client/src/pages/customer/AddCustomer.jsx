import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const AddCustomer = ({addCustomer}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  return (
    <div className='col'>
      <form className='row g-3' onSubmit={handleSubmit(addCustomer)}>
        <div className='col-md-6'>
          <label htmlFor='firstName' className='form-label'>
            First Name
          </label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            {...register('firstName', { required: true })}
          />
          {errors.firstName && (
            <span className='small text-danger'>First Name is required.</span>
          )}
        </div>
        <div className='col-md-6'>
          <label htmlFor='lastName' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            {...register('lastName', { required: true })}
          />
          {errors.lastName && (
            <span className='small text-danger'>Last Name is required.</span>
          )}
        </div>
        <div className='col-12'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className='small text-danger'>Email is required.</span>
          )}
        </div>
        <div className='col-6'>
          <label htmlFor='contactNumber' className='form-label'>
            Contact Number
          </label>
          <input
            type='tel'
            className='form-control'
            id='contactNumber'
            {...register('contactNumber', { required: true })}
          />
          {errors.contactNumber && (
            <span className='small text-danger'>
              Contact Number is required.
            </span>
          )}
        </div>
        <div className='col-md-6'>
          <label htmlFor='address' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            id='address'
            {...register('address', { required: true })}
          />
          {errors.address && (
            <span className='small text-danger'>Address is required.</span>
          )}
        </div>
        <div className='col-6'>
          <button type='submit' className='col-12 btn btn-primary'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCustomer
