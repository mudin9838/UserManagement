import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Add,
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined
} from '@mui/icons-material'
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useTheme } from '../../hooks/useTheme'
import { deleteData, getData, postData, putDataJson } from '../../services/AccessAPI'
import showToast from '../../components/toastify/Toastify'
import Swal from 'sweetalert2'

const Customers = () => {
   // const navigate = useNavigate();
    const [customers, setCustomers] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [error, setError] = useState(null)
    const [modal, setModal] = useState(false)
    const [mode, setMode] = useState('')
    const theme = useTheme()

    useEffect(() => {
      if (localStorage.getItem("auth") !== null) {
        loadCustomers();
      }
    }, []);

    const loadCustomers = async () => {
      await getData("/api/Customer/GetAll").then((result) => {
        let responseJson = result;
        console.log(result);
        if (responseJson) {
          setCustomers(responseJson);
        }
      });
    };

    const addCustomer = async data => {
      try {
        const response = await postData('/api/Customer/Create', data)
        const newCustomer = response.data
        setCustomers(prevCustomers => {
          const newCustomers = [newCustomer, ...prevCustomers]
          return newCustomers
        })

        toggle('')
       showToast('success','Customer Added Successfully');
     //  navigate("/customers");
      } catch (error) {
        setError(error)
      }
    };
    const deleteCustomer = (e, id) => {
      e.preventDefault();
  
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this customer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteData(`/api/Customer/Delete/${id}`)
            .then((res) => {
              let responseJson = res;
              if (res) {
                console.log(responseJson);
                showToast("success", "User deleted successfully!");
  
                loadUsers(); // Reload the user list after deletion
              } else {
                showToast("error", "Error deleting customer!");
  
              }
            })
            .catch((error) => {
              showToast("error", "Error deleting customer!");
  
            });
        }
      });
    };
    const editCustomer = async updatedCustomer => {
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
          return
        }
        const response = await putDataJson(
          `/api/Customer/edit/${updatedCustomer.id}`,
          updatedCustomer
        )
        const updatedCustomerIndex = customers.findIndex(
          customer => customer.id === updatedCustomer.id
        )
        const updatedCustomers = [...customers]
        updatedCustomers[updatedCustomerIndex] = updatedCustomer
        setCustomers(updatedCustomers)
        showToast('success','Customer updated successfully');
        toggle('')
      } catch (error) {
        showToast('error','Failed updating customer');
      }
    };

    

    const toggle = mode => {
      setModal(!modal)
      setMode(mode)
    }





    const handleEditClick = customer => {
      setSelectedCustomer(customer)
      toggle('edit')
      console.log('MODE => ', mode)
    }

    console.log('new theme:', theme)
    return (
      <div>
        <div className='d-flex justify-content-between  align-items-baseline'>
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
                      selectedCustomer &&
                      selectedCustomer.id === c.id
                        ? 'border border-success'
                        : ''
                    }
                       ${index === 0 ? 'border border-danger' : ''}`}
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
                      
                        <DeleteOutlined onClick={(e) => deleteCustomer(e, c.id)} className='text-danger' />
                     
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
          </ModalBody>
          {error && (
            <ModalFooter>
              <span>error</span>
            </ModalFooter>
          )}
        </Modal>
      </div>
    )
};

export default Customers
