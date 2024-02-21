import React, { useEffect, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';


import Header from '../pages/header/Header';
import { Register_BASE_URL } from '../App';

const Register = () => {

    const navigate = useNavigate();

    useEffect(() => {
        var isAuth = localStorage.getItem('auth');

        if (isAuth !== null) {
            navigate("/dashboard");
        }
    }, []);

    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        userName: "",
        password: "",
        confirmationPassword: ""
      //  roles:[]
    })
    const [roles, setRoles] = useState([]);

    const handleCheckboxChange = (e) => {
        let data = roles
        console.log(data);
        data.push(e.target.value)
        setRoles(data)
      }
       

      
    const handleChange = (event) => {
      event.persist();
      setInputs({ ...inputs, [event.target.name]: event.target.value })
  }


    const handleFormsubmit = (event) => {
        event.preventDefault();
        if (inputs.password !== inputs.confirmationPassword) {
          alert("Password and confirm password are not same");
          return;
      }
        let data = {
            FullName: inputs.fullName,
            UserName: inputs.userName,
            Email: inputs.email,
            Password: inputs.password,
            ConfirmationPassword: inputs.confirmationPassword,
            roles: roles
        }
 console.log(roles);
        axios.post(Register_BASE_URL+'/api/User/Create', data).then(res => {
            if (res) {
                console.log(data);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "User Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                localStorage.setItem('auth', res.data.token)
                localStorage.setItem('userName', res.data.name)
                localStorage.setItem('roles', res.data.roles)


                navigate('/admin');
            }
        }).catch((e) => {
            Swal.fire({
                title: "Warning !",
                icon: 'warning',
                text: e,
                button: "Ok!"
            });
        })


    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 mt-lg-4 col-lg-8 mx-auto mt-3 mb-3">
                        <div className="card">
                            <div className="card-header text-center">
                                <h1 className="text-uppercase display-2 fw-bold">Add User</h1>

                                <span>Already have an account? <Link to='/admin' className='link-offset-2 link-underline link-underline-opacity-0'>Login Here</Link></span>
                            </div>

                            <div className="card-body">
                                <form className="row g-3" onSubmit={handleFormsubmit}>
                                <div className="col-md-6">
                                        <label htmlFor="fullName" className="form-label">Full Name <span className="text-danger d2">*</span></label>
                                        <input type="text" className="form-control" id="fullName" name='fullName' value={inputs.fullName} onChange={handleChange} placeholder='Ex. A. M. Asky' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="userName" className="form-label">user Name <span className="text-danger d2">*</span></label>
                                        <input type="text" className="form-control" id="userName" name='userName' value={inputs.userName} onChange={handleChange} placeholder='Ex. A. M. Asky' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label">Email <span className="text-danger d2">*</span></label>
                                        <input type="email" className="form-control" id="inputEmail4" name='email' value={inputs.email} onChange={handleChange} placeholder='Ex. am.asky97@gmail.com' required />
                                    </div>
                                  
                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">Password <span className="text-danger d2">*</span></label>
                                        <input type="password" className="form-control" id="inputPassword4" name='password' value={inputs.password} onChange={handleChange} placeholder='password' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputConfirmationPassword5" className="form-label">Confirmation Password <span className="text-danger d2">*</span></label>
                                        <input type="password" className="form-control" id="inputPassword5" name='confirmationPassword' value={inputs.confirmationPassword} onChange={handleChange} placeholder='Confirmation password' required />
                                    </div>
                                  
                                    <div className='col-12'>
                                        <label className="form-label">User Role</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id="Admin" value="Admin" onChange={handleCheckboxChange}/>
                                                <label className="form-check-label" htmlFor="Admin">Admin</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id="Management" value="Management" onChange={handleCheckboxChange} />
                                                <label className="form-check-label" htmlFor="management">Management</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" id="User" value="User" onChange={handleCheckboxChange}/>
                                                <label className="form-check-label" htmlFor="user">User</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-success "><i className="fa fa-external-link mr-1" aria-hidden="true"></i> Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register