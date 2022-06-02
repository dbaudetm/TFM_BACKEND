import mongoose from "mongoose";
import bcrypt from "bcrypt"


const usuarioSchema = mongoose.Schema({

    nombreUsuario:{
        type:String,
        required:true,
        trim:true
    },
    passwordUsuario:{
        type:String,
        required:true,
        trim:true
    },
    emailUsuario:{
        type:String,
        required:true,
        trim:true,
        unique: true
    },
    tokenUsuario:{
        type:String
    },
    confirmado:{
        type:Boolean,
        default:false
    },
    arraySeguimiento: [{
        nombre:String,
        id:String
    }],
    arrayVistas: [{
        nombre:String,
        id:String
    }]




})



usuarioSchema.pre('save',async function(next){

    if(!this.isModified("passwordUsuario")){
        next()
    }
    const jumps = await bcrypt.genSalt(15)
    console.log("contraseña "+this.passwordUsuario)
    this.passwordUsuario = await bcrypt.hash(this.passwordUsuario,jumps)
 



})


usuarioSchema.methods.comprobarPassword = async function (candidatePassword, passwordUsuario) { 
    console.log("contraseña entrada "+candidatePassword) 
    console.log(this.passwordUsuario)
    const resultado = await bcrypt.compare(candidatePassword, passwordUsuario);
    return resultado
 

}

const Usuario = mongoose.model("Usuario",usuarioSchema)
export default Usuario