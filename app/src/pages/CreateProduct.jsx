import React from 'react'
import {useState} from 'react';
import Navbar from '../components/Navbar';

const CreateProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState('');

    async function createProduct(ev){
        const _data = new FormData();
        _data.set('title', title);
        _data.set('price', price);
        _data.set('description', description);
        _data.set('file', files[0]);

        ev.preventDefault();
        const response = await fetch(
            'http://localhost:9000/api/create_product',{
                method: 'POST',
                body: _data,
                credentials: 'include',
            }
        );
        console.log(await response.json)
        if(response.ok){
            window.alert('product created successfuly!')
        }
    }

  return (
    <>
        <Navbar />
        <h1 className='head'>Create Product</h1>
        <form onSubmit={createProduct}>
            <input type='text' 
            placeholder={'title'} 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}
            required
            />
            <input type='text' 
            placeholder={'price'} 
            value={price} 
            onChange={ev => setPrice(ev.target.value)}
            required
            />
            <input type='file'
                // value={file}
                accept="image/*" 
                onChange={ev => setFiles(ev.target.files)}
                required
            />
            <input type='text' 
            placeholder={'description'} 
            value={description} 
            onChange={ev => setDescription(ev.target.value)}
            />
            <button>Create Product</button>
        </form>
    </>
  )
}

export default CreateProduct
