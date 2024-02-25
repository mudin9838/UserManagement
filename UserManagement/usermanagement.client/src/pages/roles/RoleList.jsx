import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Sidebar from "../sidebar/sidebar";

import { deleteData, getData } from "../../services/AccessAPI";

const RoleList = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [roleList, setRoleList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    await getData("/api/Role/GetAll").then((result) => {
      let responseJson = result;
      console.log(result);
      if (responseJson) {
        setRoleList(responseJson);
        setLoading(false);
      }
    });
  };

  const handleApiError = (error) => {
    Swal.fire({
      title: "Error!",
      text: error.message || "Something went wrong!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  const deleteRole = (e, id) => {
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
        deleteData(`/api/Role/Delete/${id}`)
          .then((res) => {
            let responseJson = res;
            if (res) {
              console.log(responseJson);
              Swal.fire({
                title: "Deleted!",
                text: "The role has been deleted.",
                icon: "success",
              });
              loadRoles(); // Reload the role list after deletion
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
                  <h3>Role List</h3>
                </div>
                <div className="col-12 col-md-9 text-end">
                  <Link to="/dashboard/add-role" className="btn btn-success">
                    <i className="fa fa-user" aria-hidden="true"></i> Add Role
                  </Link>
                </div>
              </div>
              <hr />
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Role Name</th>
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
                  ) : roleList ? (
                    roleList.map((role, index) => (
                      <tr key={index}>
                        <td>{role.roleName}</td>
                        {/* Add more columns based on your course data */}
                        <td colSpan={3} className="" id="btn">
                          {/* Add links or buttons for course actions */}
                          <Link
                            to={"/dashboard/view-role/" + role.id}
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
                            to={"/dashboard/edit-role/" + role.id}
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
                            onClick={(e) => deleteRole(e, role.id)}
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

export default RoleList;
