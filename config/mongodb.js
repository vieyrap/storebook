import mongoose from "mongoose";
import config from "./index.js";

mongoose.connect(config.DB)
.then(db=>console.log('DB esta conectado'))
.catch(error=>console.log(error))
//tipo fecht()