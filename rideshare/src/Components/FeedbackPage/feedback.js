import React, { useState } from "react";
import './feedback.css';
import { useNavigate ,Link} from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import axios from "axios";

const FeedbackPage = () => {
    const navigate=useNavigate();
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [ratingError, setRatingError] = useState('');

    const handleRatingChange = (ratingValue) => {
        setRating(ratingValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            setRatingError('Please provide a rating');
            return;
        } else {
            setRatingError('');
        }
        axios.post('http://127.0.0.1:8000/feedback/', {
            "passenger": localStorage.getItem("Name"),
            "rating":rating,
            "feedback":feedback
        }).then(response=>{
          console.log(response.data)
          localStorage.setItem("feedback",false)
          navigate("/booking");
          window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        })
        console.log("Feedback:", feedback);
        console.log("Rating:", rating);
    };

    return (
        <div className="feedback-container">
            <h1>Feedback</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Rating:</label>
                    <div className="rating">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <FaStar
                                    key={i}
                                    className="star"
                                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                                    onClick={() => handleRatingChange(ratingValue)}
                                />
                            );
                        })}
                    </div>
                </div>
                {ratingError && <div className="error-message">{ratingError}</div>}
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default FeedbackPage;
