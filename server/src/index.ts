import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes'
import paymentRoutes from './routes/paymentRoutes'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({limit: "10mb"})); 
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // For form data



app.get('/', (req,res) => {
    res.send("Server is running")
})

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use("/payment", paymentRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})