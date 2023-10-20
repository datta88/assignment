import express from "express";
// import mongoose from "mongoose";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Product from './src/models/product.js';

const app = express();

app.use(express.json());

const PORT = 5000 ;

const connectMongoDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if(conn){
        console.log('MongiDB connected SuccessFully');
    }
}
connectMongoDB();

app.get('/products', async (req,res)=>{
    const productAll = await Product.find()
    res.json({
        success : true,
        data : productAll,
        massage : 'successfully fetched all product',
    })
});

app.post('/product',async (req,res)=>{
    const {name, description, price,brand}=req.body;
    if(!name){
        return res.json({
            success : false,
            massage : "name is requied",
        })
    }
    if(!description){
        return res.json({
            success : false,
            massage : "description is requied",
        })
    }
    if(!price){
        return res.json({
            success : false,
            massage : "price is requied",
        })
    }
    // if(!name){
    //     return res.json({
    //         success : false,
    //         massage : "name is requied",
    //     })
    // }
    if(!brand){
        return res.json({
            success : false,
            massage : "brand is requied",
        })
    }
    
    const pro = new Product({
        name:name,
        description : description,
        price : price,
        brand : brand,
    })

    const savedProduct =await pro.save();
    res.json({
        success:true,
        data : savedProduct,
        massage:'Product added successfully',
    })
});

app.get('/product', async(req,res)=>{
    const {name} = req.query;
    const product = await Product.findOne({name:name});
    res.json({
        success:true,
        data:product,
        massage : 'product fectched successfull',
    })
})

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}.`)
})
