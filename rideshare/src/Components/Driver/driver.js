import React, { useState } from "react";
import "./driver.css"

const DriverPage = () => {
    const hasRide = localStorage.getItem("ride");
    console.log(hasRide)
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
        {hasRide === "true" ? (
                <div>
                    <p>User Email : {localStorage.getItem("Name")}</p>
                    <p>Pick up location : {localStorage.getItem("address")}</p>
                    <p>Drop Location : {localStorage.getItem("drop")}</p>
                    <button type="submit" className="submit-btn" onClick={localStorage.setItem("feedback",true)}>Finish Ride</button>
                </div>
            ) : (
                <div>
                    <p>No Bookings available!!</p>
                </div>
            )}
      </div>
    </div>
    );
};

export default DriverPage;

