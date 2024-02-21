import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Role_BASE_URL } from '../../App';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/Header';
import { getData, putData } from '../../services/AccessAPI';

const EditRole = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [roleDetails, setRoleDetails] = useState({
    id:'',
   roleName: '',
  
    // Add more properties as needed
  });

  const handleChange = (event) => {
    event.persist();
    setRoleDetails({ ...roleDetails, [event.target.name]: event.target.value });
  };

  useEffect(() => {
      getData(`/api/Role/${id}`).then((result) => {
      let responseJson = result;
      if (responseJson) {
        console.log(responseJson);

        setRoleDetails({
          id: result.id,
          roleName: result.roleName,
          // Add more properties as needed
        });
      } else if (!responseJson) {
        Swal.fire({
          title: 'Warning!',
          icon: 'warning',
          text: 'No Course ID Found',
          button: 'Ok!',
        });
        navigate('/dashboard/roles');
      }
    });
  }, [id, navigate]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    putData(`/api/Role/Edit/${id}`, roleDetails).then((res) => {
      let responseJson = res;
      if (responseJson) {
        console.log(responseJson);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Record Updated Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/dashboard/roles');
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Error updating course',
        });
      }
    });
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <div className='container py-3'>
            <div className='container pt-1'>
              <div className='row'>
                <div className='col pt-2'>
                  <p className='h5 fw-bold'>Edit Role</p>
                </div>
                <div className='col text-end'>
                  <Link to='/dashboard/roles' className='btn btn-success'>
                    <i className='fa fa-chevron-circle-left' aria-hidden='true'></i> Back
                  </Link>
                </div>
              </div>
              <hr />
            </div>

            <form action='' autoComplete='off' onSubmit={handleFormSubmit}>
              <div className='row'>
                <div className='col-12 col-md-6 mt-3'>
                  <div className='row mb-3'>
                    <div className='col-12'>
                      <label htmlFor='roleName' className='form-label'>
                        Role Name
                      </label>
                      <input
                        type='text'
                        name='roleName'
                        value={roleDetails.roleName}
                        className='form-control'
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button className='btn btn-success mt-5' type='submit'>
                    <i className='fa fa-check-circle' aria-hidden='true'></i> Update Role
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
