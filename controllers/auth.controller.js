//auth gère seulement inscription, connexion, deconnexion



const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge //  token valide 3 jour, genere token si clé secrete
  })
};

module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password }); // on passe le pseudo au pseudo 
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}
 
// request= ce qui sera envoyé quand on va faire un post à signup
module.exports.signIn = async (req, res) => { // fonction exportée dès sa déclaration, c'est une fonction asynchrone
  const { email, password } = req.body // informations qui transitent dans le request 

  try {
    const user = await UserModel.login(email, password); // await
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id}) // réponse à la création de l'utilisateur renvoie l'ID, sans renvoi du token
  } catch (err){ 
    // res.status(200).json(err);
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}

// no cookie for you, deconnexion avec le token ( PRINCIPE DU TOKEN: à chaque requete l'utilisateur le présente au serveur, serveur identifie la personne)
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}