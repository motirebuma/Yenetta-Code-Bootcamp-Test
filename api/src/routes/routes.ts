import express from 'express';
import { Request, Response } from 'express';
import Product from '../model/Product';
import multer = require('multer');
import fs from 'fs';
import ConnectToDB from '../config/db';
// connect to db
ConnectToDB();

const router = express.Router();
const uploadMiddleware = multer({dest: 'uploads/'});

// create product
router.post('/create_product', uploadMiddleware.single('file'), async(req: any, res: Response)=>{
    try{
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        const {title, description, price} = req.body;

        const product = await Product.create({
            title,
            description,
            cover: newPath,
            price,
        });
        console.log(product);
        res.status(201).json({status: 'ok'});
    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'bad request'
        })
    }
});

// Read / get products
router.get('/allproducts', async(req: Request, res: Response)=>{
    // find products and sort based on createdAt
    const products = await Product.find().sort({createdAt: -1});
    res.json(products)
});

// update product
router.post('/update_product', uploadMiddleware.single('file'), async(req: any, res: Response)=>{
    try{
        
        const { productID, newTitle, newDescription, newPrice } = req.body;
        console.log(productID, newTitle, newDescription, newPrice);

        // // get product
        const product = await Product.findById(productID);
        let newPath: any;

        const {originalname, path} = req.file || '';
        if(originalname && path){
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
        }else{
            newPath = product?.cover;
        }

        // check if the product is not available
        console.log(productID, newTitle, newDescription, newPrice, newPath);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        //update product
        product.title = newTitle || product.title;
        product.description = newDescription || product.description;
        product.cover = newPath;
        product.price = newPrice || product.price;

        // Save the updated product
        await product.save();
        return res.status(200).json({ status: 'ok' });

    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'bad request'
        })
    }
});


// delete products
router.post('/delete_product', async(req: Request, res: Response)=>{
    const {productID} = req.body;
    try{
        await Product.findByIdAndDelete(productID);
        res.status(200).json({status: 'ok'});
    }catch(err){
        res.status(404).json({error: 'product not found!'});
    }
});

// add to stock
router.post('/add_product_to_stock', async(req: Request, res: Response)=>{
    const {productID} = req.body;
    try{
        await Product.findByIdAndUpdate(productID, 
            {
                isAvailable: true
            });
        res.status(200).json({status: 'ok'});
    }catch(err){
        res.status(404).json({error: 'product not found!'});
    }
});

// remove from stock
router.post('/remove_from_stock', async(req: Request, res: Response)=>{
    const {productID} = req.body;
    try{
        await Product.findByIdAndUpdate(productID, 
            {
                isAvailable: false
            });
        res.status(200).json({status: 'ok'});
    }catch(err){
        res.status(404).json({error: 'product not found!'});
    }
});


// get products in stock
router.get('/products_in_stock', async(req: Request, res: Response)=>{
    // find products and sort based on createdAt
    const products = await Product.find({ isAvailable: true }).sort({createdAt: -1});
    res.json(products);
});

// get products out stock
router.get('/products_out_of_stock', async(req: Request, res: Response)=>{
    // find products and sort based on createdAt
    const products = await Product.find({ isAvailable: false }).sort({createdAt: -1});
    res.json(products);
});


// get products number
router.get('/get_counts', async (req: Request, res: Response) => {
    const productCount = await Product.countDocuments();
    const stockCount = await Product.countDocuments({ isAvailable: true });
    const outOfStockCount = await Product.countDocuments({ isAvailable: false });
  
    res.json({
      productCount: productCount,
      stockCount: stockCount,
      outOfStockCount: outOfStockCount,
    });
});



export default router;

