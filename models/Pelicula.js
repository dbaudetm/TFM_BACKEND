import mongoose from "mongoose";

const peliculaStructure = mongoose.Schema({

    tituloPelicula:{
        type:String
    },
    posterPelicula:{
        type:String
    },
    tituloOriginalPelicula:{
        type:String
    },
    generosPelicula:[String],
    fechaPelicula:{
        type:String
    },
    sinopsisPelicula:{
        type:String
    },
    idiomasPelicula:[String]

})

const Pelicula = mongoose.model("Pelicula",peliculaStructure)
export default Pelicula;