import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log(con.connection.host);
    }
    catch(error){
        console.log(error);
        process.exit(1);//1 = error 0 = success
    }
}