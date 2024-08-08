import express from 'express'
import userControllers from '../../controllers/userController.js';
const userRouter = express.Router();

userRouter.get('/',userControllers.ping);
userRouter.get('/get-user/:id',userControllers.getUserById);
userRouter.get('/get_all_users',userControllers.getAllUsers);
userRouter.post('/signup',userControllers.signup);
userRouter.post('/signin',userControllers.signin);
userRouter.put('/update/:id',userControllers.updateUser);

export default userRouter;
