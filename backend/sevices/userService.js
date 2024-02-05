import { AccountModel } from '../schema/account.js';
import { UserModel } from '../schema/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { configEnv } from '../config/config-dev.js';


export const userSignup = async function userSignUp(userSignUpDetails) {
  
   try {
    const {
      username,
      firstName,
      lastName,
      password
     } = userSignUpDetails;

     const encryptPass =  await encryption(password);

     const res = await UserModel.create({
      username,
      firstName,
      lastName,
      password: encryptPass
     });


     const userId = res._id;
     const token = jwt.sign({
         userName: username,
         userId
       },
       configEnv.jwtSecretKey
     );
     
     /// ----- Create new account ------
     res.token = token;
     await AccountModel.create({
         userId,
         balance: 1 + Math.random() * 10000
     });

     return {
      token: token,
      username: res?.username,
      userId: res?._id
     };
   } catch (error) {
      throw new Error("User not inserted successfully");
   }

}

export const userSignIn = async function userSignIn(userSignDetails) {
    try { 
      const username = userSignDetails.username;
      const password = userSignDetails.password;
  
      if (!(username && password)) {
        throw new Error(message.inputRequired);
      }
  
      const user = await verifyUser(username);
      const verifyPassword = await bcrypt.compare(password, user.password);
  
      if (!(user && verifyPassword)) {
        throw new Error(message.invalid);
      }
  
      const token = jwt.sign(
        {
          userName: username,
          userId: user?._id
        },
        configEnv.jwtSecretKey
      );
      
      return {
        token: token,
        username: user?.username,
        userId: user?._id
       };
    } catch (error) {
      throw new Error("Authentication failed")
    }
}

export const userUpdateInfo = async function userSignUp(userDetails) {
    try {
      const res = await UserModel.updateOne(({
        username: userDetails?.userName
      }, userDetails ));

      return res;
    } catch (error) {
      throw new Error("Issue in update of userDetails");
    }
}

export const verifyUser = async function verifyUser(username) {
  try {
    const res = await UserModel.findOne({ 
        username: username,
      });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const encryption = async function encryption(password) {
  return await bcrypt.hash(password, 10);
}

export const getBulkUser = async function getBulkUser(userName) {
  
  const res = await UserModel.find({
    $or: [{
      firstName: {
        "$regex": userName || ""
      }
    }, {
      lastName: {
        "$regex": userName || ""
      }
    }]
  });

  return res;
}

