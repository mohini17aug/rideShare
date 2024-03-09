import React, { useState } from 'react';
import './RideBooking.css';

function RideBooking() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [rideOptions, setRideOptions] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('');

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
      setBookingStatus(`Ride booked with ${selectedRide.name}. A driver will be there in ${selectedRide.eta}.`);
    } else {
      setBookingStatus('No ride option selected.');
    }
  };

  return (
    <div className="ride-booking">
      <select value={''} onChange={(e) => setPickupLocation(e.target.value)}>
        <option value="">Select Pickup Location</option>
        {pickupLocations.map((location, index) => (
          <option key={index} value={location}>{location}</option>
        ))}
      </select>

      <select value={''} onChange={(e) => setDestination(e.target.value)}>
        <option value="">Select Destination</option>
        {destinationLocations.map((destination, index) => (
          <option key={index} value={destination}>{destination}</option>
        ))}
      </select>
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

      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
  );
}

export default RideBooking;
