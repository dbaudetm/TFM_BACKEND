import conectDB from "../db.js"
import Usuario from "../models/Usuario.js"
import generateToken from "../generatetoken.js"
import generateJsonWebToken from "../generateJsonWebToken.js"
import Comentario from "../models/Comentario.js"
import {emailRegister,emailRecovery} from "./../mail.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const usuarios = (req,res) => {
    res.send("Desde API/USUARIOS")
}




const registerUser =async (req,res) => {

  
    const usuario = new Usuario(req.body)
    
        const {emailUsuario} = req.body
        const existeUsuario = await Usuario.findOne({emailUsuario})

        if(existeUsuario != undefined ){
            console.log("error ya existe el usuario")
          
            
            return res.json({error: "El Usuario ya existe"})
        }else{

            try{
               
                const token = generateToken()
                console.log("Generacion del token: "+token)
                usuario.tokenUsuario = token
                const usuarioAlmacenado = await usuario.save()
                emailRegister(usuario.nombreUsuario, usuario.emailUsuario , usuario.tokenUsuario)
                console.log(usuario)
                return res.json({mesage:"Usuario, creado se ha enviado correo, sino encuentra el correo mire en la bandeja de Spam"})
                
            }catch(error){
               
            
               return res.json({error:"Error Creación usuario"})
         
            }

            return res.json({error:"Error"})


        }
            
}


const deleteUser = async (req, res)=>{

    console.log(req.body)
    try{

        const user = new Usuario()
        const existeUsuario = await Usuario.findById(req.body.id)
        console.log(req.body)
        console.log(req.body.password)
        console.log(existeUsuario)


        if(existeUsuario != undefined){
                console.log("aqui entro")
            if(await existeUsuario.comprobarPassword(req.body.con, existeUsuario.passwordUsuario)){

                console.log("Es correcto")
                const salida = await Comentario.find({ $and: [{autorComentario: existeUsuario._id}] })
                console.log(salida[0])

                if(salida.length > 0 ){
                
                    for(var i = 0 ; i < salida.length ;i++){

                        console.log(salida[i]._id)
                        await Comentario.deleteOne( salida[i] )
                  
                    } 

                }
                await Usuario.findByIdAndDelete({ _id:  existeUsuario._id  });
                return res.json({mesage:"Se ha borrado"})
                
        
        
            }else{
                console.log("No es correcto")
                return res.json({error:"Contraseña erronea"})
            }



        }else{


            return res.json({error:"No se a encontrado el usuario"})


        }


    }catch(error){
               
            
        res.json({error:"402"})
 
    }

    

}

const updateUser = async (req, res)=>{

    console.log("Llegue")
    console.log(req.body)
    try{



        const user = new Usuario()
        const existeUsuario = await Usuario.findById(req.body.id)
     


        if(existeUsuario != undefined){
           
            if(await existeUsuario.comprobarPassword(req.body.con, existeUsuario.passwordUsuario)){


                 

                if(req.body.connueva != undefined && req.body.connueva != ""){



                    const jumps = await bcrypt.genSalt(15)
                    existeUsuario.passwordUsuario = await bcrypt.hash(req.body.connueva,jumps)

                }
                    
                    if(existeUsuario.emailUsuario != req.body.correo){
                        const salidaCorreo = await Usuario.find({ emailUsuario: { $in: req.body.correo } })

                        if(salidaCorreo.length == 0 ){

                            existeUsuario.emailUsuario = req.body.correo

                        }else{

                            return res.json({error:"Error, existe un usuario con ese correo"})

                        }
                    }
                    
                    if(existeUsuario.nombreUsuario != req.body.nombre){
                    const salidaNombre = await Usuario.find({ nombreUsuario: req.body.nombre } )
                    console.log("Esto no funciona")
                    console.log(salidaNombre)
                    console.log(salidaNombre.length)
                    if(salidaNombre.length == 0 ){

                         
                        const comentario = await Comentario.find({ $and: [{autorComentario: existeUsuario._id} ] });
                        if(comentario.length > 0){

                            for(var i = 0 ; i < comentario.length ;i++){
                                comentario[i].autorNombre = req.body.nombre
                                comentario[i].save()
                            } 
          


                        }
                        existeUsuario.nombreUsuario = req.body.nombre


                    }else{

                        return res.json({error:"Error, existe un usuario con ese nombre de usuario"})

                    }

                    }

                    existeUsuario.save()

                

                return res.json({mesage:"Se ha actualizado"})
                
        
        
            }else{
          
                return res.json({error:"Contraseña erronea"})
            }



        }else{


            return res.json({error:"No se a encontrado el usuario"})


        }



    }catch(error){
               
            
        res.json({error:"Error al actualizar"})
 
    }




}




