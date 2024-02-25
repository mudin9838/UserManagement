import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Sidebar from "../sidebar/sidebar";
import { BASE_URL } from "../../App";
import { deleteData, getData } from "../../services/AccessAPI";

const UserList = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [UserList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth") !== null) {
      loadUsers();
    }
  }, []);

  const loadUsers = async () => {
    await getData("/api/User/GetAll").then((result) => {
      let responseJson = result;
      console.log(result);
      if (responseJson) {
        setUserList(responseJson);
        setLoading(false);
      }
    });
  };
  // const loadUsers = async () => {
  //   if (localStorage.getItem('auth') !== null) {
  //     let response =  await fetch(BASE_URL+'/api/User/GetAll');
  //       if (response) {
  //         let data = await response.json();
  //         setUserList(data);
  //         setLoading(false)
  //       }
  //   } else {
  //     navigate('/admin');
  //   }
  // };

  const handleApiError = (error) => {
    Swal.fire({
      title: "Error!",
      text: error.message || "Something went wrong!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };
  // const csvHeaders = [
  //   { label: 'Id', key: 'Id' },
  //   { label: 'User Name', key: 'RoleName' },
  //   // Add more headers based on your course data
  // ];
  const deleteUser = (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(`/api/User/Delete/${id}`)
          .then((res) => {
            let responseJson = res;
            if (res) {
              console.log(responseJson);
              Swal.fire({
                title: "Deleted!",
                text: "The user has been deleted.",
                icon: "success",
              });
              loadUsers(); // Reload the user list after deletion
            } else {
              handleApiError(new Error("Error deleting role"));
            }
          })
          .catch((error) => {
            handleApiError(error);
          });
      }
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "20px" }}>
          <div className="container py-3">
            <div className="container pt-1">
              <div className="row">
                <div className="col-12 col-md-3 pb-3">
                  <h3>User List</h3>
                </div>
                <div className="col-12 col-md-9 text-end">
                  <Link to="/dashboard/add-user" className="btn btn-success">
                    <i className="fa fa-user" aria-hidden="true"></i> Add User
                  </Link>
                </div>
              </div>
              <hr />
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    {/* Add more columns based on your course data */}
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="text-center">
                      <td colSpan={7}>
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : UserList ? (
                    UserList.map((user, index) => (
                      <tr key={index}>
                        <td>{user.fullName}</td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        {/* Add more columns based on your course data */}
                        <td colSpan={3} className="" id="btn">
                          {/* Add links or buttons for course actions */}
                          <Link
                            to={"/dashboard/view-user/" + user.id}
                            className="btn btn-primary btn-sm"
                            style={{ marginRight: "6px" }}
                          >
                            <i
                              className="fa fa-search-plus"
                              aria-hidden="true"
                            ></i>{" "}
                            View
                          </Link>
                          <Link
                            to={"/dashboard/edit-user/" + user.id}
                            className="btn btn-warning btn-sm"
                            style={{ marginRight: "6px" }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>{" "}
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteUser(e, user.id)}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>{" "}
                            Delete
                          </button>
                          {/* Add more links or buttons for other actions */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-danger">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* You can add additional buttons or actions here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
