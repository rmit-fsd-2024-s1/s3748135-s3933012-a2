import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/fragments/Footer';
import Header from './components/fragments/Header';
import HomePage from './components/pages/HomePage';
import Profile from './components/pages/Profile';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Specials from './components/pages/Specials';
import Cart from './components/pages/cart';
import Reviews from './components/pages/reviews';
import { AuthProvider } from './components/customHooks/useAuth';

function App() {
  
  return (
    <AuthProvider>
    <Router>
      <Header  />
      <Routes> 
        <Route exact path="/" element={<HomePage />} /> 
        <Route path="/signin" element={<SignIn  />} />
        <Route path="/signup" element={<SignUp  />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reviews" element={<Reviews />} />

      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;