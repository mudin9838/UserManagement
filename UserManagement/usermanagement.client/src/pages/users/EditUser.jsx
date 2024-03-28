import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../App";
import Sidebar from "../sidebar/sidebar";

import { getData, putData } from "../../services/AccessAPI";
import showToast from "../../components/toastify/Toastify";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let userrole = localStorage.getItem("roles") || "";
  const [userDetails, setUserDetails] = useState({
    id: "",
    roleName: "",
    fullName: "",
    userName: "",
    email: "",
    roles: "",
    // Add more properties as needed
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null)
  const handleChange = (event) => {
    event.persist();
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleImageChange = e => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(selectedImage)
      setImage(e.target.files[0])
    }
  }

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
          roles: userrole,
          // Add more properties as needed
        });
      } else if (!responseJson) {
        showToast('error','No User Id found!');
        navigate("/dashboard");
      }
    });
  }, [id, navigate]);

  const handleFormSubmit = (event) => {
    const formData = new FormData();
    formData.append("id", userDetails.id);
    formData.append("fullName", userDetails.fullName);
    formData.append("email", userDetails.email);
    formData.append("roles", userrole);
    // @ts-ignore
    formData.append("image", image);
    event.preventDefault();
 
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    putData(`/api/User/EditUserProfile/${id}`, formData).then((res) => {
      let responseJson = res;
      console.log(res);
      if (responseJson) {
        console.log(responseJson);
       showToast('success','Data updated successfully!');
        navigate("/dashboard");
      } else {
        showToast('error','Error updating data!');
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
                id="floatingInput1"
                name="fullName"
                value={userDetails.fullName}
                className="form-control"
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingInput">Full Name</label>
            </div>
            <div className="form-group form-floating mb-3">
              <input
                type="email"
                id="floatingEmail"
                name="email"
                value={userDetails.email}
                className="form-control"
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
              <label htmlFor="floatingEmail">Email</label>
            </div>

            <div className="form-group form-floating mb-3">
              <input
                type="text"
                id="floatingUserRole"
                name="roles"
                value={userrole}
                className="form-control"
                placeholder="email@example.com"
                required
              />
              <label htmlFor="floatingEmail">User Role</label>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Update User
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label style={{ width: "100%" }}></label>
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "350px", maxHeight: "350px" }}
              />
              <input
                type="file"
                className="form-control"
                style={{
                  border: "0px!important",
                  padding: "0px",
                  paddingTop: "10px",
                  paddingBottom: "30px",
                  width: "58.5%",
                }}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditUser;


