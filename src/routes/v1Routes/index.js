import express from 'express';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import orderRouter from './orderRouter.js';

const v1Router = express.Router();
v1Router.use("/user",userRouter);
v1Router.use("/product",productRouter);
v1Router.use("/order",orderRouter);


export default v1Router;