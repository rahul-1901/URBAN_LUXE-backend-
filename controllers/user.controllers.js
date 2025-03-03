import UserModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
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

export const purchaseClothes = async (req, res) => {
    try {
        const { id } = req.params; 
        const  email  = req.email;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!Array.isArray(user.purchaseClothes)) {
            user.purchaseClothes = [];
        }

        let itemExists = false;
        user.purchaseClothes = user.purchaseClothes.map((item) => {
            if (item && item._id && item._id.toString() === id) {
                item.count += 1;
                itemExists = true;
            }
            return item;
        });

        if (!itemExists) {
            user.purchaseClothes.push({_id: id, count: 1});
        }

        await user.save();

        return res.status(201).json({
            message: "Clothes purchased successfully!",
            purchasedClothes: user.purchaseClothes
        });

    } catch (error) {
        return res.status(500).json({ message: "Purchase failed" });
    }
}

export const purchasedItems = async (req, res) => {
    try {
        const email = req.email;
        await UserModel.findOne({
            email
        })
        .then(async (value) => {
            if(value) {
                const allUserDress = await clothesModel.find({
                    _id: {
                        "$in": value.purchaseClothes
                    }
                })
                return res.status(201).json({
                    purchasedDress: allUserDress
                })
            } else {
                return res.status(403).json({
                    message: "Error geting purchaded"
                })
            }
        })
    } catch (error) {
        return res.status(403).json({
            message: "error"
        })
    }
}

export const deleteClothes = async (req, res) => {
    try {
        const email = req.email;
        const {id} = req.params;
        const user = await UserModel.findOne({
            email
        })

        if(!user) {
            return res.status(403).json({
                message: "User not found..."
            })
        }

        let itemDeleted = false;
        user.purchaseClothes = user.purchaseClothes.map((item) => {
            if(item._id.toString() === id) {
                if(item.count > 1) {
                    item.count -= 1;
                } else {
                    itemDeleted = true;
                    return null;
                }
            }
            return item;
        }).filter(Boolean)
        await user.save();

        return res.status(200).json({
            message: itemDeleted ? "Item deleted successfully..." : "One item removed..."
        })
    } catch (error) {
        return res.status(403).json({
            message: "Facing Error..."
        })
    }
}

export const userDetails = async (req, res) => {
    try {
        const email = req.email;
        const user = await UserModel.findOne({
            email
        })

        if(!user) {
            return res.status(403).json({
                message: "User not found..."
            })
        }

        res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(403).json({
            message: "Error backend for userInfo!!"
        })
    }
}