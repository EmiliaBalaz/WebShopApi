import React, { useState, useEffect, useRef } from 'react';
import './Styles/AddProduct.css';
import axios from 'axios';
import './Styles/Register.css';
import { Product } from '../Models/Product';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage["User"]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [newProduct, setNewProduct] = useState(new Product(0, "",  0, 1, "","", user.id));
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [sellerId, setSellerId] = useState('');
    const [image, setPhoto] = useState(null);


    const data = {
        name,
        price,
        quantity,
        description,
        image,
        sellerId,
    };

    const isUserVerified = user.veryfied;
    
    const handleAddProduct = async() =>
    {
      try 
      {
        if (image) {
          const reader = new FileReader();
          const filePromise = new Promise((resolve) => {
            reader.onloadend = () => {
              const photoString = reader.result;
              data.image = photoString;
              resolve(); // Resolve the promise once the image string is set
            };
          });
          reader.readAsDataURL(image);

          await filePromise; // Wait for the promise to be resolved

          var res=await sendRequest(data);
        }
        else{
          alert(res.data);
          console.log(res.data);
          console.log(typeof res.data)
        }     
          
      } catch (error)
      {
          console.error('Adding product is failed', error);
      }
    }

    const sendRequest = async (data) => {
      data.sellerId = user.id;
          const response = await axios.post('https://localhost:7042/api/Product/add', data);
          console.log('Adding product is successful', response.data);
          setProducts((prevProducts) => [...prevProducts, response.data]);
          setNewProduct(new Product(0, "",  0, 1, "","", user.id));
          navigate('/home');
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
      
    }

  

    const photoFrameRef = useRef(null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    const photoURL = URL.createObjectURL(file);
    // Set the URL as the background image of the photo frame
    photoFrameRef.current.style.backgroundImage = `url(${photoURL})`;
  };

    return(
        <div className="addproduct-container">
          
            <div className="addproduct-form">
            <h1 className="title">Add product</h1>
              {isUserVerified === 'Approved' &&(
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
                     <p></p>
                     <label htmlFor="photo-upload">Set Product Photo:</label>
                     <div className="photo-container">
                       <div className="photo-frame" ref={photoFrameRef}>
                         <label htmlFor="photo-upload" className="photo-label">
                           <span className="plus-icon">+</span>
                         </label>
                       </div>
                       <input
                         type="file"
                         id="photo-upload"
                         accept="image/*"
                         onChange={handlePhotoChange}
                       />
                     </div>
                   </div>  
         
                   <button type="submit" onClick={handleAddProduct}>Add</button>
                   </form>
              )} {
              isUserVerified === 'Denied' &&(
              
                <h1>You are not verified by an administrator.</h1>
               )}
              </div>
    </div>
    );
}

export default AddProduct;