import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';

function Edit(props) {
    let navigate = useNavigate();

    const [name,setName] = useState("");
    const [message,setmessage] = useState("");
    
    const location = useLocation()
    const { data } = location.state

    const fieldChange = (e)=>{
      setName(e.target.value);
    }

    const frmEditCompany = (e) => {
        e.preventDefault();
        axios
        .put('http://127.0.0.1:8000/api/company/update', {id:data.id, name:name}, {
          headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
          },
        })
        .then((res) => {
          if(res.data.status) {
            setmessage(res.data.message)
            setTimeout(()=>{
                navigate('/companies')
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
      <h2 className='border border-info'>Edit Company</h2>
        <div className='row'>
          <div className='col-md-2'>
              <Link to="/" className="btn btn-primary float-left btnAction">Company List</Link>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
          {
            message!=""?
            <div className="alert">
              <span className="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
              <strong>Success!</strong> {message}
            </div>:
            ""
          }
          <form onSubmit={frmEditCompany} className='form-inline'>
            <div className="form-group row">
              <label className="col-sm-1 col-form-label h-100">Name</label>
                <div className="col-sm-5">
                  <input type="text" required name="name" value={name!=''?name:data.name} onChange={fieldChange} className="h-100" minLength="3" maxLength="255" />
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
export default Edit