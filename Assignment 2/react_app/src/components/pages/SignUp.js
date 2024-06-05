import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../customHooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUser, findUser } from "../data/repo";

function SignUp() {
  const { setIsAuthenticated, setUserName } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  function getCurrentDate() {
    const now = new Date();
    return now.toISOString();
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit= async (event) => {
    event.preventDefault();

    // Perform validations
    const emailFormat = /^[^\s@]+@gmail\.com$/;
    if (!emailFormat.test(formData.email)) {
      setValidationError('Email must be in the correct format (e.g., example@gmail.com)');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\]|:;'",.<>?/~]).{12,}$/;
    if (!passwordRegex.test(formData.password)) {
      setValidationError('Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    // Check if the email is already registered
    const response = await findUser(formData.email);
    if (response != null) 
    {
      setValidationError('Email is already registered in database. Please use a different email.');
      return;
    }
    // const existingUserData = JSON.parse(localStorage.getItem('userData'));
    // if (existingUserData && existingUserData.email === formData.email) {
    //   setValidationError('Email is already registered in loclastorage. Please use a different email.');
    //   return;
    // }

    // Set dateJoined to current date
    const currentDate = getCurrentDate();
    
    const userData = { ...formData, dateJoined: currentDate };

    // Save to localStorage
    //localStorage.setItem('userData', JSON.stringify(userData));

    // Log the user in
    setValidationError('');
    setIsAuthenticated(true);
    


    //send data to repository
    const user = await createUser(formData);
    setUserName(user.email);

    // Clear form data after successful signup
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    
    alert("Sign Up Successful!!");
    navigate('/profile');
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h3 className="card-title text-center">Sign Up</h3>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                {validationError && <div className="alert alert-danger">{validationError}</div>}
                
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                <p className="mt-3 text-center">
                  Already have an account? <Link to="/SignIn">Log In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
