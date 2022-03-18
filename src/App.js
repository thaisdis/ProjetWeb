import React from 'react';
import Header from './Components/Header';
import './App.css';
import Home from './Containers/Home';
import Login from './Containers/Login';
import SignUp from './Containers/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/login' element={<Login/>} exact />
          <Route path='/signup' element={<SignUp/>} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
