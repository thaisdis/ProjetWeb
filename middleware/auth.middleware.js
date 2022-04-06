const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model"); //pour controler corespondance Id/ token

// trest si utilisateur est connecté, checker l'utilisateur 
module.exports.checkUser = (req, res, next) => { //next= pour poursuivre le code 
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });//on enleve le cookie
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id); // sinon
        res.locals.user = user;
        next(); // il faut envoyer un NEXT!!
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// controle si corespond a la base de données
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
