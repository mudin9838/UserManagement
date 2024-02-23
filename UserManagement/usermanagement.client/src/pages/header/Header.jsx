import React, { useEffect, useState } from 'react';
import Logo from './m-logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [token, setToken] = useState(false);
    const userNameString = localStorage.getItem('userName');
    const navigate = useNavigate();
    let userName;
    try {
        userName = userNameString;
    } catch (error) {
        console.error("Error parsing userName:", error);
        userName = null;
    }


    const logout = () => {
        localStorage.clear();
        navigate('/');
      };
    useEffect(() => {
        let isAuth = localStorage.getItem('auth');

        if (isAuth !== null) {
            setToken(true);
        }
    }, []);

    return (
        <nav className="navbar pt-2 shadow pb-2 bg-primary bg-gradient" style={{ backgroundColor: "#F42153 !important" }}>
            <div className="container">
                <a className="navbar-brand">
                    <img src={Logo} alt="Logo" width="45" height="35"
                        className="d-inline-block align-text-top" />
                    <span className="text-light fw-bold font-monospace">Loyalist College</span>
                </a>
                {
                    token ? (
                        <span className="text-light fw-bold font-monospace text-end">
                            <i className="fa fa-user-circle-o" aria-hidden="true"></i>Welcome, {userName ? userName : 'Unknown User'}
                            <button className='btn btn-danger me-1' onClick={logout}>
                            Log Out
                            </button>
                        </span>
                        
                    ) : null
                }
              
            </div>
        </nav>
    );
}

export default Header;
