import  express  from "express";
import { configEnv } from './config/config-dev.js';
import  {  getMongoose }  from "./db/db.js";
import cors from "cors";
import { router } from "./router/index.js"

const app = express();
app.use(express.json());

app.use(cors({
}));

app.use('/api/v1', router);


async function listen() {
  await getMongoose();
  app.listen(configEnv.port,  () => {
    console.log("Listening on port " + configEnv.port);
  });
}

listen();

export default app;