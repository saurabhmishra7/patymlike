import mongoose from 'mongoose';
import { AccountModel } from '../schema/account.js';


export const getAccountBalance = async (userId) => {
  const user = await AccountModel.find({
    userId: req.userId
  });

  return user?.balance;
}

export const transferAmount = async (beneficiary) => {

  try {
    
  const sessions = await mongoose.startSession();
  sessions.startTransaction();
  const { userId, amount, to } = beneficiary;
   
   // Fetch the accounts within the transaction
   const account = await AccountModel.findOne({ userId: from }).session(session);
   if (!account || account.balance < amount) {
    await session.abortTransaction();
    throw new Error("Insufficient balance")
   }

   const toAccount = await AccountModel.findOne({ userId: to }).session(session);

   if (!toAccount) {
    await session.abortTransaction();
    throw new Error("User does'nt exist in db")
  }
  //Perform the transfer
  await AccountModel.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
  await AccountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

  // Commit the transaction
  await session.commitTransaction();

  } catch (error) {
    await session.abortTransaction();
    throw new Error("Transaction Failed");
  }
}