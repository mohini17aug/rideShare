import React, { useState }  from "react";
import './registration.css'
import axios from 'axios'
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [user, setUser] = useState({
        email: "",
        password: "",
        reEnterPassword: ""
    });
    const [error, setError] = useState('');
    const [isDriver, setIsDriver] = useState(false); 
    const [isPassenger, setIsPassenger] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    useEffect(() => {
        if (role === "Driver") {
            setIsDriver(true);
            setIsPassenger(false);
        } else if (role === "Passenger") {
            setIsDriver(false);
            setIsPassenger(true);
        }
    }, [role]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.email || !user.password || !user.reEnterPassword || !role) {
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
        console.log(isDriver)
        console.log(user.email+" "+user.password+" "+isDriver+" "+isPassenger)
        axios.post('http://127.0.0.1:8000/register/', {
            username: user.email,
            password: user.password,
            is_driver: isDriver,
            is_passenger: isPassenger
        })
        .then(response => {
            console.log(response.data);
            alert("Registration Successfull !!");
            navigate("/");
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors here
        });
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
                        <input type="email" name="email" placeholder="Username" onChange={handleChange} required />
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
