import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function BuildingList() {

  const [dataList, setDataList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    //On Load
    getDatas();
   
  }, []);

  let getDatas = async () => {
    try {
      const datas = await axios.get("http://localhost:8080/api/building/building-list?page=&pageSize=20", {
        headers: {
          Authorization: token
        }
      });
      setDataList(datas.data.data);
     
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    let data = []
    data.push(id)
    console.log(data);
    
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8080/api/building`, data, {
          headers: {
            Authorization: token
          }
        
        }
        
        ).then((res) => {
          console.log(res);
        });
        getDatas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Building-List</h1>
        <Link to="/portal/create-building" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Create Building
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
                    <th>buildingId</th>
                    <th>buildingName</th>
                    <th>address</th>
                    <th>area</th>
                    <th>price</th>
                    <th>mangerName</th>
                    <th>Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {dataList.map((data) => {
                     
                      return (
                        <tr>
                          <td>{data.buildingId}</td>
                          <td>{data.buildingName}</td>
                          <td>{data.address}</td>
                          <td>{data.area}</td>
                          <td>{data.price}</td>
                          <td>{data.mangerName }</td>
                         
                          <th>
                            <Link to={`/portal/building-view/${data.buildingId}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/building-edit/${data.buildingId}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(data.buildingId)} className='btn btn-danger btn-sm mr-1'>Delete</button>
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

export default BuildingList