import clothesModel from "../models/clothes.model.js";

export const clothesApi = async (req, res) => {
    try {
        const allClothes = await clothesModel.find({});
        res.status(200).json({
            collection: allClothes
        })
    } catch (error) {
        res.status(504).json({
            message: "Items fetching error..."
        })
    }
}

export const bestSeller = async (req, res) => {
    try {
        const allBestseller = await clothesModel.find({
            bestseller: true
        }) 
        res.status(200).json({
            bestSellers: allBestseller
        })
    } catch (error) {
        res.status(504).json({
            message: "bestSellers can't fetched from backend.."
        })
    }
}

export const clotheById = async (req, res) => {
    try {
        const {id} = req.params;
        const byId = await clothesModel.findById(id);
        if (byId) {
            res.status(200).json({
                item: byId
            }) 
        } else {
            res.status(500).json({
                message: "Item don't exist..."
            })
        }
    } catch (error) {
        console.error("Error getting the Item(backend)...")
    }
}
