const mongoose = require("mongoose");


mongoose
  .connect(
    "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.ji3or.mongodb.net/mern-project",
    {
      // on sait qu'il faut mettre ses infos grâce à la doc 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  ) //lien issu de mongo, a adapter
  .then(() => console.log("Connected to MongoDB")) //on est relié à compass si on est connect
  .catch((err) => console.log("Failed to connect to MongoDB", err)); // sinon on alerte d'une erreur et on la transmet 

// voir .connect, .catch, .then