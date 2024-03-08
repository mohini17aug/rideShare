import {React,useState} from "react";
import './Login.css';
import userData from './logindetails.json'
import { FaUser,FaLock } from "react-icons/fa";
import { Link ,useNavigate} from "react-router-dom";

const LoginForm = () =>{
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(userData);
    const userFound=userData.find(user => (user.email === email && user.password===password && user.role === role));
    console.log(userFound);
    if(userFound){
        alert('Login Successful');
        navigate("/register");
    }
    else{
        setError('Invalid username or password or role');
    }
  }

    return(
        <div className="login">
        <div className="loginform">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="radio-btn">
                    <label htmlFor="role">Role :</label>
                    <input type="radio" id="driver" name="role" value="Driver" checked={role === "Driver"} onChange={(e) => setRole(e.target.value)}/>Driver
                    <input type="radio" id="passenger" name="role" value="Passenger" checked={role === "Passenger"} onChange={(e) => setRole(e.target.value)}/>Passenger
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="/forgot">Forgot password?</a>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Login</button>
                <div className="register-link"><p>Don't have an account? <Link to="/register">Register</Link></p></div>
            </form>
          </div>
        </div>
    );
};

export default LoginForm;