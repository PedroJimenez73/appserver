// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration
mongoose.connect('mongodb://pedro:stavros@ec2-54-201-154-129.us-west-2.compute.amazonaws.com:27017/meteordb');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Modelos


var Curso = mongoose.model('Curso', {
    titulo: String,
    organizador: String,
    horas: String,
    asistentes: String,
    fechas: String,
    observaciones: String,
    fechamodif: String
});

var Prove = mongoose.model('Prove', {
    nombre: String,
    servicio: String,
    cif: String,
    direccion: String,
    telefono: String,
    persona: String,
    mail: String,
    pago: String,
    nc: String,
    eval: String,
    fechamodif: String
});
 
// Routes
 

    //get Cursos
    app.get('/api/cursos', function(req, res) {

        console.log("fetching cursos");

        // use mongoose to get all reviews in the database
        Curso.find(function(err, cursos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(cursos); // return all reviews in JSON format
        });
    });

    //crear cursos
    app.post('/api/cursos', function(req, res) {

        console.log("creating curso");

        // create a review, information comes from request from Ionic
        Curso.create({
            titulo : req.body.titulo,
            organizador : req.body.organizador,
            horas: req.body.horas,
            asistentes: req.body.asistentes,
            fechas: req.body.fechas,
            observaciones: req.body.observaciones,
            fechamodif: req.body.fechamodif,
            done : false
        }, function(err, curso) {
            if (err)
                res.send(err);

            // get and return all the reviews after you create another
            Curso.find(function(err, cursos) {
                if (err)
                    res.send(err)
                res.json(cursos);
            });
        });

    });

    // borrar cursos
    app.delete('/api/cursos/:curso_id', function(req, res) {
        Curso.remove({
            _id : req.params.curso_id
        }, function(err, curso) {
 
        });
    });

    //actualizar cursos
    app.put('/api/cursos/:curso_id', function(req, res) {
         Curso.updateOne({
		_id : req.params.curso_id
		}, {$set: {
			
			
            	titulo : req.body.titulo,
            	organizador : req.body.organizador,
            	horas: req.body.horas,
            	asistentes: req.body.asistentes,
            	fechas: req.body.fechas,
            	observaciones: req.body.observaciones,
            	fechamodif: req.body.fechamodif,
			    done : false }}, 
                
                function (err, curso) {

			});
		});



    //get Proveedores
    app.get('/api/proves', function(req, res) {

        console.log("fetching proveedores");

        // use mongoose to get all reviews in the database
        Prove.find(function(err, proves) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(proves); // return all reviews in JSON format
        });
    });

    //crear proveedor
    app.post('/api/proves', function(req, res) {

        console.log("creating proveedor");

        // create a review, information comes from request from Ionic
        Prove.create({

            nombre : req.body.nombre,
            servicio : req.body.servicio,
            cif: req.body.cif,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            persona: req.body.persona,
            mail : req.body.mail,
            pago: req.body.pago,
            nc: req.body.nc,
            eval: req.body.eval,
            fechamodif: req.body.fechamodif,
            done : false
        }, function(err, prove) {
            if (err)
                res.send(err);

            // get and return all the reviews after you create another
            Prove.find(function(err, provee) {
                if (err)
                    res.send(err)
                res.json(proves);
            });
        });

    });

    // borrar proveedor
    app.delete('/api/proves/:prove_id', function(req, res) {
        Prove.remove({
            _id : req.params.prove_id
        }, function(err, prove) {
 
        });
    });

    //actualizar proveedor
    app.put('/api/proves/:prove_id', function(req, res) {
         Prove.updateOne({
		_id : req.params.prove_id
		}, {$set: {
			
            nombre : req.body.nombre,
            servicio : req.body.servicio,
            cif: req.body.cif,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            persona: req.body.persona,
            mail : req.body.mail,
            pago: req.body.pago,
            nc: req.body.nc,
            eval: req.body.eval,
            fechamodif: req.body.fechamodif,
			done : false }}, 
                
                function (err, prove) {

			});
		});
 
 
// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");
