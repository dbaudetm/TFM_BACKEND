import mongoose from "mongoose";

const comentarioStructure = mongoose.Schema({

    autorComentario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true,

    },
    autorNombre:{
        type:String,
        required:true

    },
    valoracionComentario:{
        type:Number,
        required:true
    },
    textoComentario:{
        type:String,
        required:true
    },
    Pelicula:{
        type:String,
        required:true

        
    },
    nombrePelicula:{
        type:String,
        required:true

    }
 





},{ timestamps: true })

const Comentario = mongoose.model("Comentario",comentarioStructure)
export default Comentario;