const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

const userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));

server.use(middlewares);

const SECRET_KEY = '123456789';
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
  return userdb.utilisateurs.findIndex(user => user.mail === email && user.password === password) !== -1
}

// L'entrée pour se connecter
server.post('/auth/login', (req, res) => {
  const {email, password} = req.body
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
server.use("*",  (req, res, next) => {
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
});


// On ajoute les trucs de l'API par défaut
server.use(router)


// On lance le serveur
server.listen(3000, () => {
  console.log('Run Auth API Server')
})