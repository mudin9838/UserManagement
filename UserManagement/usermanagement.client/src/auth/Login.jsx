import React, { useEffect, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'


import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../pages/header/Header';
import { Login_BASE_URL } from '../App';

const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        var isAuth = localStorage.getItem('auth');
    
        if (isAuth !== null) {
            navigate("/dashboard", { replace: true });
        }
    }, []);

    const [inputs, setInputs] = useState({
        userName: "",
        password: ""
    });

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleFormsubmit = (event) => {
        event.preventDefault();

        let data = {
            UserName: inputs.userName,
            Password: inputs.password,
        }

        axios.post(Login_BASE_URL+'/api/Auth/Login', data).then(res => {
            if (res) {
                localStorage.setItem('auth', res.data.token)
                localStorage.setItem('userId', res.data.userId)
                localStorage.setItem('userName', res.data.name)
                localStorage.setItem('roles', res.data.roles)

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate("/dashboard")
            }

            else{
                Swal.fire({
                    title: "Warning !",
                    icon: 'warning',
                    text: "Invalid Credential. Verify your userName or password",
                    button: "Ok!"
                });
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
                    <div className="col-lg-6 col-12 mx-auto" style={{marginTop:'9rem',marginBottom:'9rem'}}>
                        <div className="card ">
                            <div className="card-header text-center">
                                <h1 className="text-uppercase display-1 fw-bold">LOGIN</h1>

                                <span className="text-muted">Don't have an account? <Link to="/register" className='link-offset-2 link-underline link-underline-opacity-0'>Register Here</Link></span>
                            </div>

                            <div className="card-body">
                                <form autoComplete="off" onSubmit={handleFormsubmit}>
                                    {/*userName*/}
                                    <div className='form-group'>
                                        <label htmlFor="">User Name</label>
                                        <div className="input-group mb-3 mt-2">
                                            <span className="input-group-text" id="basic-addon1">@</span>
                                            <input type="text" className="form-control" placeholder="Username" name="userName" value={inputs.userName} onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" required/>
                                        </div>
                                    </div>

                                    {/*Password*/}
                                    <div className='form-group'>
                                        <label htmlFor="">Password</label>
                                        <div className="input-group mb-3 mt-2">
                                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-key" aria-hidden="true"></i></span>
                                            <input type="password" className="form-control" placeholder="password" name="password" value={inputs.password} onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" required />
                                        </div>
                                    </div>

                                    {/*Login Button*/}
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success form-control"><i className="fa fa-unlock-alt mr-3"
                                            aria-hidden="true"></i> Login</button>
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

export default Login