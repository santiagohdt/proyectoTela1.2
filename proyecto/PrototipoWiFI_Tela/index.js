// Declaracion libs
var express 		= require('express'),
http 				= require("http"),
bodyParser  		= require("body-parser"),
methodOverride 		= require("method-override"),
mongoose 			= require('mongoose'),
miMail 				= require("./server/mail/mail.js");

// Modelos y Controladores.
// Users.
var userModels     = require('./server/models/user')(app, mongoose);
var usersCtrl 	   = require('./server/controllers/users');

// Instancia servidor
var app = express();
var server = http.createServer(app);
var router = express.Router();

var http = require("http").Server(app);
var io = require('socket.io')(http);

// Obtener puerto por el sistema, o uso del puerto por defecto.
var port = process.env.PORT || 3000;

// Conectar a BD.
mongoose.connect('mongodb://paisa:12345@localhost/domo', function(err, res) {  
	if(err) {
		console.log('ERROR: conectando a la base de datos. ' + err);
		return;
	}
	http.listen(port, function() {
		console.log('Servidor iniciado en *:' + port);
	});
});

// app config
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Middlewars.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Enviar email.
/*miMail.transporter.sendMail(miMail.mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
*/

// Router
router.get('/', function(req, res) {  
	app.use(express.static(__dirname + '/www'));
	res.sendFile(__dirname + '/www/index.html');
});

// *---- API routes ----*

// Handler Usuarios.
router.route('/users')
  .get(usersCtrl.findAllUsers)
  .post(usersCtrl.addUser);

router.route('/users/:id')
  .get(usersCtrl.findUserById)
  .put(usersCtrl.updateUser)
  .delete(usersCtrl.deleteUser);

router.route('/login')
  .post(usersCtrl.login);

router.route("/recuperarUsuario")
  .post(usersCtrl.recuperaPass);

// Usar el router de express
app.use(router);

// Eventos
io.on('connection', function(socket){
	var address = socket.handshake.address;
	console.log('Usuario conectado IP:' + address);

	socket.on('disconnect', function(){
		var address = socket.handshake.address;
		console.log('Usuario desconectado' + address);
	});

	socket.on('LoginU', function(data){
		console.log('Usuario login:' + data);
		socket.join(data);

		console.log(JSON.stringify(io.sockets.adapter.rooms));
	});

	socket.on('LoginD', function(data){
		console.log('Dispositivo login:' + data);
		socket.join(data);

		console.log(JSON.stringify(io.sockets.adapter.rooms));
	});
});
