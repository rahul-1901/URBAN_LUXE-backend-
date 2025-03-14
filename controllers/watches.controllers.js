import WatchesModel from "../models/watches.model.js";

export const WatchesCollection = async (req, res) => {
    try {
        const allWatches = await WatchesModel.find({});
        return res.status(200).json({
            allWatches
        })
    } catch (error) {
        return res.status(500).json({
            message: "error getting watches."
        })
    }
}