
const escritores = require('./database.js');
const express = require('express');
const { Router } = require('express');
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

//MIDDLEWARE---------------
const validarAutor = (req,res,next) => {
    //console.log(req.body);
    const idExist= escritores.filter(el => el.id == req.body.id)
    if(idExist.length>0){
        res.status(403).send('el autor ya existe');
    }else{
        next();
    }
}
const validarCampos = (req,res,next)=>{
    const {id, nombre, apellido, fechaNacimiento} = req.body;
    if (!id || !nombre || !apellido || !fechaNacimiento) {
        res.status(403).send('falta un prametro');
    } else {
        escritores.push(req.body)
        //escritores.push({id,nombre, apellido,fechaNacimiento})
        next();
    }
}
const validarID = (req,res,next)=>{
    
    let { id } = req.params;
    const idExist = escritores.filter(el=>el.id==id)
    if (idExist.length>0) {
        next();
    }else{
        res.status(403).send('ID incorrecto');
    }
}
const validarLibro = (req,res,next)=>{
    const {id, titulo, descripcion, añoPublicacion} = req.body;
    const libroExist = escritores.libro.filter(el=>el.id == id || el.titulo == titulo || el.descripcion == descripcion || el.añoPublicacion == añoPublicacion)
    if (libroExist.length>0) {
        next();
    } else {
        res.status(403).send('libro ya publicado');
    }
}
const validarCamposLibro=(req,res,next)=>{
    const {id, titulo, descripcion, añoPublicacion} = req.body;
    if (!id || !titulo || !descripcion || !añoPublicacion) {
        res.status(403).send('falta un prametro');
    } else {
        escritores.libro.push(req.body)
        //escritores.push({id,nombre, apellido,fechaNacimiento})
        next();
    }

}

//GET-POST-----/AUTORES--------------
app.get('/autores', (req, res) => {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Listado de autores',
        respuesta: escritores  
    };
    res.status(200).send(respuesta);
})

app.post('/autores', validarAutor, validarCampos,  (req,res)=>{
    //let {id, nombre...}
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Nuevo autor',
        respuesta: req.body
    };
    res.status(200).send(respuesta);   
})

//GET-DELETE-PUT-----/AUTORES:ID--------------
app.get('/autores/:id',validarID, (req,res)=>{
    let{id}=req.params;
    let index = escritores.findIndex(el => el.id==id);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'autor seleccionado',
        respuesta: escritores[index]
    };
    res.status(200).send(respuesta); 
})
app.delete('/autores/:id',validarID,(req,res)=>{
    let{id}=req.params;
    let index = escritores.findIndex(el => el.id==id);
    escritores.splice(index,1);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'autor eliminado',
        respuesta: escritores[index]
    };
    res.status(200).send(respuesta); 
})
app.put('/autores/:id',validarID,validarCampos,(req,res)=>{
    let{id}=req.params;
    let index = escritores.findIndex(el => el.id==id);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'autor modificado',
        respuesta: escritores[index]
    };
    res.status(200).send(respuesta); 
})

//GET-POST-----/AUTORES/:ID/LIBROS--------------
app.get('/autores/:id/libros',validarID,(req,res)=>{
    let{id}=req.params;
    let index = escritores.findIndex(el => el.id==id);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: `autor seleccionado es ${escritores[index].nombre} ${escritores[index].apellido}`,
        respuesta: escritores[index].libro
    };
    res.status(200).send(respuesta); 
})
app.post('/autores/:id/libros',validarID,validarLibro,validarCamposLibro,(req,res)=>{
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: `Nuevo libro de ${escritores[index].nombre} ${escritores[index].apellido}`,
        respuesta: req.body
    };
    res.status(200).send(respuesta);  
})
//--------------
/* let{id}=req.params;
    let index = escritores.findIndex(el => el.id==id); */
//--------------
app.use(function (req, res) {

    respuesta = {
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    };

    res.status(404).send(respuesta);
});

/* app.get('/algo',(req,res)=>{ //http://localhost:3000/algo?pais=argentina
    const pais = req.query.pais;
    //const {pais}= req.query
    console.log(pais);
    res.send(pais);
})

app.get('/algo2/:pais',(req,res)=>{ //http://localhost:3000/algo2/argentina
    const pais = req.params.pais;
    //const {pais}= req.params
    console.log(pais);
    res.send(pais);
}) */