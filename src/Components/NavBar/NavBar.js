import React from 'react';
import './NavBar.css';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import imgUser from "../../img/Users.jpg";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const nombre = sessionStorage.getItem('nombre');
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fab fa-linkedin fa-2x"></i>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active d-flex flex-column text-center" aria-current="page" to="/home">
                  <i className="fas fa-home fa-lg"></i><span className="small">Inicio</span>
                </Link>
              </li>
              {location.pathname === '/adminProfile' && (
                <li className="nav-item">
                  <Link className="nav-link d-flex flex-column text-center" aria-current="page" to="/AdministrarPlaylist">
                    <i className="fas fa-user-friends fa-lg"></i><span className="small">Playlist</span>
                  </Link>
                </li>
              )}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={imgUser} className="rounded-circle" height="30" alt="" loading="lazy" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/listUsers">Mi perfil</a></li>
                  <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <span className="nav-link">{nombre}</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}


export default NavBar;