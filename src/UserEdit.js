import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        userId: "",
        fullName: "",
        isActive: "",
        phone: "",
        roleId: 0
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
   
    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const user = await axios.get(`http://localhost:8080/user-manage/${params.id}`, {
                headers: {
                    Authorization: token
                }
            });
            setFormData(user.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const data = {
   
            
        "email": "staff01aa@example.com",
        "fullName": "NguyenHaauy111",
        "isActive": true,
        
        "phone": "0123456791",
        "roleId": 3,
        "userId": 2,
        "userName": "staff011aaa"
        
        }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            
           // setLoading(true);
           await axios.post(`http://localhost:8080/user-manage/`, 
            data
           , {
                headers: {
                    'Authorization': token,
                    
                }
            }).then((res) => {
                console.log(res.data);
            })
            //navigate("/portal/user-list");
            
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <>
            <h3>UserEdit - Id: {params.id}</h3>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Name</label>
                            <input
                                name='userName'
                                value={formData.userName}
                                onChange={handleChange}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-6">
                            <label>E-Mail</label>
                            <input
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-6">
                            <label>Phone</label>
                            <input
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                type="number"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-6">
                            <label>Full Name</label>
                            <input
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleChange}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-6">
                            <label>Role ID</label>
                            <input
                                name='roleId'
                                value={formData.roleId}
                                onChange={handleChange}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='col-lg-4'>
                            <label>Is Active</label>
                            <select
                                name='isActive'
                                value={formData.isActive}
                                onChange={handleChange}
                                className='form-control'
                            >
                                <option value="">----Select----</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </div>

                        <div className='col-lg-4 mt-3'>
                            <input
                                disabled={isLoading}
                                type="submit"
                                value={isLoading ? "Updating..." : "Update"}
                                className='btn btn-primary'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UserEdit;
