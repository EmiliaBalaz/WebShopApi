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


function App (){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          </ul>
        </li>
      </nav>
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
        <Route path="/register" element={<Register/>}></Route>
        {isLoggedIn &&
          (
            <Route path="/addProduct" element={<AddProduct/>} />
          )
        }
      </Routes>
    </Router>
  );
  };

  
export default App;
