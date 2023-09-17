import React, { useState, useRef, useEffect} from 'react';
import './Styles/Register.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setRepeatPassword] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setDateOfBirth] = useState('');
    const [type, setUserType] = useState(1);
    const [errors, setErrors] = useState({});
    const [photo, setPhoto] = useState(null);

    const data = {
        firstName,
        lastName,
        email,
        password,
        passwordVerify,
        userName,
        birthday,
        address,
        photo,
        type,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation
        const validationErrors = {};
        if (!firstName) {
          validationErrors.firstName = 'First Name is required';
        }
        if (!lastName) {
          validationErrors.lastName = 'Last Name is required';
        }
        if (!email) {
          validationErrors.email = 'Email is required';
        }
        if (!userName) {
          validationErrors.userName = 'Username is required';
        }
        if (!password) {
          validationErrors.password = 'Password is required';
        }
        if (!passwordVerify) {
          validationErrors.passwordVerify = 'Repeat Password is required';
        }
        if (password !== passwordVerify) {
          validationErrors.passwordVerify = 'Passwords must match';
        }
        if (!address) {
          validationErrors.address = 'Address is required';
        }
        if (!birthday) {
          validationErrors.birthday = 'Date of Birth is required';
        }

        // Set errors or submit form
        if (Object.keys(validationErrors).length > 0)
        {
            setErrors(validationErrors);
        }
        else
        {
          if (photo) {
            const reader = new FileReader();
            const filePromise = new Promise((resolve) => {
              reader.onloadend = () => {
                const photoString = reader.result;
                data.photo = photoString;
                resolve(); // Resolve the promise once the image string is set
              };
            });
            reader.readAsDataURL(photo);
  
            await filePromise; // Wait for the promise to be resolved

            var res=await sendRequest(data);
        
        
        navigate('/login');
          
        }
        else{
          alert(res.data);
          console.log(res.data);
          console.log(typeof res.data)
        }     
            
        }
    }

    const sendRequest = async (data) => {
      return await axios.post('https://localhost:7042/api/User/register', data);
    };

    const photoFrameRef = useRef(null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    const photoURL = URL.createObjectURL(file);
    // Set the URL as the background image of the photo frame
    photoFrameRef.current.style.backgroundImage = `url(${photoURL})`;
  };
    
    return(
        <div className="register-container">
            <div className="register-form">
                <h1 className="title">Register</h1>
            <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Verify Password"
              value={passwordVerify}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {errors.passwordVerify && (
              <p className="error">{errors.passwordVerify}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.userName && <p className="error">{errors.userName}</p>}
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Date of Birth"
              value={birthday}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.birthday && (
              <p className="error">{errors.birthday}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
        
          <div className="form-group">
            <input
              type="text"
              placeholder="Role"
              value={type}
              onChange={(e) => setUserType(e.target.value)}
            />
            {errors.type && <p className="error">{errors.type}</p>}
          </div>
          <div className="form-group">
            <p></p>
            <label htmlFor="photo-upload">Set Profile Photo:</label>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    );
};

export default Register;