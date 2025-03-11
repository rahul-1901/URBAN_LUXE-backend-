import { oauth2client } from '../utils/googleConfig.js';
import axios from 'axios';
import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const googleAuth = async (req, res) => {
    try {
        const {code} = req.query;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        )

        const {email, name} = userRes.data;
        let user = await UserModel.findOne({email});
        if(!user) {
            user = await UserModel.create({
                name, email
            })
        }

        const {_id} = user;
        const token = jwt.sign({_id, email}, 
            process.env.SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRE
            }
        )
        return res.status(200).json({
            message: "success",
            token,
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error on server side"
        })
    }
}