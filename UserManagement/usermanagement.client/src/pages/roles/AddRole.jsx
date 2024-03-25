import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../services/AccessAPI";
import showToast from "../../components/toastify/Toastify";
const AddRole = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    roleName: "",
    //id: '',
    // Add more properties as needed
  });

  const [errors, setErrors] = useState({
    roleName: "",
    // id: '',
    // Add more properties as needed
  });

  const handleChange = (event) => {
    event.persist();
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    // Clear the error message when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [event.target.name]: "",
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validate the form fields
    const validationErrors = validateForm(inputs);
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      roleName: inputs.roleName,
      //Id: inputs.id,
      // Add more properties as needed
    };

    postData("/api/Role/Create", data)
      .then((res) => {
        let responseJson = res;
        if (responseJson) {
          console.log(responseJson);
          showToast("success", "Role Added Successfully!");

          navigate("/dashboard/roles");
        }
      })
      .catch((e) => {
        showToast("error", "Failed! Somthing went wrong");
      });
  };

  // Function to validate the form fields
  const validateForm = (data) => {
    const errors = {
      roleName: "",
      // id: '',
      // Add more properties as needed
    };

    if (!data.roleName) {
      errors.roleName = "Role Name is required";
    }

    // if (!data.id.trim()) {
    //   errors.id = 'id is required';
    // }

    // Add more validation as needed for other properties

    return errors;
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="container py-3">
          <div className="container pt-1">
            <div className="row">
              <div className="col pt-2">
                <p className="h5 fw-bold">Add Role</p>
              </div>
              <div className="col text-end">
                <Link to="/dashboard/roles" className="btn btn-success">
                  <i
                    className="fa fa-chevron-circle-left"
                    aria-hidden="true"
                  ></i>{" "}
                  Back
                </Link>
              </div>
            </div>
            <hr />
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
              <form action="" onSubmit={handleFormSubmit} autoComplete="off">
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="courseName" className="form-label">
                      Role Name
                    </label>
                    <input
                      type="text"
                      name="roleName"
                      id="roleName"
                      value={inputs.roleName}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.roleName && "is-invalid"
                      }`}
                    />
                    {errors.roleName && (
                      <div className="invalid-feedback">{errors.roleName}</div>
                    )}
                  </div>
                </div>
                <input
                  type="submit"
                  value="Add Role"
                  className="btn btn-success"
                ></input>
                {/* <button className='btn btn-success' ty>
                  <i className='fa fa-check-circle' aria-hidden='true'></i> Submit
                </button> */}
              </form>
            </div>

            <div className="col-sm-12 col-md-6 text-center p-3 d-none d-md-block">
              {/* You can add an image or any additional content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
