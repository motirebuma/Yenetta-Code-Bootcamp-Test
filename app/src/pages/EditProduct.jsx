import React from 'react'
import {useState} from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const { productID } = useParams();
    // console.log('productID:', productID);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState('');

    async function editProduct(ev){
        const _data = new FormData();
        _data.set('productID', productID);
        _data.set('newTitle', title);
        _data.set('newPrice', price);
        _data.set('newDescription', description);
        _data.set('file', files[0]);

        ev.preventDefault();

        const response = await fetch(
            'http://localhost:9000/api/update_product',{
                method: 'POST',
                body: _data,
                credentials: 'include',
            }
        );
        console.log(await response.json()); // Add parentheses
        
        if(response.ok){
            toast.success('Product updated successfuly!',{autoClose: 2000});
            setTimeout(()=> window.location.replace('/products'),2400);
        }else{
            toast.warning('Something went wrong!',{autoClose: 2000});
        }
    }

  return (
    <>  
        <Navbar />
        <h1 className='head'>Edit Product</h1>
        <form onSubmit={editProduct}>
            <p className='edit'>Edit the field you want to change</p>
            <input type='text' 
            placeholder={'title'} 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}
            />
            <input type='text' 
            placeholder={'price'} 
            value={price} 
            onChange={ev => setPrice(ev.target.value)}
            />
            <input type='file'
                // value={file}
                onChange={ev => setFiles(ev.target.files)}
            />
            <input type='text' 
            placeholder={'description'} 
            value={description} 
            onChange={ev => setDescription(ev.target.value)}
            />
            <button>Edit Product</button>
        </form>
    </>
  )
}

export default EditProduct;
