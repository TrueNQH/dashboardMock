import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BuildingView() {
    const params = useParams();
    const [userList, setUserList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
    const token = localStorage.getItem('token');
    useEffect(() => {
        //On Load
       
        getData();
       
    }, []);

    let getData = async () => {
        try {
           
            const user = await axios.get('http://localhost:8080/api/building/' + params.id, {
                headers: {
                    Authorization: token
                }
            });
            console.log(user.data.data);
            setUserList(user.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    

    return (
        <>
            <div>BuidlingView - {params.id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">BuidlingView</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
                            :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                    <th>buildingId</th>
                                    <th>buildingName</th>
                                    <th>address</th>
                                    <th>area</th>
                                    <th>price</th>
                                    <th>mangerName</th>
                                   
                                    </tr>
                                </thead>
                                    
                                    <tbody>
                                    <td>{userList.buildingId}</td>
                                    <td>{userList.buildingName}</td>
                                    <td>{userList.street}, {userList.ward}, {userList.district}</td>
                                    <td>{userList.area}</td>
                                    <td>{userList.price}</td>
                                    <td>{userList.mangerName }</td>
                                    </tbody>
                                </table>

                                <h1>Địa chỉ</h1>
                                
                                <iframe src={userList["map"]} width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                                <h1>Hình ảnh</h1>
                                <img src={userList.image} alt="" />
                                
                                
                            </div>
                    }
                </div>
            </div>
        </>

    )
}

export default BuildingView