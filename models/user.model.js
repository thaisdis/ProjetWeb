//on déclare ici a quoi va ressembler un utilisateur

const mongoose = require('mongoose');
const { isEmail } = require('validator'); // controle si c est un email ( voir la bibli), renvoie true ou false 
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema( // ref a la bibli mongoose
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true // supprime les espaces
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail], // fonction d une bibli (validator), renvoie true ou false 
      lowercase: true, //balek pour un mail car
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024, //pcq c est cripté
      minlength: 6
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    followers: {
      type: [String] // tableau 
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String] //prémuni des likes a l'infini
    }
  },
  {
    timestamps: true, // pour savoir quand l'utilsateur s'enregistre
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function(next) { // meaning: avant de save mon modèle, crypte mon code, le param next= une fois que t'as fait ça, passe à la suite 
  const salt = await bcrypt.genSalt(); // bcrypt generera une série de caractère que seul lui connait, await pcq il doit avoir le temps de saler le mot de passe 
  this.password = await bcrypt.hash(this.password, salt); // on l'ajoute au password ( d'ou le this, on peut pas faire de fonction flechée ducoup )
  next();// passe a la suite 
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password); // compare mot de passe 
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema); // on recupère le userschema, dans la table user, manque plus que exportation du modèle

module.exports = UserModel; // exportation