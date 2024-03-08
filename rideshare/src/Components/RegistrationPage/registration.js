import {React,useState} from "react";
import './registration.css'
import {Link, useNavigate} from 'react-router-dom';

const RegistrationForm = () =>{
    const navigate=useNavigate();
    const [role, setRole] = useState("");
    const [user ,setUser]=useState({
        username:"",
        email:"",
        password:"",
        reEnterPassword:""
    })

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    const {name,value}=e.target;
    console.log(e.target.name+" : "+e.target.value);
    setUser({
        ...user,
        [name]:value
    })
  }
  const handleSubmit = (e) =>{
    console.log(user);
    alert("Successful Submission!!");
    navigate("/");
  }

    return(
        <div className="register">
        <div className="registerform">
            <form>
                <h1>Registration</h1>
                <div className="radio-btn">
                    <label htmlFor="role">Role :</label>
                    <input type="radio" id="driver" name="role" value="Driver" checked={role === "Driver"} onChange={handleRoleChange}/>Driver
                    <input type="radio" id="passenger" name="role" value="Passenger" checked={role === "Passenger"} onChange={handleRoleChange}/>Passenger
                </div>
                <div className="input-box">
                    <input type="text" name="username"  value={user.username} placeholder="Username" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                    <input type="password" name ="reEnterPassword" placeholder="Re Enter Password" onChange={handleChange} required/>
                </div>
                <button type="submit" onClick={handleSubmit}>Register</button>
                <div className="login-link"><p>Already have an account? <Link to="/">Login</Link></p></div>
           </form>
          </div>
        </div>
    );
};

export default RegistrationForm;