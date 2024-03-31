import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getData, putData } from "../../services/AccessAPI";

const UsersRole = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    roleName: "",
    fullName: "",
    userName: "",
    email: "",
    roles: "",
    // Add more properties as needed
  });
  const [role, setRoles] = useState([]);

  const handleCheckboxChange = (e) => {
    let data = role;
    console.log(data);
    data.push(e.target.value);
    setRoles(data);
  };
  const handleChange = (event) => {
    event.persist();
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };
  const onSearch = async () => {
    await getData(
      "/api/User/GetUserDetailsByUserName/" + userDetails.userName
    ).then((result) => {
      let responseJson = result;
      if (responseJson) {
        console.log(responseJson);

        // @ts-ignore
        setUserDetails({
          fullName: result.fullName,
          userName: result.userName,
          email: result.email,
          roles: result.roles,
          // Add more properties as needed
        });
      }
    });
  };
  useEffect(() => {
    onSearch();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let userProfile = {
      userName: userDetails.userName,
      roles: role,
    };
    console.log(userProfile);
    putData("/api/User/EditUserRoles", userProfile).then((res) => {
      let responseJson = res;
      console.log(res);
      if (responseJson) {
        console.log(responseJson);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User's roles updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/users");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: "Error updating user role",
        });
      }
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "20px" }}>
          <div className="container py-3">
            <h3>Users Role</h3>
            <div className="input-group">
              <input
                className="col-md-3"
                type="text"
                name="userName"
                placeholder="Enter user name"
                value={userDetails.userName}
                onChange={handleChange}
              ></input>
              <span class="input-group-addon">&nbsp;</span>
              <button
                className="btn btn-primary"
                onClick={() => onSearch(userDetails.userName)}
              >
                Search
              </button>
            </div>
            <label>Full Name: {userDetails.fullName}</label>
            <label className="col-md-4">
              User Name: {userDetails.userName}
            </label>
            <hr></hr>

            <form action="" autoComplete="off" onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
                  <div className="col-12">
                    <label className="form-label">User Role</label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="Admin"
                          value="Admin"
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="Admin">
                          Admin
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="Management"
                          value="Management"
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="management"
                        >
                          Management
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="User"
                          value="User"
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="user">
                          User
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-success mt-5" type="submit">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>{" "}
                    Update
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

export default UsersRole;
