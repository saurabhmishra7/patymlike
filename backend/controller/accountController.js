import { getAccountBalance, transferAmount } from '../sevices/accountService.js';



export const getAccountBalanceController = async (req, res) => {
  const balance = await getAccountBalance(req?.userId);
  res.json({
    balance
  });
}


export const transferAmountController = async (req, res) => {

  try {
    const beneficiary = {
      userId: req?.userId,
      to: req?.body?.to,
      amount: req?.body?.amount
    };
    await transferAmount(beneficiary);
    res.json({
      message: "Transaction done sucessfully"
    })
  } catch (error) {
    throw new Error("Transaction Failed");
  }
}
