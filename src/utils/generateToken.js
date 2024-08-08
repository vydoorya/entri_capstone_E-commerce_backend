import jwt from "jsonwebtoken"
import serverConfig from "../config/serverConfig.js"
function generateToken(username){
    jwt.sign({name:username}, serverConfig.token, { expiresIn: '1d' });
}

export default generateToken;