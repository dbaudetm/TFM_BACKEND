import jwt from 'jsonwebtoken'
import Usuario from './models/Usuario.js'
const checkLogin =async (req, res ,next) =>{

if(req.headers.authorization && req.headers.authorization.includes("Bearer")){

    try{

     
        const token = req.headers.authorization.replace("Bearer ","")
        const traducido  = jwt.verify(token, process.env.jwt)
   
        req.usuario = await Usuario.findById(traducido.id).select("-passwordUsuario -tokenUsuario -confirmado")
        return next()
    }catch(error){
        return res.status('404').json({message:"Error de token de acceso"})

    }

  

}   

return res.status('404').json({message:"Error de token de acceso"})

}
export default checkLogin