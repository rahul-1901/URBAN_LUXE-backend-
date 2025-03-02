import mongoose from "mongoose";
import clothesModel from "./clothes.model.js";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, purchaseClothes: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "clothesModel" },
            count: { type: Number, default: 1 }
        }
    ]
})

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;