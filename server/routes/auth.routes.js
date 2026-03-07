import express from "express"
const router = express.Router()
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import userModel from "./models/user.model"

// POST /auth/signup - Creates a new user in the database
router.post("/signup", async (req, res)=>{
    try {
    const {username, email, password} = req.body
    if (!username || !email || !password){
        return res.status(400).json({message: "Please provide all info"})
    }

    const foundUser = await userModel.findOne({ $or: [{email}, {username}]})
    if (foundUser) {
        return res.status(400).json({message: "Email of username already taken"} )
    }

    if (!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$",)){
return res.status(400).json({message: "Password needs at least 8 characters, and numbers"})
    }
    
    const salts = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salts)
   
    const createdUser = await userModel.create({
        username, email, password: hashedPassword
    })
return res.status(201).json({message: "User created"}, createdUser)

    } catch (error) {
        consolelog(error)
        return res.status(500).json(error)
    }
}
)



// POST /auth/login - Checks the sent email and password and, if email and password are correct returns a JWT

// GET /auth/verify - Verifies that the JWT sent by the client is valid

// GET /api/users/:id - Retrieves a specific user by id. The route should be protected by the authentication middleware.
export default router