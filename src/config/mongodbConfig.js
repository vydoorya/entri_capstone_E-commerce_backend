
import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";


async function mongodbConnection() {
    try{
        await mongoose.connect(serverConfig.db);
        console.log('mongodb connected');
    }catch(err){
        console.log('mongodb not connected');
    }
  

}
export default mongodbConnection