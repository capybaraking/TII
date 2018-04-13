/*
Import des modules
*/
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const pwdHash = require('password-hash');

/*
Création du serveur
*/
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);

/*
Paramètres pour l'autentification
*/
const userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8')); 
const SECRET_KEY = 'MischiefManaged';
const expiresIn = '1h';

// Create a token from a payload 
function createToken(payload){
	return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
	return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
	return userdb.utilisateurs.findIndex(user => user.mail === email && pwdHash.verify(password, user.password)) !== -1
}

/*
Middlewares
*/

server.use( bodyParser.json() );       // to support JSON-encoded bodies

server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

//On ajoute la date et l'id de l'utilisateur dans le corps de la requête. Comme ça quand ça passe dans le POST normal, géré par
// le json-server ça ajoutera avec la date et l'auteur.
// Un middleware c'est une fonction qui prend 3 paramètres :
//    - req : la requête qu'on a envoyé au serveur (est-ce que c'est get, post etc et qu'est-ce qu'il y a dedans)
//    - res : un objet qui sert à envoyer une réponse (on ne s'en sert s'il y a une erreur)
//    - next : une fonction qui permet de passer au middleware suivant.
// On va donc modifier le req, puis ensuite on appelera next pour que ça fasse le travail normal
server.post("/enigmes", function(req, res, next){ 
	req.body.date = Date.now(); //On ajoute la date actuelle dans le champ "date"
	token = req.headers.authorization.split(' ')[1]; //On récupère le token d'autentification dans la requête

	try { //On regarde si la personne est connectée. Si ce n'est pas le cas ça va faire une erreur
		payload = jwt.verify(token, SECRET_KEY); //C'est ce qui est contenu dans le token : l'email et le mdp
		email = payload.email;
		password = payload.password;
		//On cherche dans la bdd l'index de l'utilisateur qui a cet email et mdp
		index = userdb.utilisateurs.findIndex(user => user.mail === email && pwdHash.verify(password, user.password));
		if(index === -1){ //S'il vaut -1 c'est qu'on ne l'a pas trouvé : l'utilisateur n'existe pas.
			const status = 401
	    	const message = "Erreur : l'utilisateur n'existe pas";
	    	res.status(status).json({status, message})
		}else{ //Si on a trouvé une autre valeur, on récupère l'id et on l'ajoute à la requête.
			idAuteur = userdb.utilisateurs[index].id;
			req.body.utilisateurId = idAuteur;
		}
	} catch (err) { //Si le token n'avait pas la bonne forme, on retourne une erreur.
	    const status = 401
	    const message = 'Error: access_token is not valid'
	    res.status(status).json({status, message})
 	}
	next(); //On a fini nos modifications, on passe à la suite
});

/*
Routes
*/

/*server.get('/hash', (req, res) => {
  const pwd = req.query.password;
  const hashed = pwdHash.generate(pwd);
  res.status(200).json({hashed});
});*/

// L'entrée pour se connecter
server.post('/auth/login', (req, res) => {
  //const {email, password} = req.body
  const email= req.body.email;
  const password = req.body.password;
  if (isAuthenticated({email, password}) === false) {
  	const status = 401
  	const message = 'Incorrect email or password'
  	res.status(status).json({status, message})
  	return
  }
  const access_token = createToken({email, password})
  res.status(200).json({access_token})
});

//On vérifie qu'on est bien connecté pour toutes les entrées /auth/* (du coup faudra modifier)
/*server.use("*",  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try {
     verifyToken(req.headers.authorization.split(' ')[1])
     next()
  } catch (err) {
    const status = 401
    const message = 'Error: access_token is not valid'
    res.status(status).json({status, message})
  }
});*/


// On ajoute les trucs de l'API par défaut
server.use(router)


// On lance le serveur
server.listen(3000, () => {
	console.log('Run Auth API Server')
})