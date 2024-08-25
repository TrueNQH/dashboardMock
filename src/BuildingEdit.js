import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BuildingEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        district: "",
        ward: "",
        street: "",
        map: "",
        price: "",
        buildingName: "",
        bedRoom: 0,
        bathRoom: 0,
        juridical: "",
        area: "",
        categoryId: 1
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
   
    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const user = await axios.get(`http://localhost:8080/api/building/${params.id}`, {
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
        
            await axios.post(`http://localhost:8080/api/building`, formData, {
                headers: {
                    Authorization: token
                }
            }).then(res => console.log(res.data))
            navigate("/portal/building-list");
    }
    

    return (
        <>
            <h3>BuildingEdit - Id: {params.id}</h3>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>BuildingName</label>
                            <input
                                name='buildingName'
                                value={formData.buildingName}
                                onChange={handleChange}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-6">
                            <label>street</label>
                            <input
                                name='street'
                                value={formData.street}
                                onChange={handleChange}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-6">
                            <label>ward</label>
                            <input
                                name='ward'
                                value={formData.ward}
                                onChange={handleChange}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-6">
                            <label>district</label>
                            <input
                                name='district'
                                value={formData.district}
                                onChange={handleChange}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className="col-lg-4">
                            <label>price</label>
                            <input
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                className='form-control'
                            />
                        </div>
                        <div className="col-lg-4">
                            <label>bathRoom</label>
                            <input
                                name='bathRoom'
                                value={formData.bathRoom}
                                onChange={handleChange}
                                type="number"
                                className='form-control'
                            />
                        </div>
                        <div className="col-lg-4">
                            <label>bedRoom</label>
                            <input
                                name='bedRoom'
                                value={formData.bedRoom}
                                onChange={handleChange}
                                type="number"
                                className='form-control'
                            />
                        </div>

                        <div className='col-lg-4'>
                            <label>isRent</label>
                            <select
                                name='isRent'
                                value={formData.isRent}
                                onChange={handleChange}
                                className='form-control'
                            >
                                <option value="">----Select----</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </div>
                        <div className='col-lg-4'>
                            <label>isSell</label>
                            <select
                                name='isSell'
                                value={formData.isSell}
                                onChange={handleChange}
                                className='form-control'
                            >
                                <option value="">----Select----</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </div>
                        <div className='col-lg-4'>
                            <label>CategoryID</label>
                            <select
                                name='categoryId'
                                value={formData.categoryId}
                                onChange={handleChange}
                                className='form-control'
                            >
                                <option value="">----Select----</option>
                                <option value="1">Residential</option>
                                <option value="2">Commercial</option>
                                <option value="3">Commercial</option>
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

export default BuildingEdit;
