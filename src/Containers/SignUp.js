import { useState } from 'react';
import { Link } from "react-router-dom";
import './SignUp.css';
import axios from './API/axios';

export default function SignUp() {

    

    // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const SignUpURL='/user/register'

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
    
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
    setError(true);
    } else {
        try{
            const response =async()=> await axios.post(SignUpURL,
                JSON.stringify({pseudo: name,email,password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true} 
            );
            console.log(response.data)
            setSubmitted(true);
            successMessage();

        }catch(err){
            setError(false);
            errorMessage();
        }
    
    }
    };

    // Showing success message
    const successMessage = () => {
    return (
    <div
    className="success"
    style={{
    display: submitted ? '' : 'none',
    }}>
    <h1>User {name} successfully registered!!</h1>
    </div>
    );
    };

    // Showing error message if error is true
    const errorMessage = () => {
    return (
    <div
    className="error"
    style={{
    display: error ? '' : 'none',
    }}>
    <h1>Please enter all the fields</h1>
    </div>
    );
    };

    
    

    return (
    <div className="signUp">
    <div>
    <h1>Inscription</h1>
    </div>

    {/* Calling to the methods */}
    <div className="messages">
    {errorMessage()}
    {successMessage()}
    </div>

        <form className="form">
            <div className="input-group">
                <label className="label">Nom</label>
                <input onChange={handleName} className="input"
                value={name} type="text" />
            </div>

            <div className="input-group">
                <label className="label">Email</label>
                <input onChange={handleEmail} className="input"
                value={email} type="email" placeholder="nom@gmail.com" />
            </div>

            <div className="input-group">
                <label className="label">Mot de passe</label>
                <input onChange={handlePassword} className="input"
                value={password} type="password" />
            </div>

            <button onClick={handleSubmit} className="primary" type="submit">
            Envoyer
            </button>

            <Link to="/login">
                <button className="secondary"> 
                Déja un compte ? 
                </button>
            </Link>    
        </form>
    </div>
    );
}