import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { fetchAllProducts } from '../data/product_repository';
import { addToCart } from '../data/cart_repository';
import {createReview} from '../data/review_repository';
import { useAuth } from '../customHooks/useAuth';

function Specials() {
  const [specialsData, setSpecialsData] = useState([]);
  const [standardProductsData, setStandardProductsData] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [stars, setStars] = useState(1);
  const { userName } = useAuth();

  useEffect(() => {
    fetchSpecialsData();
  }, []);

  //Fetch all products data and seperate specials and standard products and display
  const fetchSpecialsData = async () => {
    try {
      const data = await fetchAllProducts();
      const specials = data.filter(product => product.inSpecial === 'Yes');
      const standardProducts = data.filter(product => product.inSpecial === 'No');
      setSpecialsData(specials);
      setStandardProductsData(standardProducts);
    } catch (error) {
      console.error('Error fetching specials data:', error);
    }
  };


  //add products to cart in database
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again later.');
    }
  };



  const handleReviewSubmit = async (productName) => {
    // Open the review modal when the button is clicked
    setSelectedProductName(productName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Close the review modal
    setShowModal(false);
    setSelectedProductName(null);
  };

  const create_review_for_product = async () => {
    const review = {
      description: reviewText,
      rating: parseInt(stars),
      email: userName,
      product_name: selectedProductName
      
    };
    // Create a new review for the selected product
    try {
      await createReview(review);
      
      setReviewText('');
      setStars(1);
      handleCloseModal();
      
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const getMaxLengthInWords = (maxWords) => {
    const averageWordLength = 5; // Assuming an average word length of 5 characters
    const maxLength = maxWords * averageWordLength;
    return maxLength;
};


  return (
    <div className="container mt-5" style={{marginBottom: 70}}>
      <div className="specials-container">
        <h2 className="mb-4">Specials of the Week</h2>
        {specialsData.length > 0 ? (
          <div className="row">
            {specialsData.map((special, index) => (
              <div key={index} className="col-md-4 mb-4">
                <Card style={{ backgroundColor: '#FFCCBC' }}>
                  <Card.Body>
                    <Card.Title>{special.name}</Card.Title>
                    <Card.Text>{special.description}</Card.Text>
                    <Card.Text className="mb-2" style={{color: "red"}}>Price: ${special.price}</Card.Text>
                    <Button variant="primary" onClick={() => handleAddToCart(special)}>Add to Cart</Button>
                    <Button variant="primary" style={{marginLeft: 5, backgroundColor: 'orange'}} onClick={() => handleReviewSubmit(special.name)}>
                      Leave a Review
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-specials">No specials available this week.</p>
        )}

        <div className="mt-5">
          <h2 className="mb-4">Standard Products</h2>
          {standardProductsData.length > 0 ? (
            <div className="row">
              {standardProductsData.map((product, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <Card style={{ backgroundColor: '#C8E6C9' }}>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text className="mb-2" style={{color: "green"}}>Price: ${product.price}</Card.Text>
                      <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                      <Button variant="primary" style={{marginLeft: 5, backgroundColor: 'orange'}} onClick={() => handleReviewSubmit(product.name)}>
                      Leave a Review
                    </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-products">No standard products available.</p>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <p className="text-center text-primary font-weight-bold">
            Review Form for Product: <span className="text-danger">{selectedProductName}</span>
          </p>
            <Form.Group controlId="reviewText">
            <Form.Label>Review (Maximum 100 words)</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                maxLength={getMaxLengthInWords(100)}
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="stars">
              <Form.Label>Stars</Form.Label>
              <Form.Control
                as="select"
                required
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </Form.Control>
            </Form.Group>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={create_review_for_product}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Specials;
