import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './ActivateOrders.css';


const ActiveOrders = () => {
 
  const user = JSON.parse(sessionStorage['User']);
  const userID = parseInt(user.id);
  const [activeOrders, setActiveOrders] = useState([]);

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  const fetchActiveOrders = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
      const response = await axios.get('https://localhost:7042/api/Order/getcustomersorder/' + userID);
      //const orders = response.data.filter((order) => moment(order.shipmentTime).isAfter(moment()));
      setActiveOrders(response.data);
    } catch (error) {
      console.log('Error fetching active orders:', error);
    }
  };

  const handleDismissOrder = async (orderId) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
      await axios.delete(`https://localhost:7042/api/Order/deleteorder/${orderId}`);
      fetchActiveOrders();
    } catch (error) {
      console.log('Error dismissing order:', error);
    }
  };

  useEffect(() => {
    const fetchData = async (orderId) => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
        const response = await axios.get(`https://localhost:7042/api/Order/getproductbyorderid/${orderId}`);
        const products = response.data.map((item) => item.name);
        setActiveOrders((prevOrders) => {
          return prevOrders.map((order) => {
            if (order.orderId === orderId) {
              return { ...order, products };
            }
            return order;
          });
        });
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    activeOrders.forEach((order) => {
      fetchData(order.orderId);
    });
  }, [activeOrders]);

  const renderTimeRemaining = (shipmentTime) => {
    const now = moment();
    const remainingTime = moment(shipmentTime).diff(now);
    const duration = moment.duration(remainingTime);

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds= duration.seconds()

    return `${days} days ${hours} hours ${minutes} minutes`;
  };

  const renderOrders = () => {
    return activeOrders.map((order) => (
      <div className="order-card">
        <div className="order-info">
          <p>PRODUCTS: {order.products && order.products.join('  ||  ')}</p>
          <p>Comment: {order.comment}</p>
          <p>Address: {order.address}</p>
          <p>Order Date: {moment(order.orderDate).format('YYYY-MM-DD HH:mm')}</p>
          <p>Shipment Time: {moment(order.shipmentTime).format('YYYY-MM-DD HH:mm')}</p>
          <p>Remaining Time: {renderTimeRemaining(order.shipmentTime)}</p>
          <p>Price:$ {order.price}</p>
        </div>
        <div className="dismiss-button">
          {moment().subtract(1, 'hour').isBefore(moment(order.orderDate)) && (
            <button onClick={() => handleDismissOrder(order.orderId)}>Dismiss Order</button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="active-orders-container">
      <h2 className="active-orders-title">Active Orders</h2>
      {activeOrders.length > 0 ? renderOrders() : <p>No active orders found.</p>}
    </div>
  );
};

export default ActiveOrders