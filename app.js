import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.js';

const app = express();
const corsOptions = {
  credentials: true,
  origin: ['https://nexussociety.vercel.app', 'http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  sameSite: 'none',
  secure: process.env.NODE_ENV === 'production'
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send("Backend is up and running")
})

export default app;