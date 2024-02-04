import config from "dotenv";
config.config();
export const configEnv = {
   mongoUri: process.env.MONGO_URI,
   mongoUserName: process.env.MONGO_USERNAMEsas,
   mongoPassword: process.env.MONGO_PASSWORD,
   port: process.env.PORT,
   jwtSecretKey: process.env.JWT_SECRET_KEY
};