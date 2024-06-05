import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAllReviews, deleteReview } from '../data/review_repository';
import { useAuth } from '../customHooks/useAuth';
import {fetchAllReplies, createReply} from '../data/reply_repository';
import { useNavigate } from "react-router-dom";


function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { userName } = useAuth();
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchReviews();
    fetchReplies();
  }, []);

  const fetchReviews = async () => {
    try {
      const reviewsData = await fetchAllReviews();
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchReplies = async () => {
    try {
        const repliesData = await fetchAllReplies();
        setReplies(repliesData);
    }catch(error){
        console.error('Error fetching replies:', error);
    }
  }


  const userReviews = reviews.filter(review => review.email === userName);
  const otherReviews = reviews.filter(review => review.email !== userName);


  const handleDeleteReview = async (product_name) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (confirmDelete) {
        try {
        await deleteReview(userName, product_name);
        alert("Review Deleted Successfully!");
        fetchReviews();
        
        } catch (error) {
        console.error('Error deleting review:', error);
        }
    }
  };

const handleSubmitReply = async (descrip) =>{
    try{
        const reply_ ={
            text: reply,
            description: descrip,
            email: userName
        }
        await createReply(reply_);
        setReply('');
        alert("Reply posted!!");
        navigate('/');
        navigate('/reviews');
        
    }
    catch(error){
        console.error('Error creating reply:', error);
        }
};
const getMaxLengthInWords = (maxWords) => {
    const averageWordLength = 5; // Assuming an average word length of 5 characters
    const maxLength = maxWords * averageWordLength;
    return maxLength;
};

  return (
    <div className="container mt-5" style={{marginBottom: 70}}>
      <h2 className="mb-4">Your Reviews</h2>
      {userReviews.length > 0 ? (
        <div>
          {userReviews.map((review, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Review {index + 1}</h5>
                <p className="card-text" style={{color: "brown"}}><strong>Product Name:</strong> {review.product_name}</p>
                <p className="card-text"><strong>Rating:</strong> {review.rating}</p>
                <p className="card-text"><strong>Review:</strong> {review.description}</p>
                <h5 className="mt-3"> </h5>
                {replies
                .filter(reply => reply.description === review.description)
                .map((reply, replyIndex) => (
                    <div key={replyIndex} className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                        <div className="col-auto">  
                        </div>
                        <div className="col">
                            <p className="card-text">{reply.text}</p>
                            <p className="card-text">
                            <small className="text-muted">User: {reply.email}</small>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                <button className="btn btn-danger" onClick={() => handleDeleteReview(review.product_name)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews found for your account.</p>
      )}

      <h2 className="mt-5 mb-4" >Other Reviews</h2>
      {otherReviews.map((review, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Review {index + 1}</h5>
            <p className="card-text" style={{color: "brown"}}><strong>Product Name:</strong> {review.product_name}</p>
            <p className="card-text"><strong>Rating:</strong> {review.rating}</p>
            <p className="card-text"><strong>Review:</strong> {review.description}</p>
            <p className="card-text"><strong>Product Name:</strong> {review.product_name}</p>
            <p className="card-text"><strong>Reviewed User:</strong> {review.email}</p>
            <h5 className="mt-3"> </h5>
            {replies
            .filter(reply => reply.description === review.description)
            .map((reply, replyIndex) => (
                <div key={replyIndex} className="card mb-3">
                <div className="card-body">
                    <div className="row">
                    <div className="col-auto">  
                    </div>
                    <div className="col">
                        <p className="card-text">{reply.text}</p>
                        <p className="card-text">
                        <small className="text-muted">User: {reply.email}</small>
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            ))}

            <input
                type="text"
                className="form-control"
                id={`reply`}
                placeholder="Type your reply (max 100 characters)"
                maxLength={getMaxLengthInWords(100)}
                onChange={(e) => setReply(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={() => handleSubmitReply(review.description)}>Reply</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
