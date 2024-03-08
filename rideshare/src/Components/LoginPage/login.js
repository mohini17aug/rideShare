import {React,useState} from "react";
import './Login.css';
import { FaUser,FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () =>{
    const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

    return(
        <div className="login">
        <div className="loginform">
            <form action="">
                <h1>Login</h1>
                <div className="radio-btn">
                    <label htmlFor="role">Role :</label>
                    <input type="radio" id="driver" name="role" value="Driver" checked={role === "Driver"} onChange={handleRoleChange}/>Driver
                    <input type="radio" id="passenger" name="role" value="Passenger" checked={role === "Passenger"} onChange={handleRoleChange}/>Passenger
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Username" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="/forgot">Forgot password?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link"><p>Don't have an account? <Link to="/register">Register</Link></p></div>
            </form>
          </div>
        </div>
    );
};

export default LoginForm;