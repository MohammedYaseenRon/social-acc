import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); 


app.get('/', (req,res) => {
    res.send("Server is running")
})

app.use('/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})