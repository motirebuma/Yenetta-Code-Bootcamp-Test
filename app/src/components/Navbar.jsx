import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    // Fetch all counts
    fetch('http://localhost:9000/api/get_counts')
      .then((response) => response.json())
      .then((data) => setCounts(data))
      .catch((error) => console.error('Error fetching counts:', error));
  }, []);

  return (
    <>
      <div className='navbar'>
        <Link to={'/create_product'}>Create Product</Link>
        <Link to={'/products'}>All Products</Link>
        <Link to={'/instock'}>Stock</Link>
        <Link to={'/out_of_stock'}>Out of Stock</Link>
      </div>
      <div className="available">
        <h1 className='available1'>{counts.productCount}</h1>
        <h1 className='available2'>{counts.stockCount}</h1>
        <h1 className='available3'>{counts.outOfStockCount}</h1>
      </div>
    </>
  );
};

export default Navbar;
