import React, { useState } from "react";
import './registration.css'
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.username || !user.email || !user.password || !user.reEnterPassword || !role) {
            setError('Please fill in all fields');
            return;
        }
        if(user.password.length<8){
            setError('Password should have minimum length of 8');
            return;
        }
        if (user.password !== user.reEnterPassword) {
            setError('Passwords do not match');
            return;
        }
        console.log(user);
        alert("Registration Successfull !!");
        navigate("/");
    };

    return (
        <div className="register">
            <div className="registerform">
                <form onSubmit={handleSubmit}>
                    <h1>Registration</h1>
                    <div className="radio-btn">
                        <label htmlFor="role">Role :</label>
                        <input type="radio" id="driver" name="role" value="Driver" checked={role === "Driver"} onChange={(e) => setRole(e.target.value)} />Driver
                        <input type="radio" id="passenger" name="role" value="Passenger" checked={role === "Passenger"} onChange={(e) => setRole(e.target.value)} />Passenger
                    </div>
                    <div className="input-box">
                        <input type="text" name="username" value={user.username} placeholder="Username" onChange={handleChange} required />
                    </div>
                    <div className="input-box">
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    </div>
                    <div className="input-box">
                        <input type="password" name="reEnterPassword" placeholder="Re Enter Password" onChange={handleChange} required />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit">Register</button>
                    <div className="login-link"><p>Already have an account? <Link to="/">Login</Link></p></div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
