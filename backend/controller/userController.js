import { userSignup, userSignIn, userUpdateInfo, getBulkUser } from '../sevices/userService.js'

export const userSignUpController = async (req, res) => {
  try {
    const result = await userSignup(req.body);
    res.send({
      message: "Sucessfully Registered",
      userDetails: result
    });
  } catch (error) {
    res.sendStatus(500);
  }
}

export const userSignInController = async (req, res) => {
  try {
    const result = await userSignIn(req.body);
    res.send({
      message: "Sucessfully log in",
      userDetails: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Unauthorizes",
      error: error
    });
  } 
}

export const  userUpdateInfoController = async (req, res) => {
  try {
    const token = await  userUpdateInfo(req.body);
    res.json({
      message: "Successfully Updated"
    })
  } catch (error) {
    res.status().json({
      message: "Issue in updation",
      error: error
    });
  } 
}


export const getBulkUserController = async (req, res) => {
  try {
    const users = await  getBulkUser(req?.query?.filter);
    res.json({
      users: users.map(user => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }))
  })
  } catch (error) {
    res.status(500).json({
      message: "Issue in getBulkUser",
      error: error
    });
  }
}

export const getAccountBalanceController = async (req, res) => {
  try {
    const users = await  getAccountBalance(req?.userId);
    res.json({
      user: users.map(user => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }))
  })
  } catch (error) {
    res.status().json({
      message: "Issue in getBulkUser",
      error: error
    });
  }
}