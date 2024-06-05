import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Retrieve products data from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('productsData'));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []); 

  return (
    <div className="container py-5" style={{ fontFamily: 'Georgia, serif', color: '#Black' }}>
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3" style={{ fontWeight: 'bold', color: 'black' }}>Welcome to SOIL - Organic Products Online</h1>
        <p className="lead" style={{ color: 'black' }}>Discover a wide range of organic products available for purchase online at SOIL.</p>
      </div>
      
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card" style={{ border: '1px solid #ccc', boxShadow: 'none' }}>
              
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', color: '#black' }}>{product.name}</h5>
                <p className="card-text" style={{ color: '#34495e' }}>{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
        <div className="container">
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <h2 style={{ fontWeight: 'bold', color: 'Black' }}>Why Choose SOIL?</h2>
          <ul className="list-group">
            <li style={{ fontWeight: 'bold', color: 'Black' }} >High-quality organic products</li>
            <li style={{ fontWeight: 'bold', color: 'Black' }}>Wide variety of choices</li>
            <li style={{ fontWeight: 'bold', color: 'Black' }}>Fast and reliable delivery</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h2 style={{ fontWeight: 'bold', color: 'Black' }}>Contact Us</h2>
          <p style={{ color: 'Black' }}>If you have any questions or inquiries, feel free to contact us at <a href="mailto:support@soil.com" style={{ color: 'blue' }}>support@soil.com</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
