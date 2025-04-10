const express=require('express')
const router=express.Router()
const Product = require('../models/Product.js')

router.post('/add',async(req,res)=>{
        try{
            const {productName,productPrice,productUnit,productDescription}=req.body
            const productExist=await Product.findOne({productName})
            if(productExist){
                return res.json({status:false,message:'Product already exist'})
                
            }
            const projectObj=new Product({productName,productPrice,productUnit,productDescription})
            await projectObj.save()
            res.json({
                status:true,
                message:'Product added Succssfully'
            })
        }
        catch(err){
            res.json({
                status:false,
                message:`Error${err}`
            })

        }
})

router.get('/get',async(req,res)=>{
    try{
        const results=await Product.find()
        return res.json({
            status:true,
            message:results
        })

    }
    catch(err){
        res.json({
            status:false,
            message:`Error${err}`
        })

    }

})


module.exports=router