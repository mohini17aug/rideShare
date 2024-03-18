import React, { useState } from "react";
import "./driver.css";
import axios from "axios";

const DriverPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState(null); // State to store vehicle details
    const hasRide = localStorage.getItem("ride");
    const [ride,setRide]=useState(false);
    const [data,setData]=useState([]);
    const [complete,setComplete]=useState([]);
    const [comp,setComp]=useState(false);
    const handleAddButtonClick = () => {
        setShowForm(true);
    };
    const handleRidesClick =()=>{
        console.log(localStorage.getItem("dName"));
        setComp(false)
        axios.get(`http://127.0.0.1:8000/ridesdetails/?username=${localStorage.getItem("dName")}`)
                    .then(response => {
                        console.log(response.data);
                        setData(response.data);
                        setRide(true);
                    })
                    .catch(error => {
                        setRide(false);
                        console.error('Error fetching rides:', error);
                    })
        
    }

    const handleFinishRideClick = () => {
        axios.post('http://127.0.0.1:8000/rides/complete/', {
            "passenger": data[0].passenger,
            "driver": data[0].driver
        })
        .then(response => {
          console.log(response.data)
          setRide(false)
          localStorage.setItem("feedback", true);
          localStorage.setItem("ride",false)
          })
        .catch(error => {
          console.error('Error:', error);

      });
    };
    const handlecomplete = () => {
        console.log(data)
        axios.get(`http://127.0.0.1:8000/ridesdetails/?username=${localStorage.getItem("dName")}&status=completed`)
        .then(response => {
          console.log(response.data)
          setComplete(response.data)
          setComp(true)
          })
        .catch(error => {
          console.error('Error:', error);

      });
    };

    const handleFormSubmit = (formData) => {
        localStorage.setItem("type",formData.type)
        localStorage.setItem("number",formData.number)
        setVehicleDetails(formData); // Save the entered vehicle details
        setShowForm(false); // Close the form after submission
    };

    const handleEditClick = () => {
        setShowForm(true); // Show the form for editing when Edit button is clicked
    };

    const handleDeleteClick = () => {
        setVehicleDetails(null); // Clear the vehicle details when Delete button is clicked
    };

    return (
        <div className="driver">
            <div className="navbar">
                <div className="navbar-left">
                    <span>Rideshare -Driver</span>
                </div>
                <div className="navbar-right">
                    <p>Welcome {localStorage.getItem("dName").split('@')[0]} !</p>
                    &nbsp;&nbsp;&nbsp;<i className="material-icons">account_circle</i>
                </div>
            </div>
            <div className="driver-dash">
            {showForm && (
                    <VehicleForm onSubmit={handleFormSubmit} initialData={vehicleDetails} />
                )}
                {vehicleDetails && ( // Render vehicle details if available
                    <div className="vehicle-details">
                        <h2>Vehicle Details</h2>
                        <p>Vehicle Type: {vehicleDetails.type}</p>
                        <p>Vehicle Number: {vehicleDetails.number}</p>
                        <button onClick={handleEditClick} className="edbtn">Edit</button>
                        <button onClick={handleDeleteClick} className="edbtn">Delete</button>
                    </div>
                )}
                <button onClick={handleAddButtonClick} className="add">Add vehicle</button>
                
                <button onClick={handleRidesClick} className="get">View Assigned Rides</button>

                <button onClick={handlecomplete} className="get">View All Completed Rides</button>
                {comp?(<>
                    {complete.map((item, index) => (
                    <div style={{margin:"5px"}}>
                    <b>Ride : {index+1}</b>
                    <p key={index}>PickUp : {item.pickup_location}</p>
                    <p key={index}>Destination : {item.destination}</p>
                    <p key={index}>Rating : {item.rating}</p>
                    <p key={index}>Feedback :{item.feedback}</p>
                    </div>
                    ))}
                    </>):(<p></p>)
                }
                
                {ride  ? (
                        <div>
                        <p>User Email : {data[0].passenger}</p>
                        <p>Pick up location : {data[0].pickup_location}</p>
                        <p>Drop Location : {data[0].destination}</p>
                        <button type="button" className="submit-btn" onClick={handleFinishRideClick}>Finish Ride</button>
                       </div>     
                ) : (
                    <div>
                       {!comp && <p>No Bookings available!!</p>}
                    </div>
                )}

            </div>
        </div>
    );
};

// VehicleForm component to handle the form for entering vehicle details
const VehicleForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || { type: "", number: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("type",formData.type)
        localStorage.setItem("number",formData.number)
        onSubmit(formData);
    };

    return (
        <div className="vehicle-form">
            <h2>Vehicle Details Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="type">Vehicle Type:</label>
                    <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="number">Vehicle Number:</label>
                    <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} />
                </div>
                <button type="submit" className="sbtn">Submit</button>
            </form>
        </div>
    );
};

export default DriverPage;
