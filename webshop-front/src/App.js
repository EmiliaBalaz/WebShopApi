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
import CreateOrder from './Components/CreateOrder';
import SellersOrders from './Components/SellersOrders';
import ActivateOrders from './Components/ActivateOrders';
import AllOrders from './Components/AllOrders';


function App (){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chartItems,setChartItems]=useState([]);
  const handleLogin = () => {
    // Perform login logic and set isLoggedIn to true
    setIsLoggedIn(true);
  };

  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setChartItems([]);
    sessionStorage.removeItem("User");

  };

  return(
    <Router>
      <nav className='navbar'>
        <p className='myTitle'>WebShop</p>
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
                <Link to="/sellersOrders" className='spaceBetweenItems'>Sellers orders</Link>
                <Link to="/showMyProducts" className='spaceBetweenItems'>Sellers products</Link>
                </>
              )
            }
            {
              isLoggedIn &&
              (
                <>
                <Link to="/myProfile" className='spaceBetweenItems'>My profile</Link>
                <Link to="/logout" className='spaceBetweenItems' onClick={handleLogout}>Logout</Link>
                </>
              )
            }
            {isLoggedIn && PickRole().isAdmin===true &&
              (
                <>
                <Link to="/verifySeller" className='spaceBetweenItems'>Verify seller</Link>
                <Link to ="/allOrders" className='spaceBetweenItems'>All orders</Link>
                </>
              )
            }
            {isLoggedIn && PickRole().isCustomer===true &&
              (
                <>
                <Link to="/createOrder" className='spaceBetweenItems'>Create order</Link>
                <Link to ="/customersOrders" className='spaceBetweenItems'>My orders</Link>
                <Link to ="/activeOrder" className='spaceBetweenItems'>Active orders</Link>
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
            <Route path="/createOrder" element={<CreateOrder setChartItems={setChartItems} chartItems={chartItems} isLoggedIn={isLoggedIn}/>} />
          )
        }
        {
          isLoggedIn &&
          (
            <Route path="/customersOrders" element={<CustomersOrders/>} />
          )
        }
        {
          isLoggedIn &&
          (
            <Route path="/sellersOrders" element={<SellersOrders/>} />
          )
        }
         {
          isLoggedIn &&
          (
            <Route path="/showMyProducts" element={<ShowMyProducts/>} />
          )
        }
        {
          isLoggedIn &&
          (
            <Route path="/activeOrder" element={<ActivateOrders/>} />
          )
        }
        {
          isLoggedIn &&
          (
            <Route path="/allOrders" element={<AllOrders/>} />
          )
        }
      </Routes>
    </Router>
  );
  };

  
export default App;
