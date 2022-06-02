import conectDB from "../db.js"
import Pelicula from "../models/Pelicula.js"
import Usuario from "../models/Usuario.js";
import fetch from 'node-fetch'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'






const searchMongo = async(qwery) =>{

    const existePelicula = await Pelicula.find({ 'tituloPelicula': {$regex: qwery} }).limit(20)
    return existePelicula

}




const searchFilm = async (req,res) => {

    const {qwery} = req.params
    if(qwery != undefined){
        
        

        const existePelicula = await searchMongo(qwery)

        if( existePelicula != null && existePelicula != undefined && existePelicula.length != 0){
        
            return res.json(existePelicula)

        }else{

          
             
                const search  = await fetch("https://api.themoviedb.org/3/search/movie?api_key="+process.env.MovieDataBase+"&language=es-SP&query="+qwery+"&page=1&include_adult=false")
                const data = await search.json()
                
            if(data.total_results != 0){
    
                data.total_pages
                var array = []
                for (var k = 1 ; k < data.total_pages+1 ; k++){
                    const item = await fetch("https://api.themoviedb.org/3/search/movie?api_key="+process.env.MovieDataBase+"&language=es-SP&query="+qwery+"&page="+k+"&include_adult=false")
                
                    const item2 =  await item.json()
                    array[k] = item2
                    for(var i = 0; i < item2.results.length; i++) {
                                    var obj = item2.results[i];
                                    var obj2 = await detailsFilm(obj.id)
                                    await createFilm(obj, obj2)
                                }
    
                } 
            }

            
        


       

        const existePelicula = await searchMongo(qwery)
        if( existePelicula != null && existePelicula != undefined && existePelicula.length > 0){
            console.log("Entre3")
            return res.json(existePelicula)

        }





        
            
        }
    }

     const error ={error:"No se encontro nada"}
     
     return res.json(error)
   
}



const createFilm = async (obj, obj2) => {
   

  

    const titulo = obj.title
    const existePelicula = await Pelicula.findOne({ 'tituloPelicula': titulo })

    if(!existePelicula){
    
    try{
    const pelicula = new Pelicula()

    pelicula.tituloPelicula = obj.title
    pelicula.posterPelicula = obj.poster_path
    pelicula.tituloOriginalPelicula = obj.original_title
    pelicula.sinopsisPelicula = obj.overview
    pelicula.fechaPelicula = obj2.release_date
    pelicula.idiomasPelicula = spoken_languagesFilm(obj2.spoken_languages)
    pelicula.generosPelicula  = genreFilm(obj2.genres)

    const peliculaAlmacenado = await pelicula.save()
    
    }catch(error){
        
        console.log(error)
    }
    }

}

const seeFilm = async (req,res) =>{
    try{
        const id = req.params
  
        const existePelicula = await Pelicula.find({ _id: { $in: id.id } });
        res.json(existePelicula)
    }catch(error){
        res.send(error)
    }
}

const detailsFilm = async(id)=>{
    const search  = await fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+process.env.MovieDataBase+"&language=es-SP")
    const data = await search.json()
    return data
}

const genreFilm = (genre) => {
    var array = genre.map(function(el){return el.name})  
    return array
}

const spoken_languagesFilm = (spoken_languages) => {

    var array = spoken_languages.map(function(el){return el.english_name})  
    return array


}


const addFollow = async (req,res) =>{
 
        const id = req.params
        const idUsuario = req.body._id



        const token = req.headers.authorization.replace("Bearer ","")
        const traducido  = jwt.verify(token, process.env.jwt)
  

        const existePelicula = await Pelicula.find({ _id: { $in: id.id } });
        const usuario = await Usuario.find({ _id: traducido.id});
        const id2 = {_id:id.id}
     
        if(usuario[0] != undefined){



            if(usuario[0].arrayVistas.find(element => element.id == id.id) != undefined){

                var myIndex = usuario[0].arrayVistas.findIndex(object => {
                    return object.id === id.id;
                  })
                if (myIndex !== -1) {
                    usuario[0].arrayVistas.splice(myIndex, 1);
                 
                }


            }




            if(usuario[0].arraySeguimiento.find(element => element.id == id.id) == undefined){

         
                usuario[0].arraySeguimiento.push({
                    
                    nombre:existePelicula[0].tituloPelicula,
                    id:id.id
                    
                    })
        
             
                

            }

            usuario[0].save()
            
        }else{

            res.send("No se pudo insertar")

        }

    
   

   
}
//Nueva hay que probarla
const addViews = async (req,res) =>{


    const id = req.params
    const idUsuario = req.body._id

    const token = req.headers.authorization.replace("Bearer ","")
    const traducido  = jwt.verify(token, process.env.jwt)
    const existePelicula = await Pelicula.find({ _id: { $in: id.id } });
    const usuario = await Usuario.find({ _id: traducido.id});
    const id2 = {_id:id.id}
 
    if(usuario[0] != undefined){



        if(usuario[0].arraySeguimiento.find(element => element.id == id.id) != undefined){

            var myIndex = usuario[0].arraySeguimiento.findIndex(object => {
                return object.id === id.id;
              })
            if (myIndex !== -1) {
                usuario[0].arraySeguimiento.splice(myIndex, 1);
              
            }

      





        }




        if(usuario[0].arrayVistas.find(element => element.id == id.id) == undefined){

      
            usuario[0].arrayVistas.push({
                    
                nombre:existePelicula[0].tituloPelicula,
                id:id.id
                
                })
   
            res.send("Se inserto")

        }

        usuario[0].save()
        
    }else{

        res.send("No se pudo insertar")

    }





}


const NotViewFollow = async (req,res) =>{

    console.log("añadir")
    const id = req.params
    const idUsuario = req.body._id



    console.log(req.headers.authorization)  
    const token = req.headers.authorization.replace("Bearer ","")
    const traducido  = jwt.verify(token, process.env.jwt)


    const existePelicula = await Pelicula.find({ _id: { $in: id.id } });
    const usuario = await Usuario.find({ _id: traducido.id});
    const id2 = {_id:id.id}


    if(usuario[0] != undefined){



        if(usuario[0].arraySeguimiento.find(element => element.id == id.id) != undefined){

            var myIndex = usuario[0].arraySeguimiento.findIndex(object => {
                return object.id === id.id;
              })
            if (myIndex !== -1) {
                usuario[0].arraySeguimiento.splice(myIndex, 1);
            }


        }


        if(usuario[0].arrayVistas.find(element => element == id.id) != undefined){

            var myIndex = usuario[0].arrayVistas.findIndex(object => {
                return object.id === id.id;
              })
            if (myIndex !== -1) {
                usuario[0].arrayVistas.splice(myIndex, 1);
              
            }

        }
        usuario[0].save()


        
        
    }else{


        res.send("No se pudo insertar")

    }





}






export {

    searchFilm,
    seeFilm,
    addFollow,
    addViews,
    NotViewFollow




}