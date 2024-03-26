import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../App";
import Sidebar from "../sidebar/sidebar";

import showToast from "../../components/toastify/Toastify";
import { postDataForAttachment } from "../../services/AccessAPI";

const Email = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    emailToId: "",
    emailToName: "",
    emailSubject: "",
    emailBody: "",
    emailAttachments: "",

    // Add more properties as needed
  });

  const [image, setImage] = useState(null);
  const handleChange = (event) => {
    event.persist();
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      setImage(e.target.files[0]);
    }
  };

  const handleFormSubmit = (event) => {
    const formData = new FormData();
    formData.append("emailToId", inputs.emailToId);
    formData.append("emailToName", inputs.emailToName);
    formData.append("emailSubject", inputs.emailSubject);
    formData.append("emailBody", inputs.emailBody);
    // @ts-ignore
    formData.append("image", image);
    event.preventDefault();

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    postDataForAttachment("/api/Emails/Create", formData)
      .then((res) => {
        let responseJson = res;
        if (responseJson) {
          console.log(responseJson);
          showToast("success", "Email sent Successfully!");

          navigate("/dashboard");
        }
      })
      .catch((e) => {
        showToast("error", "Failed! Something went wrong");
      });
  };

  return (
    <div>
      <form action="" autoComplete="off" onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-md-6">
          <div className="form-group form-floating mb-3">
              <input
                type="email"
                id="floatingEmail"
                name="emailToId"
                value={inputs.emailToId}
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
                id="floatingInput1"
                name="emailToName"
                value={inputs.emailToName}
                className="form-control"
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-group form-floating mb-3">
              <input
                type="text"
                id="floatingInput2"
                name="emailSubject"
                value={inputs.emailSubject}
                className="form-control"
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingInput">Subject</label>
            </div>
            <div className="form-floating">
  <textarea className="form-control" name="emailBody"  placeholder="Leave a text here" id="floatingTextarea2" style= {{height:'100px'}} 
  onChange={handleChange} value={inputs.emailBody} ></textarea>
  <label htmlFor="floatingTextarea2">Text</label>
</div>
            
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
 
       
        </div>
      </form>
    </div>
    
  );
};
export default Email;
