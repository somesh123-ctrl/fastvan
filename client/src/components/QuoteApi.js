import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/QuoteApi.css";

function QuoteApi() {
  const [pickup, setPickup] = useState({ lat: "", lng: "" });
  const [drop, setDrop] = useState({ lat: "", lng: "" });
  const [customer, setCustomer] = useState({
    name: "",
    country_code: "+91",
    number: "",
  });
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [showQuote, setShowQuote] = useState(false);

  const quoteDetailsRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://fasvan-backend.onrender.com/api/quote",
        {
          pickup_details: pickup,
          drop_details: drop,
          customer: customer,
        }
      );
      setQuote(response.data);
      setError(null);
      setShowQuote(true);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setError("Error fetching quote. Please try again.");
      setQuote(null);
      setShowQuote(false);
    }
  };

  useEffect(() => {
    // Scroll to quote details when showQuote becomes true
    if (showQuote && quoteDetailsRef.current) {
      quoteDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showQuote]);

  return (
    <div className="form-container">
      <h1>Get a Quote</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pickupLat">Pickup Latitude:</label>
          <input
            type="text"
            id="pickupLat"
            value={pickup.lat}
            onChange={(e) => setPickup({ ...pickup, lat: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickupLng">Pickup Longitude:</label>
          <input
            type="text"
            id="pickupLng"
            value={pickup.lng}
            onChange={(e) => setPickup({ ...pickup, lng: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropLat">Drop Latitude:</label>
          <input
            type="text"
            id="dropLat"
            value={drop.lat}
            onChange={(e) => setDrop({ ...drop, lat: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropLng">Drop Longitude:</label>
          <input
            type="text"
            id="dropLng"
            value={drop.lng}
            onChange={(e) => setDrop({ ...drop, lng: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="countryCode">Country Code:</label>
          <input
            type="text"
            id="countryCode"
            value={customer.country_code}
            onChange={(e) =>
              setCustomer({ ...customer, country_code: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            value={customer.number}
            onChange={(e) =>
              setCustomer({ ...customer, number: e.target.value })
            }
          />
        </div>
        <button type="submit">Get Quote</button>
      </form>

      {showQuote && quote && (
        <div ref={quoteDetailsRef} className="quote-details">
          <h2>Quote Details</h2>
          {quote.Vehicles.map((vehicle, index) => (
            <div key={index} className="vehicle">
              <h3>{vehicle.type}</h3>
              <p>
                ETA: {vehicle.eta.value} {vehicle.eta.unit}
              </p>
              <p>
                Fare: {vehicle.fare.currency} {vehicle.fare.minor_amount / 100}
              </p>
              <p>
                Capacity: {vehicle.capacity.value} {vehicle.capacity.unit}
              </p>
              <p>
                Size: {vehicle.size.length.value} {vehicle.size.length.unit} x{" "}
                {vehicle.size.breadth.value} {vehicle.size.breadth.unit} x{" "}
                {vehicle.size.height.value} {vehicle.size.height.unit}
              </p>
            </div>
          ))}
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default QuoteApi;
