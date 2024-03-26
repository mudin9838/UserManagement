import React, { useEffect, useState } from 'react';
import { getData } from '../../services/AccessAPI';


const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRoles, setTotalRoles] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("auth") !== null) {
      loadCustomers();
      loadUsers();
      loadRoles();
    }
  }, []);
  const loadCustomers = async () => {
    await getData("/api/Customer/GetAll").then((result) => {
      let responseJson = result;
      console.log(result);
      if (responseJson) {
        console.log(setTotalCustomers(responseJson.length));
      }
    });
  };
  const loadUsers = async () => {
    await getData("/api/User/GetAll").then((result) => {
      let responseJson = result;
      console.log(result);
      if (responseJson) {
        console.log(setTotalUsers(responseJson.length));
      }
    });
  };
  const loadRoles = async () => {
    await getData("/api/Role/GetAll").then((result) => {
      let responseJson = result;
      console.log(result);
      if (responseJson) {
        console.log(setTotalRoles(responseJson.length));
      }
    });
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <div className='container py-3'>
            <div className='row'>
              <div className='col-md-4'>
                <div className='card dashboard-card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Customers</h5>
                    <p className='card-text'>{totalCustomers}</p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card dashboard-card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Users</h5>
                    <p className='card-text'>{totalUsers}</p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card dashboard-card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Roles</h5>
                    <p className='card-text'>{totalRoles}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
function setTotalCustomers(students) {
  throw new Error('Function not implemented.');
}

