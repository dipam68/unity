import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './styles.css';

function List() {
    const [listsData,setlistsData] =  useState();
    const [message,setmessage] = useState("");
    const [error,seterror] = useState("");

    const getAll = () => {
        axios
        .post('http://127.0.0.1:8000/api/company/list', {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if(res.data.status) {
            setlistsData(res.data.companies)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const deleteCompany = (data) => {
      if(window.confirm("Are you sure you want to delete this company? - "+data.item.name+""))
      {
        axios
        .delete('http://127.0.0.1:8000/api/company/delete', {
          headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
          },
          data: {
            id: data.item.id
          }
        })
        .then((res) => {
          if(res.data.status) {
            setmessage(res.data.message)
            setTimeout(()=>{
                window.location.reload();
            },3000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }

    useEffect(()=>{
        getAll();
    },[])

    

  return (
    <div className='container'>
      <div className="navbar background">
            <p className="headerLabel">Welcome to Unity</p>
      </div>
      <div className="col-md-8 mt-10 data-content">
        <h2 className='border border-info'>Company List</h2>

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

        <div className='row'>
          <div className='col-md-3'>
            <Link to="/company/add" className="btn btn-primary float-left btnAction">Add Company</Link>
          </div>
          <div className='col-md-2'>
            <Link to="/" className="btn btn-info float-left btnAction">Home</Link>
          </div>
        </div>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Add Users</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
                listsData && listsData.map((item)=>{
                    return(
                        <>
                        <tr scope="row" key='{item}'>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>
                              <Link to="/company/edit" className="btn btn-success btnOpt" 
                                state={{ data: item }}
                                >
                                Edit
                              </Link>
                            </td>
                            <td>
                              <Link to="/company/add_users" className="btn btn-info btnOpt" 
                                state={{ data: item }}
                                >
                                Add Users
                              </Link>
                            </td>
                            <td>
                              <button onClick={() => deleteCompany({item})} className="btn btn-danger btnOpt">
                                Delete
                              </button>
                            </td>
                            </tr>
                        </>
                    )
                })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default List