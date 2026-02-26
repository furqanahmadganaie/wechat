 import express from 'express'
import dotenv from 'dotenv'
// import path from 'path'
import cookieParser from 'cookie-parser';
import cors from 'cors';
//import authroutes
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDB from './db/connectToMongoDB.js';
import {app, server} from './socket/socket.js'

app.use(cors({
    origin:"http://localhost:5173"
}));



dotenv.config();

const PORT = process.env.PORT || 3001;
//middlewares
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
//message route
app.use('/api/messages',messageRoutes);
//user routes
app.use('/api/users',userRoutes);





server.listen(PORT,()=> {
    connectToMongoDB();
     console.log(`server running on port ${PORT}`)
});