const user = async(req,res)=>{



    console.log(req.headers.authorization)  
    const token = req.headers.authorization.replace("Bearer ","")
    const traducido  = jwt.verify(token, process.env.jwt)
    const usuario = await Usuario.find({ _id: traducido.id});
    console.log(usuario[0])
    if(usuario != undefined){

       return res.json(usuario[0])

    }

    return res.send('No existe')




}


const userData = async(req,res)=>{

    const _id = req.body.id
    console.log("userData")
    console.log(_id)
    const usuario = await Usuario.find({ _id: _id}).select("-passwordUsuario -tokenUsuario -confirmado");
    console.log(usuario[0])
    if(usuario != undefined){

       return res.json(usuario[0])

    }

    return res.send('No existe')




}





const login = async (req,res) =>{

    console.log(req.body)
    const {emailUsuario} = req.body
    const existeUsuario = await Usuario.findOne({emailUsuario})
    console.log(existeUsuario)
    if(existeUsuario === undefined || existeUsuario === null){
        console.log("error no existe el usuario")
        return res.json({error:"Usuario no registrado"})
    }
    if(existeUsuario.confirmado === false){
        console.log("error usuario no está confirmado")
        return res.json({error:"Usuario no confirmado"})
    }
    const user = new Usuario(req.body)
    const {correoUsuario, passwordUsuario} = req.body


    if(await user.comprobarPassword(passwordUsuario, existeUsuario.passwordUsuario)){

        console.log("Es correcto")
        console.log(""+existeUsuario['_id'])
        const token = ""+existeUsuario['_id']
        return res.json({token: generateJsonWebToken(token)})
        


    }else{
        console.log("No es correcto")
        return res.json({error:"Error contraseña"})
    }

    return res.json({error:"Error login"})

}


const confirmUser = async (req,res) => {



   const {tokenUsuario} = req.params
   const confirmar = await Usuario.findOne({tokenUsuario})
   
 
   if(!confirmar){
    console.log("Token no valido")
   const error = new Error("Token no valido")

   return res.json({mesage:"Token no confirmado"})
   }

   console.log(confirmar)
   confirmar.confirmado = true
   confirmar.tokenUsuario = ""
   await confirmar.save()
    return res.json({mesage:"Usuario confirmado"})
 

}


const confirmUser2 = async (req,res) => {



    const {tokenUsuario} = req.params
    const confirmar = await Usuario.findOne({tokenUsuario})
    
  
    if(!confirmar){
     console.log("Token no valido")
    const error = new Error("Token no valido")
 
    return res.json({mesage:"Token no confirmado"})
    }
 
    console.log(confirmar)
    
     return res.json({mesage:"Usuario confirmado"})
  
 
 }



const recoveryPassword = async (req,res) => {



    console.log(req.body.email)
    const email = req.body.email
    console.log(email)
   


    const existeUsuario = await Usuario.findOne({ $and: [{emailUsuario: email} ] });
    console.log(existeUsuario)
    if(existeUsuario != undefined){


        existeUsuario.tokenUsuario = generateToken()
        await existeUsuario.save()

        emailRecovery(existeUsuario.nombreUsuario,email,existeUsuario.tokenUsuario)

 
        return res.json({mesage:"Se ha enviado un correo para definir el nuevo password, sino encuentra el correo mire en la bandeja de Spam"})



    }






    return res.json({mesage:"Error de generación de token"})



    


}

const newPassword = async (req,res) => {


    const {token} = req.params
    console.log(token)
    console.log(req.body)
    const existeUsuario = await Usuario.findOne({$and: [{tokenUsuario: token} ] })

    const passwordUsuario = req.body.pass

    console.log(existeUsuario)
    console.log(passwordUsuario)

    if(existeUsuario === undefined){
     
           return res.json({error:"Usuario no existe"})

    }

    existeUsuario.passwordUsuario =passwordUsuario
    existeUsuario.tokenUsuario = ''
    await existeUsuario.save()

    return res.json({mesage:"Contraseña modificada"})



    


}


const profile = async (req,res) => {

    console.log("Desde el perfil")
    console.log(req.usuario)
    const {usuario} = req
    return res.json(usuario)

}




export {
    usuarios,
    registerUser,
    confirmUser,
    login,
    recoveryPassword,
    newPassword,
    profile,
    user,
    deleteUser,
    updateUser,
    confirmUser2,
    userData
}