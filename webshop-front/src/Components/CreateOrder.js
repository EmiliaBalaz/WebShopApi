import React, { useState,useEffect } from 'react';
import axios from 'axios';

import './Styles/CreateOrder.css';
import { Product } from '../Models/Product';
import { Order } from '../Models/Order';
import moment from 'moment';

const CreateOrder = ({ chartItems,setChartItems, isLoggedIn }) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
    const user = JSON.parse(sessionStorage['User']);
    const [comment, setComment] = useState('Bez napomene');
    const [address, setAddress] = useState('Bez napomene');
    let [orderDate, setOrderDate] = useState(null);
    var [price,setPrice]=useState(0);

    useEffect(() => {
        let totalPrice = 0;
           chartItems.forEach((item) => {
          totalPrice += item.quantity * item.price;
        });
        
        setPrice(totalPrice);
      }, []);

      const handleOrder = async () => {
        try
        {
          const orderData = {
            products: chartItems.map((item) => new Product(item.id, item.name, item.price, item.quantity, item.description, item.image)),
          };

            orderDate=moment().format();
            const newOrder = new Order(comment, address,price, orderDate, null, user.id, orderData.products);
            console.log(newOrder)
            axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;

            try
            {
              await axios.post('https://localhost:7042/api/Order/addorder', newOrder);
            }
            catch(error)
            {
              console.log(error);
            }
           
            
               
            

            // Clear the chart items
            setChartItems([]);
        }
        catch(error)
        {
            console.error(error);
        }
        
    }

    const removeFromChart = (id) => {
        setChartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      };

    return (
        <div className="chart-container">
          <h2>Chart</h2>
          {  
            <div className="chart-items">
              {chartItems.map((item) => (
                <div className="chart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => removeFromChart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          }
          {isLoggedIn && (
            <div className="order-section">
              <h3>Order Details</h3>
              <div className="input-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
              <div className="input-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                />
              </div>
              <p>Order price: ${price}</p>
              <button className="order-button" onClick={handleOrder}>
                Order
              </button>
            </div>
          )}
        </div>
      );

}

export default CreateOrder;