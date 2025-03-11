import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import route from './routes/clothes.routes.js';
import userRoute from './routes/user.routes.js';
import deliveryRoute from './routes/delivery.routes.js';
import watchesRouter from './routes/watches.routes.js';
import authRouter from './routes/googleAuth.routes.js';
const app = express();
dotenv.config();
connectDB();


app.use(cors());
app.use(express.json());

app.use("/api/clothes", route);
app.use("/api/user", userRoute);
app.use("/api", deliveryRoute);
app.use("/api/watches", watchesRouter)
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => { console.log(`Server running on ${PORT}`) });
})
