import express from 'express'
import conectDB from './db.js'
import dotenv  from 'dotenv'
import routingUsuario from './routing/routingUsuario.js'
import cors from 'cors'

//Creación de isntancia
const app = express()
app.use(express.json())
dotenv.config()
conectDB()

const localhost = [process.env.FRONT_URL]
const corsLocalhost = {

origin:function (origin, callback){

    if(localhost.includes(origin)){
        callback(null,true)
    }else{
        callback(new Error("Error de Cors"))
    }


}


}
app.use(cors(corsLocalhost))
app.use('/api/usuarios',routingUsuario)
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{

    console.log(`Servidor corriendo en puerto ${PORT}`)

})