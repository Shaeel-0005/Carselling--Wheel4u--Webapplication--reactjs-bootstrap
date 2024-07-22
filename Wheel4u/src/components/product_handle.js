import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');
    const [brand, setBrand] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('year', year);
        formData.append('brand', brand);
        try {
            const response = await axios.post('http://localhost/Wheel4u_api/upload_image.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data);
        } catch (error) {
            setMessage('Error uploading file');
        }
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            id="price"
                            className="form-control"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="year" className="form-label">Year</label>
                        <input
                            type="number"
                            id="year"
                            className="form-control"
                            placeholder="Year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="brand" className="form-label">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            className="form-control"
                            placeholder="Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input
                            type="file"
                            id="image"
                            className="form-control"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Upload Product</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default UploadImage;
