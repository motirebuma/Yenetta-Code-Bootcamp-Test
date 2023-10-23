import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Loading from '../components/Loading';
import {TbMoodEmpty} from 'react-icons/tb';
const InStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:9000/api/products_in_stock')
      .then(response => response.json())
      .then(products => {
        setProducts(products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h1 className='head'>Stock</h1>
      {loading ? (
        // Display a loading message or spinner while fetching data
        <Loading />
      ) : (
        // Display products once they are loaded
        products.length > 0 ? (
          products.map(product => (
            <Product key={product.id} {...product} />
          ))
        ) : (
          <div className='empty_response'>
            <TbMoodEmpty className='emptyIcon'/>
            <i>No products found.</i>
          </div>
        )
      )}
    </>
  );
};

export default InStock;

