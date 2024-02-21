import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../App';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/Header';
import { getData, putData } from '../../services/AccessAPI';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState({
    id:'',
   roleName: '',
   fullName:'',
   userName:'',
   email:'',
   roles: ''
    // Add more properties as needed
  });
  const [role, setRoles] = useState([]);

  const handleChange = (event) => {
    event.persist();
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    getData(`/api/User/GetUserDetails/${id}`).then((result) => {
      let responseJson = result;
      if (responseJson) {
        console.log(responseJson);

        // @ts-ignore
        setUserDetails({
          id: result.id,
          fullName: result.fullName,
          userName: result.userName,
          email: result.email,
          roles:result.roles
          // Add more properties as needed
        });
      } else if (!responseJson) {
        Swal.fire({
          title: 'Warning!',
          icon: 'warning',
          text: 'No user ID Found',
          button: 'Ok!',
        });
        navigate('/dashboard/users');
      }
      loadRoles();
    });
  }, [id, navigate]);
  const loadRoles = async () => {
    //debugger;
    getData('/api/Role/GetAll').then(
        (result) => {
            if (result) {
            setRoles(result);
            console.log(result);
            }
        }
    )};
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let userProfile = {
      id: userDetails.id,
      fullName: userDetails.fullName,
      email: userDetails.email,
      roles: userDetails.roles
  }
  console.log(userProfile);
  putData(`/api/User/EditUserProfile/${id}`, userProfile).then((res) => {
      let responseJson = res;
      console.log(res);
      if (responseJson) {
        console.log(responseJson);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Record Updated Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/dashboard/users');
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Error updating user',
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
                  <p className='h5 fw-bold'>Edit User</p>
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
                <div className='col-xs-12 col-sm-8 col-md-6 mt-3'>
                  <div className='row mb-3'>
                    <div className='col-xs-12 col-sm-12 col-md-6'>
                      <label htmlFor='fullName' className='form-label'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        name='fullName'
                        value={userDetails.fullName}
                        className='form-control'
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='col-xs-12 col-sm-12 col-md-6'>
                      <label htmlFor='userName' className='form-label'>
                        User Name
                      </label>
                      <input
                        type='text'
                        name='userName'
                        value={userDetails.userName} 
                        className='form-control'
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='col-xs-12 col-sm-12 col-md-6'>
                      <label htmlFor='email' className='form-label'>
                        Email
                      </label>
                      <input
                        type='text'
                        name='email'
                        value={userDetails.email}
                        className='form-control'
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                  <div className='col-12'>
                                        <label className="form-label">User Role</label>
                                        <select name="roles" id="roles" value={userDetails.roles} onChange={handleChange} className="form-control" >
                               <option value="" disabled>
                                  Select a role
                                 </option>
                               {role.map((item) => (
                           <option key={item.id} value={item.roleName}>
                               {item.roleName}
                        </option>
                      ))}
                    </select>
                          </div>   
                         </div>
                  <button className='btn btn-success mt-5' type='submit'>
                    <i className='fa fa-check-circle' aria-hidden='true'></i> Update User
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

export default EditUser;
