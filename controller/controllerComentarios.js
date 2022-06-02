import Pelicula from "../models/Pelicula.js"
import Comentario from "../models/Comentario.js"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";


const createComent =async (req, res) => {


    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);



    
    try{
    const autorNombre = req.body.autorNombre
    const autorComentario = req.body.autorComentario 
    const valoracionComentario = parseInt( req.body.valoracionComentario)
    const textoComentario = req.body.textoComentario
    const pelicula = req.body.Pelicula
    const peliculaNombre = req.body.nombrePelicula

    console.log(autorComentario,valoracionComentario,textoComentario,pelicula,peliculaNombre,autorComentario)
    
    const comentarioBuscado = await Comentario.find({ $and: [{autorComentario: autorComentario}, {Pelicula:pelicula} ] })
    console.log(comentarioBuscado)
 
    if(comentarioBuscado == undefined || comentarioBuscado.length == 0){
        
        const comentario  = new Comentario()
        comentario.autorComentario = autorComentario
        comentario.valoracionComentario = valoracionComentario
        comentario.textoComentario = textoComentario
        comentario.Pelicula = pelicula
        comentario.nombrePelicula = peliculaNombre
        comentario.autorNombre = autorNombre

        
        const comentarioAlmacenado = await comentario.save()
        return res.json(comentarioAlmacenado)

     }

   return res.json({error:"El usuario ya escrito un comentario"})
   
    }catch(error){
        const message = {error:"hubo un error no se ha podido borrar"}
        return res.json(message)
    }
}

const deleteComent = async (req,res) => {


    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);



    try{
        const comentarioEntrada = req.body
        console.log(comentarioEntrada._id)
        const comentario = await Comentario.find({ $and: [{autorComentario: comentarioEntrada.autorComentario}, {Pelicula:comentarioEntrada.Pelicula} ] });
        console.log("hola")
        console.log(comentario)
        
      
        if(comentario != undefined){
     
    
            if(comentario[0].autorComentario.valueOf() == comentarioEntrada.autorComentario){
      
    
                await Comentario.findByIdAndDelete({ _id:  comentario[0]._id  });
                const message = {mesage:"Se ha podido borrar"}
                return res.json(message)
    
            }
    
        }

        const message = {error:"No se ha podido borrar"}
        return res.json(message)
    }catch(error){
        const message = {error:"Error al borrar"}
        return res.json(message)
    }
    
} 


const updateComent = async (req,res) => {


    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);





    try{
    
    const comentarioEntrada = req.body




    const comentario = await Comentario.findById({ _id:  comentarioEntrada._id  });
    const peli = await Pelicula.findById({ _id:  comentarioEntrada.Pelicula  });
    if(comentario != undefined && peli != undefined){


        if(comentario.autorComentario.valueOf() == comentarioEntrada.autorComentario){


            comentario.valoracionComentario= comentarioEntrada.valoracionComentario
            comentario.textoComentario = comentarioEntrada.textoComentario
            const actualizado = await comentario.save() 
            console.log(actualizado)
            const message = {mesage:" se ha podido actualizar"}
            return res.json(message)

        }

    }

    const message = {error:"No se ha podido actualizar"}
            return res.json(message)
    

}catch(error){
    const message = {error:"No se ha podido actualizar, hubo un error"}
    return res.json(message)

}

}


const searchComent =async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);




try{
    const _id = req.body._id
    const comentario = await Comentario.findById({ _id:  _id  });
    if(comentario != undefined){
       return res.json(comentario)
    }
    const message = {mesage:"No se encontro comentario"}
            return res.json(message)
}catch(error){
    const message = {error:"No se ha podido actualizar, hubo un error"}
    return res.json(message)

}

}



















const searchComentByUser =async (req, res) => {


    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);





    try{

        const _id = req.body.id
        const comentario = await Comentario.find({ $and: [{autorComentario: _id}] });
        res.json(comentario)
    }catch(error){
        const error2 = new Error("No se ha encontrado los documentos")
        return res.status(400).json({mensaje:error2.message})
    }
    
    }


 





    const searchComentByFilm =async (req, res) => {



        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);





        try{
            console.log("Coment by film")
            const Pelicula  = req.query.Pelicula
            const comentario = await Comentario.find({ Pelicula:  Pelicula  });
            return res.json(comentario)
        }catch(error){
            const error2 = new Error("No se ha encontrado los documentos")
            return res.status(400).json({mensaje:error2.message})
        }
        
        }




export {

    createComent,
    deleteComent,
    updateComent,
    searchComent,
    searchComentByUser,
    searchComentByFilm



}