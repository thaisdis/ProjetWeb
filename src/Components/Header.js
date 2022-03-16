import React from "react";
import { Link } from "react-router-dom";
import { Search } from "react-feather";
import "./Header.css";

const Header = ({ token, setUser }) => {
  return (
    <div className="header">
      <div>
        <Search className="search" />
      </div>
      <Link to="/">
        <img alt="logo" src="/logoSite.png" />
      </Link>
      <input type="text" placeholder="  Recherche des articles"></input>

      {/* permet d'afficher le bouter se déconnecter et de cacher les S'inscrire et Se connecter */}

      {token ? (
        <button
          className="red-button"
          onClick={() => {
            setUser(null);
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <div>
          <Link to="/signup">
            <button className="header-button">S'inscrire</button>
          </Link>

          <Link to="/login">
            <button className="header-button">Se connecter</button>
          </Link>
        </div>
      )}
      <div>
        <Link to="/Publish">
          <button className="header-button">Donner</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
