var mongoose = require('mongoose');  
var User     = mongoose.model('User');
var miMail   = require("../mail/mail.js");

//GET - 
exports.findAllUsers = function(req, res) {  
	User.find(function(err, users) {
		if(!users) return;
		if(err) res.send(500, err.message);

		console.log('GET /users')
		res.status(200).jsonp(users);
	});
};

//GET /:id
exports.findUserById = function(req, res) {  
	User.findOne({id: req.params.id}, function(err, user) {
		if(err) return res.send(500, err.message);

		console.log('GET /users/' + req.params.id);
		res.status(200).jsonp(user);
	});
};

//POST - Json del user
exports.addUser = function(req, res) {  
	console.log('POST');
	console.log(req.body);
	console.log(req.body.nombres);

	var miUser = new User({  
		nombres         :  req.body.nombres,
		apellidos       :  req.body.apellidos,
		documento       :  req.body.documento,
		email           :  req.body.email,
		numero          :  req.body.numero,
		pwd          	:  req.body.pwd
	});

	miUser.save(function(err, user) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(user);
	});
};

//PUT - Json del user
exports.updateUser = function(req, res) {  
	User.findOne({id: req.params.id}, function(err, user) {
		if(!user) return res.status(500).send("");
		user.nombres  	 = req.params.nombres,
		user.apellidos   = req.params.apellidos,
		user.documento   = req.params.documento,
		user.email		 = req.params.email,
		user.numero 	 = req.params.numero,
		user.pwd         = req.params.pwd

		user.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(user);
		});
	});
};

//DELETE - Json del user
exports.deleteUser = function(req, res) {  
	User.findOne({id: req.params.id}, function(err, user) {
		if(!user) return res.status(500).send("");
		user.remove(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).send();
		})
	});
};

exports.login = function(req, res) {  
	console.log('POST');
	console.log(req.body);

	User.findOne({documento: req.body.documento, pwd: req.body.pwd}, function(err, user) {
		if(err) return res.send(500, err.message);

		var dataRes = {};
		if(user){
			dataRes = {
				resp : 1,
				idUser: user._id
			};
			res.status(200).jsonp(dataRes);
		}else{
			dataRes = {
				resp : 0,
				idUser: null
			};
			res.status(200).jsonp(dataRes);
		}
	});
};

exports.recuperaPass = function(req, res){
	console.log('POST');
	console.log(req.body);

	User.findOne({documento: req.body.documento, email: req.body.email}, function(err, user) {
		if(err) return res.send(500, err.message);

		var dataRes = {};
		if(user){
			dataRes = {
				resp : "Se ha enviado un email con su usuario y contraseña.",
				idUser: user._id
			};

			mailOptionsForPass = {
			    from: '"Contacto Nash-TI 👥" <contacto@nash-ti.com>', // sender address
			    to:  user.email, // list of receivers
			    subject: 'Recuperación de contraseña DomoApp', // Subject line
			    text: '', // plaintext body
			    html: '<b>Hola, estas son sus credenciales de acceso:</b><br><b>Usuario: ' + user.documento+ '</b> <br> <b> Password:' + user.pwd+ '</b>' // html body
			};

			miMail.transporter.sendMail(mailOptionsForPass, function(error, info){
				if(error){
					return console.log(error);
					res.status(500).jsonp(error);
				}
				res.status(200).jsonp(dataRes);
				console.log('Message sent: ' + info.response);
			});

			
		}else{
			dataRes = {
				resp : 0,
				idUser: null
			};
			res.status(500).jsonp(dataRes);
		}
	});
}