import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import clothesModel from './models/clothes.model.js';
import route from './routes/clothes.routes.js';
import userRoute from './routes/user.routes.js';
import bcrypt from 'bcrypt';
import deliveryRoute from './routes/delivery.routes.js';
const app = express();
dotenv.config();
connectDB();


app.use(cors());
app.use(express.json());

app.use("/api/clothes", route);
app.use("/api/user", userRoute);
app.use("/api", deliveryRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the E-commerce API!");
});

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => { console.log(`Server running on ${PORT}`) });
})
