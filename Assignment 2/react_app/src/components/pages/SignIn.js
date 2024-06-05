import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../customHooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { verifyUser } from "../data/repo";
import {clearCart} from '../data/cart_repository';

function SignIn() {
  const { setIsAuthenticated, setUserName } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const handleSubmit= async (event) => {
    event.preventDefault();

    // Get UserData from localStorage
    //const userData = JSON.parse(localStorage.getItem('userData'));


    //get user data from database
    const user = await verifyUser(email, password);

    
    if (user!=null) {
      setIsAuthenticated(true);
      setUserName(user.email);
      alert("Sign In Success!!");
      navigate('/');
      try {
        await clearCart();
      } catch (error) {
        console.error("Error clearing cart: ", error);
        alert("Failed to clear cart. Please try again.");
      }
    } else {
      setValidationError('Invalid username or password');
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign In</button>
                {validationError && <div className="alert alert-danger">{validationError}</div>} 
                 <div className="text-center mt-3">
                  <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
