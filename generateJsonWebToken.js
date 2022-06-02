import jwt from "jsonwebtoken"


const generateJsonWebToken = (id) =>{

    return jwt.sign({id}, process.env.jwt, {

        expiresIn:"10d"

    })



}

export default generateJsonWebToken