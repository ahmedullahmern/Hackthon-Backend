import express from 'express';
import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import sendResponse from '../helpers/sendResponse.js';
import { loginSchema, registerSchema } from '../validation.js/authvalidation.js';
import User from '../models/auth.js';
const router = express.Router()


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Dummy data for hackathon
        const users = [
            { email: "saylani@admin.com", password: "saylani123", role: "admin" },
            { email: "saylani@receptionist.com", password: "saylani123", role: "receptionist" },
            { email: "saylani@department.com", password: "saylani123", role: "department" }
        ];

        // Find user
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) return res.status(401).send({ message: "Invalid credentials" });

        sendResponse(res, 201, user, false, "User Login SuccessFully");
    } catch (error) {
        console.log("errorr=>", error)
        sendResponse(res, 400, null, false, error.message);
    }
});



// router.post("/login", async (req, res) => {
//     const { error, value } = loginSchema.validate(req.body);
//     if (error) return sendResponse(res, 400, null, true, error.message)
//     const user = await User.findOne({ email: value.email }).lean()
//     if (!user) return sendResponse(res, 403, null, true, "User not Registered.")
//     const isPasswordValid = await bcrypt.compare(value.password, user.password)
//     if (!isPasswordValid) return sendResponse(res, 403, null, true, "Invalid  Credentails")
//     var token = jwt.sign(user, process.env.AUTH_SECRET);
//     sendResponse(res, 200, { user, token }, false, "User Login successfully")
// })

export default router