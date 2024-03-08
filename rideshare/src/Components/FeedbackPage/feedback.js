import React, { useState } from "react";
import './feedback.css';
import { useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

const FeedbackPage = () => {
    const navigate=useNavigate();
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    const handleRatingChange = (ratingValue) => {
        setRating(ratingValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback:", feedback);
        console.log("Rating:", rating);
        navigate("/");
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
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default FeedbackPage;




// import React, { useState } from "react";

// const FeedbackPage = () => {
//     const [feedback, setFeedback] = useState('');
//     const [rating, setRating] = useState(0);

//     const handleFeedbackChange = (e) => {
//         setFeedback(e.target.value);
//     };

//     const handleRatingChange = (e) => {
//         setRating(parseInt(e.target.value));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Feedback:", feedback);
//         console.log("Rating:", rating);
//         // You can add your logic here to submit feedback and rating
//     };

//     return (
//         <div className="feedback-container">
//             <h1>Feedback</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="feedback">Feedback:</label>
//                     <textarea id="feedback" value={feedback} onChange={handleFeedbackChange} />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="rating">Rating:</label>
//                     <select id="rating" value={rating} onChange={handleRatingChange}>
//                         <option value="0">Select rating...</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="4">4</option>
//                         <option value="5">5</option>
//                     </select>
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default FeedbackPage;
