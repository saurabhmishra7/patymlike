import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { getAccountBalanceController, transferAmountController } from "../controller/accountController.js";


export const accountRouter = Router();


accountRouter.post('/transfer', verifyToken, transferAmountController);
accountRouter.get('/balance', verifyToken, getAccountBalanceController);