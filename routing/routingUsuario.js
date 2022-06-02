import express from "express"
import {usuarios,registerUser,login,confirmUser,confirmUser2, recoveryPassword, newPassword, profile,user ,deleteUser, updateUser,userData} from "./../controller/controllerUsuario.js"
import {searchFilm,seeFilm, addFollow,addViews,NotViewFollow} from "./../controller/controllerPelicula.js"
import { createComent ,deleteComent, updateComent, searchComent,searchComentByUser,searchComentByFilm} from "../controller/controllerComentarios.js"
import checkLogin from "../Authorization.js"

const routing = express.Router()
//Routing del Usuario
//routing.get('/',usuarios)
routing.post('/register',registerUser)
routing.get('/confirm/:tokenUsuario',confirmUser)
routing.get('/confirm2/:tokenUsuario',confirmUser2)
routing.post('/login',login)
routing.post('/recovery',recoveryPassword)
routing.post('/password/:token',newPassword)
routing.post('/deleteUser',checkLogin,deleteUser)
routing.post('/updateUser',checkLogin,updateUser)
routing.post('/userData',checkLogin, userData )
routing.get('/user',checkLogin, user )
routing.get('/profile',checkLogin, profile )
//Routing de las peliculas
routing.get('/search/:qwery',checkLogin,searchFilm)
routing.get('/verPelicula/:id',checkLogin,seeFilm)
routing.get('/addFollow/:id',checkLogin,addFollow)
routing.get('/addViews/:id',checkLogin,addViews)
routing.get('/NotViewFollow/:id',checkLogin,NotViewFollow)
//Routing de los comentarios
routing.post('/createComent',checkLogin,createComent)
routing.post('/deleteComent',checkLogin,deleteComent)
routing.post('/updateComent',checkLogin,updateComent)
routing.get('/searchComent',checkLogin,searchComent)
routing.post('/searchComentByUser',checkLogin,searchComentByUser)
routing.get('/searchComentByFilm',checkLogin,searchComentByFilm)


export default routing