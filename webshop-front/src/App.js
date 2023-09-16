import logo from './logo.svg';
import './App.css';
import './Components/Styles/NavBar.css'
import Login from './Components/Login';
import ShowMyProducts from './Components/ShowMyProducts';
import Register from './Components/Register';
import AddProduct from './Components/AddProduct';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';
import {PickRole} from './Services/ChooseYourRole' 
import MyProfile from './Components/MyProfile';
import VerifySeller from './Components/VerifySeller';
import Home from './Components/Home'
import CustomersOrders from './Components/CustomersOrders';


function App (){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chartItems,setChartItems]=useState([]);
  const handleLogin = () => {
    // Perform login logic and set isLoggedIn to true
    setIsLoggedIn(true);
  };
  return(
    <Router>
      <nav className='navbar'>
        <p className='myTitle'>Food delivery</p>
        <li className="nav-list">   
          <ul>
          <Link to="/home" className="nav-link">Home</Link>
            {!isLoggedIn &&
              (
                <>
                  <Link to="/login" className='spaceBetweenItems'>Login</Link>
                  <Link to="/register" className='spaceBetweenItems'>Register</Link>
                </>
              )
            }
            {isLoggedIn && PickRole().isSeller===true &&
              (
                <>
                <Link to="/addProduct" className='spaceBetweenItems'>Add product</Link>
                </>
              )
            }
            {
              isLoggedIn &&
              (
                <>
                <Link to="/myProfile" className='spaceBetweenItems'>My profile</Link>
                <Link to="/editProfile" className='spaceBetweenItems'>Edit profile</Link>
                </>
              )
            }
            {isLoggedIn && PickRole().isAdmin===true &&
              (
                <>
                <Link to="/verifySeller" className='spaceBetweenItems'>Verify seller</Link>
                </>
              )
            }
            {isLoggedIn && PickRole().isCustomer===true &&
              (
                <>
                <Link to="/customersOrders" className='spaceBetweenItems'>Create order</Link>
                </>
              )
            }
          </ul>
        </li>
      </nav>
      <Routes>
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} setChartItems={setChartItems} chartItems={chartItems}/>}/>
        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
        <Route path="/register" element={<Register/>}></Route>
        {isLoggedIn &&
          (
            <Route path="/addProduct" element={<AddProduct/>} />
          )
        }
        {
          isLoggedIn &&
          (
            <Route path="/myProfile" element={<MyProfile/>} />
          )
        }
        {
          isLoggedIn &&
          (
            <Route path="/verifySeller" element={<VerifySeller/>} />
          )
        }
        {
          isLoggedIn &&
          (
            <Route path="/customersOrders" element={<CustomersOrders setChartItems={setChartItems} chartItems={chartItems} isLoggedIn={isLoggedIn}/>} />
          )
        }
      </Routes>
    </Router>
  );
  };

  
export default App;
