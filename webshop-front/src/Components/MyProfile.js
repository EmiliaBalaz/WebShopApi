import React, { useState,useEffect } from 'react';
import './Styles/MyProfile.css';
import User from '../Models/User';
import axios from 'axios';
import EditProfile from './EditProfile';

const MyProfile = () => {
    const [user, setUser] = useState(JSON.parse(sessionStorage["User"]));
    const [editing, setEditing] = useState(false);

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
            const response = axios.get('https://localhost:7042/api/User/find?email='+user.userName + '%40gmail.com');
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


      const renderProfileContent = () => {
        if (editing) {
            return <EditProfile user={user} onSave={handleSave} onCancel={handleCancel} />;
        }
      return(
        <div className="profile-details">
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