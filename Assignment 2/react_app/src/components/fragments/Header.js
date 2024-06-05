import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../customHooks/useAuth';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const { isAuthenticated, setIsAuthenticated, userName } = useAuth();
  const navigate = useNavigate();

  // Redirect to sign in page if user is not authenticated
  function handleSignOut() {
    setIsAuthenticated(false);
    navigate("/signin");
  }

  return (
    <header>
      <div className="container-fluid bg-success py-3">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <Link className="navbar-brand" to="/">S O I L</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                {isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/specials">Products</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/reviews">Reviews</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={handleSignOut}>Sign Out</button>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link">Welcome, {userName}!</span>
                    </li>
                  </>
                )}
                {!isAuthenticated && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">Sign In/Sign Up</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
