import './db'
import app from './app';
import dotenv from 'dotenv';
dotenv.config();
import "./models/Video";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log("✅ Listening on : http://localhost:4000/");

app.listen(PORT, handleListening);