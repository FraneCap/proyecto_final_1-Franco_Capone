const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const app = express();
const multer = require('multer');
const session = require('express-session');
var { nanoid } = require('nanoid');

const hbs = exphbs.create({
	partialsDir: ['shared/templates/', 'views/partials/'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'arqcapone',
});

connection.connect(function (error) {
	if (!!error) {
		console.log('Error connecting to database');
		console.log(error);
	} else {
		console.log('Connected to database');
	}
});


var storage = multer.diskStorage({
	destination: function (request, file, cb) {
		cb(null, './uploads');
	},
	filename: function (request, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

const getAllProperties = async (request, response) => {
	await connection.query(
		'SELECT * FROM under_construction',
		function (error, rows, fields) {
			if (!!error) {
				console.log('Error in the query');
			} else {
				response.render('home', {
					title: 'Arquitecto Capone - Propiedades en Pozo',
					constructionData: rows,
					loggedIn: request.session.loggedIn ? true : false,
				});
			}
		}
	);
};

const getAllPropertiesBis = async (request, response) => {
	await connection.query(
		'SELECT * FROM under_construction',
		function (error, rows, fields) {
			if (!!error) {
				console.log('Error in the query');
			} else {
				response.render('admin-properties', {
					title: 'Arquitecto Capone - Propiedades en Pozo',
					constructionData: rows,
					loggedIn: request.session.loggedIn ? true : false,
				});
			}
		}
	);
};
app.get('/admin-properties', getAllPropertiesBis);
app.get('/', getAllProperties);

const getAllUsers = async (request, response) => {
	await connection.query('SELECT * FROM users', function (error, rows, fields) {
		if (!!error) {
			console.log('Error in the query');
		} else {
			response.render('admin-users', {
				title: 'Administracion',
				usersList: rows,
				loggedIn: request.session.loggedIn ? true : false,
			});
		}
	});
};

app.get('/admin-users', getAllUsers);

app.put('/auth', (request, response) => {
	request.session.destroy();
	response.redirect('/');
});


app.post('/admin-users/:userId', function (request, response) {
	var userId = request.params.userId;
	connection.query(
		'DELETE FROM users WHERE users.id = ?',
		[userId],
		function (error, results, fields) {
			response.redirect('/admin-users');
			response.end();
		}
	);
});

app.post('/admin-properties/:propertyId', function (request, response) {
	var propertyId = request.params.propertyId;
	connection.query(
		'DELETE FROM under_construction WHERE under_construction.id = ?',
		[propertyId],
		function (error, results, fields) {
			response.redirect('/admin-properties');
			response.end();
		}
	);
});

app.get('/logout', (request, response) => {
	request.session.destroy();
	response.redirect('/');
});

app.get('/admin', function (request, response) {
	if (request.session.loggedIn) {
		response.render('admin', { loggedIn: true });
	} else {
		response.send('Inicia sesion para ver esta pagina');
	}
});

app.post('/auth', function (request, response) {
	var email = request.body.email;
	var password = request.body.password;
	if (email && password) {
		connection.query(
			'SELECT * FROM users WHERE email = ? AND encrypted_password = ?',
			[email, password],
			function (error, results, fields) {
				if (results.length > 0) {
					request.session.loggedIn = true;
					request.session.email = email;
					response.redirect('/');
					response.end();
				} else {
					response.send('El email y/o contraseña ingresados no son correctos');
				}
				response.end();
			}
		);
	} else {
		response.send('Ingresa tu email y contraseña');
		response.end();
	}
});

const createConstruction = (request, response) => {
	const id = nanoid(6);
	const name = request.body.newConstructionName;
	const address = request.body.newConstructionAddress;
	const price = request.body.newConstructionPrice;
	const img_directory = `uploads/${request.file.filename}`;
	const values = [[id, name, address, price, img_directory]];

	if (id && name && address && price && img_directory) {
		connection.query(
			'INSERT INTO under_construction (id, name, address, price, img_directory) VALUES ? ',
			[values],
			function (error, results, fields) {
				response.redirect('/admin-properties');
				response.end();
			}
		);
	} else {
		response.send('Faltan datos');
		response.end();
	}
};

const createUser = (request, response) => {
	const id = nanoid(6);
	const firstName = request.body.newUserFirstName;
	const lastName = request.body.newUserLastName;
	const email = request.body.newUserEmail;
	const password = request.body.newUserPassword;
	const isAdmin = 1;
	const values = [[id, firstName, lastName, email, password, isAdmin]];

	if ((id && firstName && lastName && email && password, isAdmin)) {
		connection.query(
			'INSERT INTO users (id, first_name, last_name, email, encrypted_password, is_admin) VALUES ? ',
			[values],
			function (error, results, fields) {
				response.redirect('/');
				response.end();
			}
		);
	} else {
		response.send('Faltan datos');
		response.end();
	}
};

app.post(
	'/new-construction',
	upload.single('newConstructionImg_Directory'),
	createConstruction
);
app.post('/new-user', createUser);

app.listen(3000, function () {
	console.log('express-handlebars example server listening on: 3000');
});

module.exports = connection;
