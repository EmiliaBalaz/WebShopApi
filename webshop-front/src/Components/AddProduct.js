import React, { useState, useEffect } from 'react';
import './Styles/AddProduct.css';
import axios from 'axios';
import { Product } from '../Models/Product';

const AddProduct = () => {
  
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});

    const data = {
        name,
        price,
        quantity,
        description,
        image
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation
        const validationErrors = {};
        if (!name) {
          validationErrors.name = 'Name is required';
        }
        if (!price) {
          validationErrors.price = 'Price is required';
        }
        if (!quantity) {
          validationErrors.quantity = 'Quantity is required';
        }
        if (!description) {
            validationErrors.description = 'Description is required';
          }
        if (!image) {
          validationErrors.image = 'Image is required';
        }
        

        if (Object.keys(validationErrors).length > 0)
        {
            setErrors(validationErrors);
        }
        else
        {
            try 
            {
                const response = await axios.post('https://localhost:7042/api/Product/add', data);
                console.log('Adding product is successful', response.data);
            } catch (error)
            {
                console.error('Adding product is failed', error);
            }
            
        }
    }

    return(
        <div className="addproduct-container">
            <div className="addproduct-form">
                <h1 className="title">Add product</h1>
            <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name of product"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.quantity && <p className="error">{errors.quantity}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {errors.image && (
              <p className="error">{errors.image}</p>
            )}
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
    );
}

export default AddProduct;