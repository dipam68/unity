import './App.css';
import {Route, Routes } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"

import Home from './components/crud/home';

import ListUser from './components/crud/user/list';
import AddUser from './components/crud/user/add';
import EditUser from './components/crud/user/edit';

import ListCompany from './components/crud/company/list';
import AddCompany from './components/crud/company/add';
import EditCompany from './components/crud/company/edit';
import AddUsersToCompany from './components/crud/company/add_users';


function App() {
  return (
    <div className="App">
      <Routes>
        
          <Route path='/' exact element={<Home />} />
          <Route path='/users' exact element={<ListUser />} />
          <Route path='/user/add' exact element={<AddUser />} />
          <Route path='/user/edit' exact element={<EditUser />} />
          
          <Route path='/companies' exact element={<ListCompany />} />
          <Route path='/company/add' exact element={<AddCompany />} />
          <Route path='/company/edit' exact element={<EditCompany />} />
          <Route path='/company/add_users' exact element={<AddUsersToCompany />} />
      </Routes>
    </div>
  );
}

export default App;
