import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Add(props) {
    let navigate = useNavigate();

    const [name,setName] = useState("");
    const [message,setmessage] = useState("");
    const [error,seterror] = useState("");

    const fieldChange = (e)=>{
      setName(e.target.value);
    }

    const frmAddUser = (e) => {
        e.preventDefault();
        axios
        .post('http://127.0.0.1:8000/api/user/insert', {name:name}, {
          headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
          },
        })
        .then((res) => {
          if(res.data.status) {
            setmessage(res.data.message)
            setTimeout(()=>{
                navigate('/users')
            },3000);
          }
          else {
            seterror(res.data.data.name)
            setTimeout(()=>{
                navigate('/')
            },3000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

  return (
    <div className='container'>
    <div className="navbar background">
          <p className="headerLabel">Welcome to Unity</p>
    </div>
    <div className="col-md-8 mt-10 data-content">
      <h2 className='border border-info'>Add User</h2>
        <div className='row'>
          <div className='col-md-2'>
              <Link to="/" className="btn btn-primary float-left btnAction">User List</Link>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
          {
            message!=""?
            <div className="alert info">
              <span className="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
              <strong>Success!</strong> {message}
            </div>:
            ""
          }
          {
            error!=""?
            <div className="alert danger">
              <span className="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
              <strong>Fail!</strong> {error}
            </div>:
            ""
          }
          <form onSubmit={frmAddUser} className='form-inline'>
            <div className="form-group row">
              <label className="col-sm-1 col-form-label h-100">Name</label>
                <div className="col-sm-5">
                  <input type="text" required name="name" value={name} onChange={fieldChange} className="h-100" minLength="3" maxLength="255" />
                </div>
                <input type="submit" value="Submit" className='btn btn-info col-md-2 h-25' />
            </div>
          </form>
          </div>
        </div>
    </div>
    </div>
  )
}
export default Add