import mongoose from "mongoose";

const clothesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    },
    category: {
        type: String
    }, 
    subCategory: {
        type: String
    },
    date: {
        type: Number
    },
    bestSeller: {
        type: Boolean
    },
    sizes: {
        type: Array
    }
})

const clothesModel = mongoose.model("clothes", clothesSchema);

export default clothesModel;