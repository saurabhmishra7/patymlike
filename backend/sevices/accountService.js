import mongoose from 'mongoose';
import { AccountModel } from '../schema/account.js';


export const getAccountBalance = async (userId) => {
  const user = await AccountModel.findOne({
    userId: userId
  });

  return user?.balance;
}

export const transferAmount = async (beneficiary) => {

  try {
    //Depict ACID 
  const sessions = await mongoose.startSession();
  sessions.startTransaction();
  const { userId, amount, to } = beneficiary;
   
   // Fetch the accounts within the transaction
   const account = await AccountModel.findOne({ userId: userId }).session(sessions);
   if (!account || account.balance < amount) {
    await sessions.abortTransaction();
    throw new Error("Insufficient balance")
   }

   const toAccount = await AccountModel.findOne({ userId: to }).session(sessions);

   if (!toAccount) {
    await sessions.abortTransaction();
    throw new Error("User does'nt exist in db")
  }
  //Perform the transfer
  await AccountModel.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(sessions);
  await AccountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(sessions);

  // Commit the transaction
  const res = await sessions.commitTransaction();
  return res;

  } catch (error) {
    await session.abortTransaction();
    throw new Error("Transaction Failed");
  }
}