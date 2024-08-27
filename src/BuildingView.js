import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {  decryptToken } from './hashToken';

function BuildingView() {
    const params = useParams();
    const [userList, setUserList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
     const token = decryptToken(localStorage.getItem('token'));
    useEffect(() => {
        //On Load
        
        getData();
       
    }, []);
    let getCategory = async (id) => {
        
        
        try {
            const categoryData = await axios.get('http://localhost:8080/category/' + id, {
                headers: {
                    Authorization: token
                }
            });
            console.log(categoryData.data.data);
            setCategory(categoryData.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    let getData = async () => {
        try {
           
            const user = await axios.get('http://localhost:8080/api/building/' + params.id, {
                headers: {
                    Authorization: token
                }
            });
            
            setUserList(user.data.data);
           
            
            getCategory(userList.categoryId);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    
    const imgUrls = userList.image ? userList.image.split(',') : [];
    return (
        <>
            
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Tòa Nhà {params.id}</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
                            :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                    <th>Id</th>
                                    <th>Tên Dự Án</th>
                                    <th>Địa chỉ</th>
                                    <th>Phòng ngủ</th>
                                    <th>Phòng tắm</th>
                                    <th>Giá</th>
                                    <th>Loại</th>
                                    <th>Người Quản Lý</th>
                                   
                                    </tr>
                                </thead>
                                    
                                    <tbody>
                                    <td>{userList.buildingId}</td>
                                    <td>{userList.buildingName}</td>
                                    <td>{userList.street}, {userList.ward}, {userList.district}</td>
                                    <td>{userList.bedRoom}</td>
                                    <td>{userList.bathRoom}</td>                                    
                                    <td>{userList.price}</td>                                   
                                    <td>{category.categoryDes}</td>
                                    <td>{userList.createdBy }</td>
                                    </tbody>
                                </table>

                                <h1>Địa chỉ</h1>
                                
                                <iframe src={userList["map"]} width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                                <h1>Hình ảnh</h1>
                                
                                {imgUrls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} style={{width: '600', height: '450'}} />
            ))}
                                
                            </div>
                    }
                </div>
            </div>
        </>

    )
}

export default BuildingView