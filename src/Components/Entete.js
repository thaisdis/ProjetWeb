import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Entete.css';

function Entete() {
  return (
    <div className='hero-container'>
      <h1>Vous n'utilisez plus vos affaires ? </h1>
      <p>Donnez les !</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Comment ça fonctionne ? <i className='far fa-play-circle' />
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Commencer à Donner
        </Button>
      </div>
    </div>
  );
}

export default Entete;