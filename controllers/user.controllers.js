import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import clothesModel from "../models/clothes.model.js";

export const userSignUp = async (req, res) => {
    try {
        // const name = req.body.name;
        // const password = req.body.password;
        // const email = req.body.email;
        const { name, password, email } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User is already exist, you can login", success: false
            })
        }
        const userModel = new UserModel({ name, password, email });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "signUp successfull..",
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: "Error in signUp(back)...",
            success: false
        })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "User don't exit",
                success: false
            })
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
             return res.status(403).json({
                message: "Password failed",
                success: false
            })
        }
        const SecretKey = process.env.SECRET_KEY;
        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, SecretKey, { expiresIn: '24h' });
        res.status(201).json({
            message: "User login success",
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            message: "User login failed...",
            success: false
        })
    }
}

export const purchaseClothes = async () => {
    try {
        const {id} = req.params;
        const email = req.email;
        const user = UserModel.updateOne(
            {
                email,
            }, {
                "$push": {
                    purchaseClothes: id
                }
            }
        ) 

        res.status(201).json({
            message: "Clothes purchased successfully..."
        })
    } catch (error) {
        res.status(403).json({
            message: "not purchased"
        })
    }
}