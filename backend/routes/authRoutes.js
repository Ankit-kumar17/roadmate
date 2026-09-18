const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/register",async (req,res) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:"User Already exists",
            });
        }

        const hashedPasssword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,email,password:hashedPasssword,
            
        });
        console.log("user");

        res.status(201).json({
            message: "User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            },
        });
    }
    catch(error) {
        res.status(500).json({
            message:"Server error",
        })
    }
});

router.post("/login", async(req,res) =>{
    try{
        const{email,password} = req.body;
        console.log("login body:", req.body);

        const user = await User.findOne({email});
console.log("user:",user);
        if(!user){
            return res.status(400).json({
                message:"invalid email or password ",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        console.log("pass:",isPasswordCorrect);

  

        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Invalid email or passwword",
            })
        };
        const token =jwt.sign(
            {userId:user._id,
                role:user.role },
           
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.status(200).json({
            message:"login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    }
    catch(error){
        res.status(500).json({
            message:"server error",
        })
        
    }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    console.log("PROFILE ROUTE START");
    console.log("USER ID:", req.user.userId);

    const user = await User.findById(req.user.userId);

    console.log("USER FROM DB:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("PROFILE ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
router.get("/admin", authMiddleware,adminMiddleware, (req,res) => {
    res.status(200).json({
        message:"welcome admin",
        user:req.user,
    });
});
module.exports = router;