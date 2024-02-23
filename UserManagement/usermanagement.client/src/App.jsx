import './App.css';
import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from './protected/PrivateRoutes';

import Footer from './pages/footer/Footer';

import LandingPage from './pages/landing/LandingPage';
import Dashboard from './pages/dashboard/Dashboard';

import Register from './auth/Register';
import Login from './auth/Login';
import AddRole from './pages/roles/AddRole';
import RoleList from './pages/roles/RoleList';
import EditRole from './pages/roles/EditRole';
import UserList from './pages/users/UserList';
import EditUser from './pages/users/EditUser';
import AddUser from './pages/users/AddUser';
import UsersRole from './pages/usersrole/UsersRole';
export const Login_BASE_URL = "https://usermsapi.azurewebsites.net";
export const Register_BASE_URL = "https://usermsapi.azurewebsites.net";
export const Role_BASE_URL = "https://usermsapi.azurewebsites.net";
export const BASE_URL = "https://usermsapi.azurewebsites.net";

function App() {
    return (
        <div className="App">
            <Routes>

                <Route path='/' Component={Login} />
                <Route path='/register' Component={Register} />


                {/*Private Route */}
                <Route element={<PrivateRoutes />}>

                    <Route path='/dashboard' Component={Dashboard} />
                    <Route path='/dashboard/add-role' Component={AddRole} />
                    <Route path='/dashboard/roles' Component={RoleList} />
                    <Route path='/dashboard/edit-role/:id' Component={EditRole} />
                    <Route path='/dashboard/add-user' Component={AddUser} />
                    <Route path='/dashboard/users' Component={UserList} />
                    <Route path='/dashboard/usersrole' Component={UsersRole} />

                    <Route path='/dashboard/edit-user/:id' Component={EditUser} />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
