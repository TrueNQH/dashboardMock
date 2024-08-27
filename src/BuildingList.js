import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {  decryptToken } from './hashToken';

function BuildingList() {

  const [dataList, setDataList] = useState([]);
  const [isLoading, setLoading] = useState(true);
   const token = decryptToken(localStorage.getItem('token'));
  useEffect(() => {
    //On Load
    getDatas();
   
  }, []);

  let getDatas = async () => {
    try {
      const datas = await axios.get("http://localhost:8080/api/building/building-list", {
        headers: {
          Authorization: token
        }
      });
      setDataList(datas.data.data);
     
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Phiên đăng nhập đã hết hạn");
      navigator("/")
    }
  }

  let handleDelete = async (id) => {
    
    
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8080/api/building/${id}`,{
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
        <h1 className="h3 mb-0 text-gray-800">Danh Sách Tòa Nhà</h1>
        <Link to="/portal/create-building" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Thêm Tòa Nhà
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Dữ liệu Bảng</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                    <th>Id</th>
                    <th>Tên Tòa nhà</th>
                    <th>Địa chỉ</th>
                    <th>Diện tích</th>
                    <th>Giá </th>
                    
                    <th>Hành động</th>
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
                          
                         
                          <th>
                            <Link to={`/portal/building-view/${data.buildingId}`} className='btn btn-primary btn-sm mr-1'>Xem</Link>
                            <Link to={`/portal/building-edit/${data.buildingId}`} className='btn btn-info btn-sm mr-1'>Sửa</Link>
                            <button onClick={() => handleDelete(data.buildingId)} className='btn btn-danger btn-sm mr-1'>Xóa</button>
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