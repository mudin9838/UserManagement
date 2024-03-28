/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { putDataJson } from "../../services/AccessAPI";
import showToast from "../../components/toastify/Toastify";



const inputs = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
 const userNameStrings = localStorage.getItem('userName')
  const [inputs, setInputs] = useState({
    userName: "",
    currentPassword: "",
    newPassword: "",
    confirmationPassword: "",
  });

  const handleChange = (event) => {
    event.persist();
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputs.newPassword !== inputs.confirmationPassword) {
      alert("Password and confirm password are not same");
      return;
    }
    let data = {
      userName: userNameStrings,
      currentPassword: inputs.currentPassword,
      newPassword: inputs.newPassword,
    };
    putDataJson(`/api/User/ChangePassword/${userNameStrings}`, data).then((res) => {
      let responseJson = res;
      console.log(res);
      if (responseJson) {
        console.log(responseJson);
        showToast("success", "Password updated Successfully!");
        localStorage.clear()
        navigate('/Login')
      } else {
        showToast("error", "Failed updating Password!");
      }
    });
  };

  return (
    <div>
      <form action="" autoComplete="off" onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-md-6">
          <div className="form-group form-floating mb-3">
              <input
                type="text"
                name="userName"
                id="floatingUserName"
                value={userNameStrings}
                className="form-control"
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingUserName1">User Name</label>
            </div>
            <div className="form-group form-floating mb-3">
              <input
                type="password"
                name="currentPassword"
                id="floatingCurrentPassword"
                value={inputs.currentPassword}
                className="form-control"
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingCurrentPassword">Current Password</label>
            </div>
            <div className="form-group form-floating mb-3">
              <input
                type="password"
                name="newPassword"
                id="floatingNewPassword"
                value={inputs.newPassword}
                className="form-control"
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingNewPassword">New Password</label>
            </div>
            <div className="form-group form-floating mb-3">
              <input
                type="password"
                name="confirmationPassword"
                id="floatingConfirmPassword"
                className="form-control"
                value={inputs.confirmationPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
            </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
      </form>
    </div>
  );
};
export default inputs;
