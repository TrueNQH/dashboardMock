import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import {  decryptToken } from './hashToken';

function NewsEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        
        "title": "",
        "content": "",
        "image": ""
    });
    const navigate = useNavigate();
     const token = decryptToken(localStorage.getItem('token'));
    const handleContentChange = (value) => {
        setFormData({
            ...formData,
            content: value
        });
    }
    const handleImageUpload = async (e) => {
        const files = e.target.files;
        const uploadPromises = [];
        setLoading(true);
      
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'cloudinaryApp'); // Thay bằng upload preset của bạn từ Cloudinary
      
          const uploadPromise = axios.post(
            'https://api.cloudinary.com/v1_1/dt0kv3yml/image/upload', // Thay bằng Cloudinary URL của bạn cho image
            formData
          ).then(response => response.data.secure_url);
      
          uploadPromises.push(uploadPromise);
        }
      
        try {
          const uploadedUrls = await Promise.all(uploadPromises);
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: uploadedUrls.join(','), // Lưu tất cả URL vào formData, phân tách bằng dấu phẩy
          }));
          setLoading(false);
        } catch (error) {
          console.error('Error uploading files:', error);
          setLoading(false);
        }
      };
    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const user = await axios.get(`http://localhost:8080/api/news/${params.id}`, {
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

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(token);
        console.log(formData);
        
            await axios.post(`http://localhost:8080/api/news`, formData, {
                headers: {
                    Authorization: token
                }
            }).then(res => console.log(res.data))
            navigate("/portal/news-list");
    }
    

    return (
        <>
            <h3>Chỉnh Sửa Bản Tin: {params.id}</h3>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Tiêu đề</label>
                            <input
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        

                        <div className="col-lg-6">
                            <label>Hình ảnh</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleImageUpload}
                                multiple
                            />
                        </div>
                        <div className="col-lg-12" >
                            <label>Nội dung</label>
                            <ReactQuill  value={formData.content} onChange={handleContentChange} />
                           
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

export default NewsEdit;
