import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Add(props) {
    let navigate = useNavigate();

    const [name,setName] = useState("");
    const [message,setmessage] = useState("");
    const [error,seterror] = useState("");

  return (
    <div className='container'>
    <div className="navbar background">
          <p className="headerLabel">Welcome to Unity</p>
    </div>
    <h2 className='border border-info'>Unity Modules</h2>
    <div className="col-md-8 pt-20 data-content-home">
        <div className="row">
            <div className="col-md-3">
                <Link to="/users" className="btn mt-20 btn-info btnOpt">
                User
                </Link>
            </div>       
            <div className="col-md-3">
                <Link to="/companies" className="btn mt-20 btn-info btnOpt">
                Company
                </Link>
            </div>   
        </div>    
    </div>
    </div>
  )
}
export default Add