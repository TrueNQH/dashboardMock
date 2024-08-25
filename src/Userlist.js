import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Userlist() {

  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    //On Load
    getUsers();
    console.log("welcome");
  }, []);

  let getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:8080/user-manage/list?page=&pageSize=20", {
        headers: {
          Authorization: token
        }
      });
      setUserList(users.data.data);
      console.log(users.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8080/user-manage/${id}`).then((res) => {
          console.log(res);
        });
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">User-List</h1>
        <Link to="/portal/create-user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Create User
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Full Name</th>
                    <th>E-Mail</th>
                    <th>phone</th>
                    <th>role</th>
                    <th>Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {userList.map((user) => {
                      switch(user.roleId){
                        case 1:
                          user.roleId = "Admin";
                          break;
                        case 2:
                          user.roleId = "Staff";
                          break;
                        case 3:
                          user.roleId = "Customer";
                          break;
                        default:
                          user.roleId = "Unknown";
                          break;
                      }
                      return (
                        <tr>
                          <td>{user.userId}</td>
                          <td>{user.userName}</td>
                          <td>{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.roleId }</td>
                         
                          <th>
                            <Link to={`/portal/user-view/${user.userId}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/user-edit/${user.userId}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(user.userId)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
          }

        </div>
      </div>
    </>
  )
}

export default Userlist