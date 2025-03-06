import mongoose from "mongoose";

const WatchesSchema = new mongoose.Schema({
    titles: {
        type: String,
    },
    brand_names: {
        type: String,
    },
    images_links: {
        type: String
    },
    prices: {
        type: String
    },
    offers: {
        type: String
    },
    Gender: {
        type: String
    },
    Type: {
        type: String
    }
})

const WatchesModel = mongoose.model("watches", WatchesSchema);

export default WatchesModel;