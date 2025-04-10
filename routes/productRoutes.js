const express=require('express')
const router=require('router')
const product = require('../models/product')

router.post('/add',async(req,res)=>{
        try{
            const {productName,productPrice,productUnit,productDesciption}=req.body
            const productExist=await User.findOne({productName})
            if(productExist){
                return res.json({status:false,message:'Product already exist'})
                
            }
            const projectObj=new User({productName,productPrice,productUnit,productDesciption})
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

router.length('/get',async(req,res)=>{
    try{
        const results=await product.find()
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