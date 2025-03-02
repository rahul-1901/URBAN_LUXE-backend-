import UserModel from "../models/user.model.js";
import deliveryModel from "../models/delivery.model.js";

export const deliveryInfo = async (req, res) => {
    try {
        const email = req.email;
        const user = await UserModel.findOne({
            email
        })

        if(!user) {
            return res.status(403).json({
                message: "User not found"
            })
        }

        const { firstName, lastName, phoneNumber, State, Country, pinCode, houseAddress, nearAddress, city } = req.body;


        let deliveryRecord = await deliveryModel.findOne({
            email
        })

        if(deliveryRecord){
            return res.status(200).json({
                message: "Info already there..."
            })
        } else {
            deliveryRecord = await deliveryModel.create({
                email,
                phoneNumber,
                firstName,
                lastName,
                State,
                Country,
                pinCode,
                nearAddress,
                houseAddress,
                city
            })
        }

        return res.status(201).json({
            message: "Information Submitted Successfully...",
            delivery: deliveryRecord
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Error delivery"
        })
    }
}

export const deliveryDetails = async (req, res) => {
    try {
        const email = req.email;
        const user = await UserModel.findOne({
            email
        })

        if(!user) {
            return res.status(403).json({
                message: "User not found, Please login...."
            })
        }

        const orderForm = await deliveryModel.findOne({
            email
        })

        return res.status(200).json({
            orderForm
        })
    } catch (error) {
        return res.status(403).json({
            message: "Error getting OrderInfo from backend..."
        })
    }
}

