import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import vehicleRoutes from "./routes/vehicleRoutes";
import shopRoutes from "./routes/shopRoutes";



dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const sessionSecret = process.env.SESSION_SECRET || 'defaultSecret';

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: sessionSecret
}))

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));


app.set('view engine', 'ejs');

app.use('/api/auth', authRoutes);
app.use('/api/users',profileRoutes);
app.use('/api/shop',shopRoutes);
app.use('/api/vehicles',vehicleRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
