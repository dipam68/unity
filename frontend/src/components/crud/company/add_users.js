import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';

function AddUsersToCompany(props) {
    let navigate = useNavigate();

    const [listsData,setlistsData] =  useState();
    const [selectedUser,selectedUsers] =  useState();
    const [userchecked,setuserchecked] = useState([]);
    
    const [message,setmessage] = useState("");
    const [error,seterror] = useState("");

    const location = useLocation()
    const { data } = location.state

    const getAllUsers = () => {
      axios
      .post('http://127.0.0.1:8000/api/user/list', {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if(res.data.status) {
          setlistsData(res.data.users)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChecked = (e) => {
    const {value, checked} = e.target;
    if(checked) {
      setuserchecked([...userchecked,value]);
    }else{
      setuserchecked(userchecked.filter((e)=>e!==value));
    }
  }

    const frmAddUserToCompany = (e) => {
        e.preventDefault();
        axios
        .post('http://127.0.0.1:8000/api/user/assignCompany', {"user_id" :userchecked, "company_id" : data.id},{
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

    useEffect(()=>{
      getAllUsers();
    },[])

  return (
    <div className='container'>
    <div className="navbar background">
          <p className="headerLabel">Welcome to Unity</p>
          
    </div>
    <div className="col-md-8 mt-10 data-content">
      <h2 className='border border-info'>Add Users to {data.name}</h2>
        <div className='row'>
          <div className='col-md-2'>
              <Link to="/companies" className="btn btn-primary float-left btnAction">Company List</Link>
          </div>
        </div>
        <div className='row'>
          <form onSubmit={frmAddUserToCompany} className='form-inline'>
          <div className='col-md-2'>
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
            <div className="form-group row">
                {
                  listsData && listsData.map((item)=>{
                    return(
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value={item.id} onChange={handleChecked} />
                              <label className="">
                                {item.name}
                              </label>
                            </div>
                          )
                          })
                  }
            </div>
            </div>
            <div className='col-md-8'>
              <input type="submit" value="Save" className='btn btn-info col-md-2 h-25 float-left text-center' />
            </div>
          </form>
        </div>
    </div>
    </div>
  )
}
export default AddUsersToCompany