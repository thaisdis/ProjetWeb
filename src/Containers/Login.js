import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from './API/axios';

const loginURL='/login';
const successMessage = () => {
  return (
  <div
  className="success"
  style={{
  }}>
  <Link to="/publish">
        </Link> 
  </div>
  );
  };

  // Showing error message if error is true
  const errorMessage = (message) => {
    alert("Wrong email or password combination");
  };


class Login extends Component {
  

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.email.value);

    if (!e.target.email.value) {
      alert("Email is required");
    } else if (!e.target.email.value) {
      alert("Valid email is required");
    } else if (!e.target.password.value) {
      alert("Password is required");
    } else if (
      e.target.email.value === "me@example.com" &&
      e.target.password.value === "123456"
    ) {
      alert("Successfully logged in");
      e.target.email.value = "";
      e.target.password.value = "";
    }
      
    
    try {
        const response =async()=> await axios.post(loginURL,
          JSON.stringify({email: e.target.email.value,password: e.target.password.value}),
          {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true} 
        );
        alert("hey");
        console.log(response.data)
        successMessage();
        
        
      
    } catch (error) {
      errorMessage();
      
    }
  };

  

  render() {
    return (
      <div className="Login">
        <h1>Se connecter</h1> 
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="nom@gmail.com" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" />
          </div>
          <button className="primary">Login</button>
        </form>
        <Link to="/signup">
            <button className="secondary"> 
            créer un nouveau compte 
            </button>
        </Link>        
      </div>
    );
  }
}

export default Login;

