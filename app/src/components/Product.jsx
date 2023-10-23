import React from 'react';
import './product.css';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import {CiSquareRemove} from 'react-icons/ci';
import {VscDiffAdded} from 'react-icons/vsc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';



const Product = ({ _id, title, price, description, cover }) => {

  // delete product using _id
  async function deleteProduct(_id) {
    try {
      await fetch('http://localhost:9000/api/delete_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productID: _id,
        }),
        credentials: 'include',
      });
      toast.success('Product deleted successfully',{autoClose: 2000});
      setTimeout(()=> window.location.reload(),2400);
      
    } catch (error) {
      toast.error('Error deleting product');
    }
  }

  // add product to stock
  async function addProductToStock(_id) {
    try {
      await fetch('http://localhost:9000/api/add_product_to_stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productID: _id,
        }),
        credentials: 'include',
      });
      toast.success('Product added to stock successfully',{autoClose: 2000});
      setTimeout(()=> window.location.reload(),2400);


      
    } catch (error) {
      toast.error('Error adding the product to stock',{autoClose: 2000});
    }
  }

   // remove product from stock
   async function removeProductFromStock(_id) {
    try {
      await fetch('http://localhost:9000/api/remove_from_stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productID: _id,
        }),
        credentials: 'include',
      });
      toast.warning('Product removed from stock successfully',{autoClose: 2000});
      setTimeout(()=> window.location.reload(),3000);
      
    } catch (error) {
      toast.error('Error removing the product from stock',{autoClose: 2000});
    }
  }

  return (

    
    <>
    <div className='product_component'>
      <img src={'http://localhost:9000/' + cover} alt='cover' />
      <div className="content">
        <h1>{title}</h1>
        <i>${price}</i>
        <p>{description}</p>
        
      </div>
      <div className="buttons">
            <div className="edit_delete">
                <Link to={'/edit_product/'+_id} className='edit_link'>
                  <AiFillEdit className='icon edit' title='Edit product'/>
                </Link>
                <AiFillDelete onClick={()=>deleteProduct(_id)} className='icon delete' title='Delete product'/>
            </div>
            <div className="add_remove">
                <VscDiffAdded onClick={()=>{addProductToStock(_id)}} className='icon addtostock' title='Add product to stock'/>
                <CiSquareRemove onClick={()=>{removeProductFromStock(_id)}} className='icon removefromstock' title='Remove product from stock'/>
            </div>
        </div>
    </div>
    </>

  );
};

export default Product;