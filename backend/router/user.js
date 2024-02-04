import { Router } from "express";
import { getAccountBalanceController, getBulkUserController, userSignInController, userSignUpController, userUpdateInfoController } from "../controller/userController.js";
import { validateUserSignInDetails, validateUserSignUpDetails } from "../middleware/validator.js";
import { verifyToken } from "../middleware/auth.js";

export const userRouter = Router();

userRouter.post('/signUp', validateUserSignUpDetails, userSignUpController);
userRouter.post('/signIn', validateUserSignInDetails, userSignInController);
userRouter.put('/update', verifyToken, userUpdateInfoController);
userRouter.get('/bulk', verifyToken, getBulkUserController);
userRouter.get('/balance', verifyToken, getAccountBalanceController);

