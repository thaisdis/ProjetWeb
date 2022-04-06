// appelé dans le modèle 

const router = require("express").Router();
const authController = require("../controllers/auth.controller"); // autControlleur vient du dossier controllers
const userController = require("../controllers/user.controller"); // require le fichier user controler
const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// auth
router.post("/register", authController.signUp);//permet de traiter la data
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers); // voir user controler , getAlluser= fonction
router.get("/:id", userController.userInfo); // :id= p/:id, paramètre, quand tu as le cas de get:id tu active la fonction 
router.put("/:id", userController.updateUser); // put sert a faire des updates --> si on te demande de faire un put tu execute user controller 
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
