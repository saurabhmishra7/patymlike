import { configEnv } from "../config/config-dev.js";
import jwt from 'jsonwebtoken';

export const verifyToken = async function verifyToken(req, res, next) {
    
    try {
    const token = req.body.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error('Unauthorized ');
    }
      var decoded = jwt.verify(token, configEnv.jwtSecretKey);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      next(error);
    }
}



