const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User=require('./models/User')
const productRoutes=require('./routes/productRoutes.js')

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use('/Product',productRoutes)

mongoose.connect('mongodb+srv://vaishnavi:Vaishu%402004@leadsoft.zpqewrz.mongodb.net/?retryWrites=true&w=majority&appName=leadsoft').then(() =>
    console.log('Database Connected')).
    catch((err) => console.log(err))

    server.post('/register',async(req,res)=>{
        try{
            const {fullName,userName,age,password}=req.body
            const userExist=await User.findOne({userName})
            if(userExist){
                return res.json({status:false,message:'User already exist'})
                
            }
            const userObj=new User({fullName,userName,age,password})
            await userObj.save()
            res.json({
                status:true
            })
        }
        catch(err){
            res.json({
                status:false,
                message:`Error${err}`
            })

        }
    })

    server.post('/login',async(req,res)=>
    {
        try{
            const{userName,password}=req.body
            const userExist=await User.findOne({userName})
            if(!userExist){
                return res.json({ 
                    status:false,
                    message:'User not found'
                })
            }
            if(password!==userExist.password){
                return res.json({
                    status:false,
                    message:'Password incorrect'
                })
            }
            res.json({
                status:true,
                message:"Login Successfully"
            })
        } 
        catch(err){
            res.json({
                status:false,
                message:`Error${err}`
            })
        }
    })

server.listen(8055, () => {
    console.log('Server listen on port 8055')
})

