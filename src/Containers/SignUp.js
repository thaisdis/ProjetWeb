import React, { useState } from "react";
//import { useHistory } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const history = useHistory();

  /*const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-express.herokuapp.com/user/signup",

        { username, email, password }
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        alert("something happened 😱");
      }
    } catch (error) {
      console.log(error.message);
    }
  };*/

  return (
    <div className="Signup">
      <div className="signup-login-position">
        <h3>S'inscrire</h3>
        
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <br />
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br />
          <input type="submit" value="S'inscrire" />
        
      </div>
    </div>
  );
};
export default SignUp;
