import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../customHooks/useAuth';
import { findUser, updateUser, deleteUser } from '../data/repo';

function Profile(){
  const { setIsAuthenticated, userName } = useAuth();
  const [userData, setUserData] = useState(null);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();
  

  useEffect( () => {

      //function to retrieve data from database.
    const handleRetrieveData = async () => {
      const user = await findUser(userName);
      setUserData(user);
      setFormData({
        name: user.name,
        password: user.password,
        });
    }
    handleRetrieveData();

  }, [userName]);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate('/signin');
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account?");
    if (isConfirmed) {
      await deleteUser(userData.email);
      //localStorage.removeItem('userData');
      setIsAuthenticated(false);
      navigate('/signin');
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\]|:;'",.<>?/~]).{12,}$/;
    return passwordFormat.test(password);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setValidationError('Password must meet criteria.');
      return;
    }
    try {
      const response = await updateUser(userData.email, {
        name: formData.name,
        password: formData.password,
      });
      alert("Profile Updated!!");

    } catch (error) {
      console.error('Error updating profile:', error);
    }
    localStorage.setItem('userData', JSON.stringify({ ...userData, ...formData }));
    setEditing(false);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0">Profile Information</h2>
            </div>
            <div className="card-body">
              {userData && (
                <>
                  {!editing ? (
                    <div className="profile-details">
                      <p><strong>Name:</strong> {userData.name}</p>
                      <p><strong>Email:</strong> {userData.email}</p>
                      
                      <p><strong>Date of Joining:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
                      <button className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
                      <button className="btn btn-danger ml-3" onClick={handleDelete}>Delete Account</button>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProfile}>
                      <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Enter New Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          onChange={handleInputChange}
                          required
                        />
                        {validationError && <small className="text-danger">{validationError}</small>}
                      </div>
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                  )}
                </>
              )}
              <button className="btn btn-warning mt-3" onClick={handleSignOut}>Sign Out</button>
              {successMessage && <p className="text-success mt-3">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
