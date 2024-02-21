import React from 'react';
import Header from '../../header/Header';
import Sidebar from '../sidebar/sidebar';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {


 

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <div className='container py-3'>
            <div className='container pt-1'>
              <div className='row'>
                <div className='col-12 col-md-3 pb-3'>
                  <h3>Dashboard</h3>
                </div>
              </div>
              <hr />
            </div>

            <div className='row'>
              <div className='col-md-4'>
                <div className='card dashboard-card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Students</h5>
                    <p className='card-text'></p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card dashboard-card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Programs</h5>
                    <p className='card-text'></p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card dashboard-card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Enrolled Students</h5>
                    <p className='card-text'></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
