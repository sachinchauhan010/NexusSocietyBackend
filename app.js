import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/event.js';

const app = express();
const corsOptions = {
  credentials: true,
  origin: ['https://nexussociety.vercel.app', 'http://localhost:5173', 'http://localhost:5174'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // preflightContinue: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes);

app.get('/', (req, res) => {
  res.send("Backend is up and running")
})

export default app;