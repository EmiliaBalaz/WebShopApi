import React, { useState, useEffect } from 'react';
import './Styles/Home.css';
import axios from 'axios';
import { PickRole } from '../Services/ChooseYourRole';
import moment from 'moment';

const Home = ({ isLoggedIn,setChartItems,chartItems }) => {
  const [articles, setArticles] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  
  useEffect(() => {
   
    fetchArticles();
  }, []);

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const getProductDetails = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7042/api/Product/find/${id}`);
      setSelectedProduct(response.data);
      setSelectedQuantity(1); // Reset selected quantity when displaying new product details
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArticles = async () => {
    try
    {
      if (isLoggedIn === true)
      {
        console.log(JSON.parse(sessionStorage["Token"]));
        console.log(JSON.parse(sessionStorage["User"]));
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
      }

      const response = await axios.get('https://localhost:7042/api/Product/getall');
      const fetchedArticles = response.data;

      setArticles(fetchedArticles);
      console.log(fetchArticles);
    }
    catch(error)
    {
      console.error(error);
    }
  }

    const addToChart= async(product) => {
      const existingItem = chartItems.find((item) => item.id === product.id);
      console.log(existingItem);
      if (existingItem)
      {
        // If the item already exists in the chart, update its quantity
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + selectedQuantity,
        };

      console.log(updatedItem);
      setChartItems((prevItems) =>
        prevItems.map((item) => (item.id === product.id ? updatedItem : item))
      );
      }
      else
      {
      // If the item is not in the chart, add it as a new item
      const newItem = {
        ...product,
        quantity: selectedQuantity,
      };
  
      setChartItems((prevItems) => [...prevItems, newItem]);
    }
      // Implement your logic to add the product to the chart

      console.log('Product added to chart:', product);

    };

    return (
      <div className="fragrance-shop-home">
        <div className="fragrance-articles-rendered">
          {articles && articles.map((item) => (
            <div className="article-rendered" key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <button onClick={() => getProductDetails(item.id)}>View Details</button>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div className="product-details-overlay">
            <div className="product-details">
              <div className="product-info">
                <h3>{selectedProduct.name}</h3>
                <p>Description: {selectedProduct.description}</p>
                <p>Price: ${selectedProduct.price}</p>
                {isLoggedIn === true && PickRole().isCustomer === true && (
                  <>
                    <div className="quantity-picker">
                    <button onClick={() => addToChart(selectedProduct)}>Add to Cart</button>
                    </div>
                  </>
                )}
                <p></p>
                <button onClick={closeProductDetails}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default Home;