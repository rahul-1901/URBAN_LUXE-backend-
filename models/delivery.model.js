import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    phoneNumber: {
        type: Number,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    }, 
    pinCode: {
        type: Number,
        required: true
    },
    houseAddress: {
        type: String,
        required: true
    }, 
    nearAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

const deliveryModel = mongoose.model("delivery", DeliverySchema);

export default deliveryModel;