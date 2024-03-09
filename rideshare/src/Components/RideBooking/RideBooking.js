import React, { useState } from 'react';
import './RideBooking.css';
import Map from '../Map/Map';
import FeedbackPage from '../FeedbackPage/feedback';

function RideBooking() {
  const [pickupLocation, setPickupLocation] = useState();
  const [destination, setDestination] = useState('');
  const [rideOptions, setRideOptions] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('');
  const feedback=localStorage.getItem("feedback");
  
  const pickupLocations = ['Location A', 'Location B', 'Location C'];
  const destinationLocations = ['Destination 1', 'Destination 2', 'Destination 3'];
  
    // Mock function to simulate fetching ride options based on pickup and destination
  const fetchRideOptions = () => {
    // This should ideally fetch from an API
    setRideOptions([
      { id: 1, name: 'Standard', eta: '5 mins', cost: '10 Rs.' },
      { id: 2, name: 'Premium', eta: '8 mins', cost: '20 Rs.' },
      { id: 3, name: 'Group', eta: '10 mins', cost: '15 Rs.' }
    ]);
  };

  const bookRide = () => {
    // This function would ideally interact with an API to book the ride
    if (selectedRide) {
      localStorage.setItem("ride",true)
      localStorage.setItem("address",pickupLocation)
      localStorage.setItem("drop",destination)
      localStorage.setItem("feedback",false)
      setBookingStatus(`Ride booked with ${selectedRide.name}. A driver will be there in ${selectedRide.eta}.`);
    } else {
      setBookingStatus('No ride option selected.');
    }
  };

  const cancelRide = () => {
    // This function would ideally interact with an API to book the ride
      localStorage.setItem("ride",false)
      localStorage.setItem("address",'')
      localStorage.setItem("drop",'')
      setBookingStatus(`Ride has been cancelled`);
      setSelectedRide()
    
  };

  return (
    <div>
    <div className="navbar">
        <div className="navbar-left">
          <span>Rideshare</span>
        </div>
        <div className="navbar-right">
          <p>Hello {localStorage.getItem("Name").split('@')[0]}!!</p>
          &nbsp;&nbsp;<i className="material-icons">account_circle</i>
        </div>
    </div>
    <div className="ride">
      <div className='Map'> { feedback==="true"?<FeedbackPage/>:<Map />}</div>
    <div className="ride-booking">
      <h1>
        Book a ride now
      </h1>
      <div className='input-box'>
      <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
        <option value="" className='m'>Select Pickup Location</option>
        {pickupLocations.map((location, index) => (
          <option key={index} value={location}>{location}</option>
        ))}
      </select>
      <i className='material-icons'>my_location</i>
      </div>
      <div className='input-box'>
      <select value={destination} onChange={(e) => setDestination(e.target.value)}>
        <option value="">Select Destination</option>
        {destinationLocations.map((destination, index) => (
          <option key={index} value={destination}>{destination}</option>
        ))}
      </select>
      <i className='material-icons'>location_on</i>
      </div>

      <button onClick={fetchRideOptions}>Find Rides</button>

      {rideOptions.length > 0 && (
        <div className="ride-options">
          <h3>Select a ride option:</h3>
          {rideOptions.map((option) => (
            <div className="ride-option" key={option.id}>
              <input
                type="radio"
                name="rideOption"
                value={option.id}
                onChange={() => setSelectedRide(option)}
              />
              {`${option.name} - ${option.eta} - ${option.cost}`}
            </div>
          ))}
        </div>
      )}

      <button onClick={bookRide}>Book Ride</button>
      {localStorage.getItem('ride')==='true' && <button onClick={bookRide}>Cancel Ride</button>}

      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
    {/* <div>
     { feedback==="true"?<FeedbackPage/>:<p></p>}
     </div> */}
    </div>
    </div>
  );
}

export default RideBooking;
