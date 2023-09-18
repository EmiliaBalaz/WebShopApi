import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Styles/CustomersOrders.css';


const SellersOrders = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
  const user = JSON.parse(sessionStorage['User']);
  const id = parseInt(user.id);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);


  const fetchOrderHistory = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
      const response = await axios.get('https://localhost:7042/api/Order/getsellersorder/' + id);
      setOrderHistory(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('Error fetching order history:', error);
    }
  };

  

  const renderOrderHistory = () => {
    return orderHistory.map((order) => (
      <div className="order-card" key={order.orderId}>
        <div className="order-info">
          <p>PRODUCTS: {order.products && order.products.join('  ||  ')}</p>
          <p>Comment: {order.comment}</p>
          <p>Address: {order.address}</p>
          <p>Order Date: {moment(order.orderDate).format('YYYY-MM-DD HH:mm')}</p>
          <p>Shipment Time: {moment(order.shipmentDate).format('YYYY-MM-DD HH:mm')}</p>
          <p>Price: $ {order.price}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
      <div>{renderOrderHistory()}</div>
    </div>
  );
};

export default SellersOrders;