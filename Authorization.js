import jwt from 'jsonwebtoken'
import Usuario from './models/Usuario.js'
const checkLogin =async (req, res ,next) =>{


    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);




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