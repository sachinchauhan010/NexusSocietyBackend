import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.js';

const app = express();
const corsOptions = {
  credentials: true,
  origin: ['https://nexussociety.vercel.app', 'http://localhost:5173', 'http://localhost:5174'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],  // Add 'Cookie' to allowed headers
  exposedHeaders: ['set-cookie'],  // Add this line
  preflightContinue: false,
  optionsSuccessStatus: 200
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