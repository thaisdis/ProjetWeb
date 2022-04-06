// serveur
// -lancement 
// -database ( mongo db ? )




const express = require('express'); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');//appel a un autre bail
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*', checkUser); // assure la securité, car check à chaque requete
app.get('/jwtid', requireAuth, (req, res) => { // on le fait une seule fois en front, à l'autentifiction
  res.status(200).send(res.locals.user._id)
});

// routes
// besoin de l'appel classique local host dans les routes (+/register) ce qui menera a une fonction
app.use('/api/user', userRoutes); // quand il y aura un slash sur la requête api/user tu nous emmenera au userRoutes ( toute sles routes qui auront un lien avec le user )
app.use('/api/post', postRoutes);

// server
// app.listen doit toujours être mis en dernier
app.listen(process.env.PORT, () => { //port declaré avant == on écoute sur ce port, pour lancement du serveur 
  console.log(`Listening on port ${process.env.PORT}`); // 
})