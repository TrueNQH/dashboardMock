import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserCreate() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password:"",
        fullName: "",
        isActive: "",
        phone: "",
        roleId: 0
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
   
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            
           // setLoading(true);
           await axios.post(`http://localhost:8080/user-manage`, 
            formData
           , {
                headers: {
                    'Authorization': token,
                    
                }
            }).then((res) => {
                
                if(res.data.statusCode == 201){
                    navigate("/portal/user-list");
                }
            })
            //navigate("/portal/user-list");
            
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <>
            <h3>Tạo Tài Khoản Người Dùng</h3>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Tên Tài Khoản</label>
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
                            <label>Số Điện Thoại</label>
                            <input
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                type="number"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-6">
                            <label>Họ Tên</label>
                            <input
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleChange}
                                type="text"
                                className='form-control'
                            />
                        </div>
                        <div className="col-lg-6">
                            <label>Mật Khẩu</label>
                            <input
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-6">
                        <label>Vai Trò</label>
                            <select
                                name='roleId'
                                value={formData.roleId}
                                onChange={handleChange}
                                className='form-control'
                            >
                                <option value="">----Chọn----</option>
                                <option value="1">Quản Lý</option>
                                <option value="2">Nhân Viên</option>
                                <option value="3">Khách Hàng</option>
                            </select>
                        </div>

                        <div className='col-lg-4'>
                            <label>Kích Hoạt</label>
                            <select
                                name='isActive'
                                value={formData.isActive}
                                onChange={handleChange}
                                className='form-control'
                            >
                                <option value="">----Select----</option>
                                <option value="true">Hoạt Động</option>
                                <option value="false">Ngừng Hoạt Động</option>
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

export default UserCreate;
