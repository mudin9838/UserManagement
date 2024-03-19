// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Import the updated CSS file

const Sidebar = () => {
    let role = localStorage.getItem('roles') || "";


    return (

        <div className="col-12 col-md-3">
            <ul className="list-group">

                <Link to="/dashboard/" className="list-group-item">
                    Dashboard
                </Link>
                <Link to="/customer/" className="list-group-item">
                    Customer
                </Link>
                {
                    (role === "Admin") &&
                    <Link to="/dashboard/users/" className="list-group-item">
                        User List
                    </Link>
                }
                {
                    (role === "Admin") &&
                    <Link to="/dashboard/roles/" className="list-group-item">
                        Role List
                    </Link>
                }
                {
                    (role === "Admin") &&
                    <Link to="/dashboard/usersrole/" className="list-group-item">
                        Manage User Role
                    </Link>
                }
            </ul>
        </div>
    );
};

export default Sidebar;
