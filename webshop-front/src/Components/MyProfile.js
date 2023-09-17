import React, { useState,useEffect } from 'react';
import './Styles/MyProfile.css';
import User from '../Models/User';
import axios from 'axios';
import EditProfile from './EditProfile';

const MyProfile = () => {
    const [user, setUser] = useState(JSON.parse(sessionStorage["User"]));
    const [editing, setEditing] = useState(false);
    const [ph,setPh]=useState("");

    useEffect(() => {
        const userProfileData = JSON.parse(sessionStorage["User"]);
        setUser(userProfileData);
      }, []);

      const handleSave = (updatedUser) => {
        setUser(updatedUser);
        setEditing(false);
        sessionStorage.setItem("User",JSON.stringify(updatedUser));
        
      };

      const handleCancel = () => {
        setEditing(false);
      };
    
    useEffect(() => {
        const fetchUserProfileData = async () => {
          try {
            const response = axios.get('https://localhost:7042/api/User/find/'+user.id);
            console.log('change prof successful', response.data);
            return (await response).data
          } catch (error) {
            console.error('Registration failed', error);
          }
        };
      
        fetchUserProfileData().then((userProfileData) => {
          setUser(userProfileData);
        });
      }, []);

      useEffect(() => {
   
        renderphoto();
    
      }, []);
        
      const renderphoto = async () => {
        const id=user.id;
        const p=await getPhoto(id);
        setPh(p.data);
        console.log("------------------");
        console.log(p);
        console.log(p.data);
      };
    
    
      const getPhoto = async (id) => {
        
        return await axios.get(`https://localhost:7042/api/User/photo/` + id);
      };
    
    
      const handlePhotoChange = () => {
        try{
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          fileInput.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
              const imageString = reader.result; // Converted image as a string
              const updatedUser = {
                ...user,
                photo: imageString,
              };
              setUser(updatedUser);
              setPh(imageString);
            };
            reader.readAsDataURL(file);
          fileInput.click();
        }
        }
        catch(error){}
    
      };
      


      const renderProfileContent = () => {
        if (editing) {
            return <EditProfile user={user} onSave={handleSave} onCancel={handleCancel} />;
        }
      return(
        <div className="profile-details">
          <div className="profile-photo" onClick={handlePhotoChange}>
            <img src={ph} alt="Profile" />
          </div>
          <div className="profile-field">
            <span className="profile-label">Username:</span>
            <span>{user.userName}</span>
          </div>

          <div className="profile-field">
            <span className="profile-label">First Name:</span>
            <span>{user.firstName}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Last Name:</span>
            <span>{user.lastName}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Date of Birth:</span>
            <span>{user.birthday}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Address:</span>
            <span>{user.address}</span>
          </div>
          <div className="profile-actions">
              <button className="edit-button" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </div>
        </div>
     );
    }

    return (
    
        <div className="profile-container">
          <div className="profile-header">
            <h1>Profile</h1>
          </div>
          <div className="profile-content">{renderProfileContent()}</div>
        </div>
      );
}

export default MyProfile;