import React, { useState, useEffect } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { BASE_URL } from "../../App";
import { getData, postData } from "../../services/AccessAPI";
import showToast from "../../components/toastify/Toastify";

const AddUser = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmationPassword: "",
    roles: [],
  });
  const [role, setRoles] = useState([]);

  useEffect(() => {
    loadRoles();
  }, []);
  const loadRoles = async () => {
    let response = await getData("/api/Role/GetAll");
    if (response) {
      // @ts-ignore
      setRoles(response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleFormsubmit = (event) => {
    event.preventDefault();
    if (inputs.password !== inputs.confirmationPassword) {
      alert("Password and confirm password are not same");
      return;
    }
    let data = {
      fullName: inputs.fullName,
      userName: inputs.userName,
      email: inputs.email,
      password: inputs.password,
      confirmationPassword: inputs.confirmationPassword,
      roles: [inputs.roles],
    };
    console.log(data);
    postData("/api/User/Create", data)
      .then((res) => {
        // @ts-ignore
        let responseJson = res;
        console.log(res);
        if (responseJson) {
          console.log(responseJson);
          showToast("success", "User Added Successfully!");


          navigate("/dashboard/users");
        }
      })
      .catch((e) => {
        showToast("error", "Error adding user!");

      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mt-lg-4 col-lg-8 mx-auto mt-3 mb-3">
            <div className="card">
              <div className="card-header text-center">
                <h1 className="text-uppercase display-2 fw-bold">Add User</h1>
              </div>

              <div className="card-body">
                <form className="row g-3" onSubmit={handleFormsubmit}>
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">
                      Full Name <span className="text-danger d2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={inputs.fullName}
                      onChange={handleChange}
                      placeholder="Ex. A. M. Asky"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="userName" className="form-label">
                      user Name <span className="text-danger d2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="userName"
                      value={inputs.userName}
                      onChange={handleChange}
                      placeholder="Ex. A. M. Asky"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">
                      Email <span className="text-danger d2">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                      placeholder="Ex. am.asky97@gmail.com"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">
                      Password <span className="text-danger d2">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      name="password"
                      value={inputs.password}
                      onChange={handleChange}
                      placeholder="password"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="inputConfirmationPassword5"
                      className="form-label"
                    >
                      Confirmation Password{" "}
                      <span className="text-danger d2">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword5"
                      name="confirmationPassword"
                      value={inputs.confirmationPassword}
                      onChange={handleChange}
                      placeholder="Confirmation password"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">User Role</label>
                    <select
                      name="roles"
                      id="roles"
                      value={inputs.roles}
                      onChange={handleChange}
                      className="form-control"
                    >
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
                  <div className="col-12">
                    <button type="submit" className="btn btn-success ">
                      <i
                        className="fa fa-external-link mr-1"
                        aria-hidden="true"
                      ></i>{" "}
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
