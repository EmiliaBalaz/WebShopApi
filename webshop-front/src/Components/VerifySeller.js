import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "./Styles/Verifications.css"

const VerifySeller = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
      const response = await axios.get('https://localhost:7042/api/Admin/getsellers');
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put("https://localhost:7042/api/Admin/verify/" + id + "/"+ 0);
      updateUserStatus(id, 0);
    } catch (error) {
      console.log('Error accepting user:', error);
    }
  };

  const handleReject = async (id) => {
    try {
        await axios.put("https://localhost:7042/api/Admin/verify/" + id + "/" + 1);
      updateUserStatus(id, 1);
    } catch (error) {
      console.log('Error rejecting user:', error);
    }
  };

  const updateUserStatus = (id, status) => {
    var usr=JSON.parse(sessionStorage["User"]);
    usr.veryfied=status;
    sessionStorage.setItem("User",JSON.stringify(usr));
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === id) {
          return { ...user, veryfied: status };
        }
        return user;
      })
    );
  };

  const renderUsers = () => {
    return users.map((user) => (
      <div className="user-card" key={user.id}>
        <p>
          <span>UserID:</span> {user.id}
        </p>
        <p>
          <span>Username:</span> {user.userName}
        </p>
        <p>
          <span>First Name:</span> {user.firstName}
        </p>
        <p>
          <span>Last Name:</span> {user.lastName}
        </p>
        <p>
          <span>Address:</span> {user.address}
        </p>
        <p>
          <span>Email:</span> {user.email}
        </p>
        <p>
          <span>Status:</span> {getStatusLabel(user.veryfied)}
        </p>
        <p>
          <div className="button-group">
            <button onClick={() => handleAccept(user.id)}>Accept</button>
            <button onClick={() => handleReject(user.id)}>Reject</button>
          </div>
        
        </p>
        
      </div>
      
    ));
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return "Denied";
      case 2:
        return "In progress";
      case 0:
        return "Accepted";
      default:
        return "";
    }
  };

  return (
    <div className="verifications-container">
      <h2 className="verifications-title">User Verifications</h2>
      {users.length > 0 ? renderUsers() : <p>No users found.</p>}
    </div>
  );
};

export default VerifySeller;