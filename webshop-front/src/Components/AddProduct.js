import React, { useState, useEffect } from 'react';
import './Styles/AddProduct.css';
import axios from 'axios';
import { Product } from '../Models/Product';

const AddProduct = () => {
  
    const user = JSON.parse(sessionStorage["User"]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    const [newProduct, setNewProduct] = useState(new Product(0, "",  0, 1, "","", user.id));
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [sellerId, setSellerId] = useState('');


    const data = {
        name,
        price,
        quantity,
        description,
        image,
        sellerId,
    };
    
    const handleAddProduct = async() =>
    {
      try 
      {
          data.sellerId = user.id;
          const response = await axios.post('https://localhost:7042/api/Product/add', data);
          console.log('Adding product is successful', response.data);
          setProducts((prevProducts) => [...prevProducts, response.data]);
          setNewProduct(new Product(0, "",  0, 1, "","", user.id));
      } catch (error)
      {
          console.error('Adding product is failed', error);
      }
    }

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
      
    }

    const handleImageUpload = (e) => {
      try{
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (selectedProduct) {
          setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            image: reader.result,
          }));
        } else {
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            image: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);

  }
  catch(error){}
    };

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
          <label htmlFor="image">Image:</label>
          <div className="image-preview">
            {newProduct.image && <img src={newProduct.image} alt="Product Preview" />}
          </div>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

          <button type="submit" onClick={handleAddProduct}>Add</button>
        </form>
      </div>
    </div>
    );
}

export default AddProduct;