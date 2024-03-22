import React, { useState } from "react";
import axios from "axios";
import "../styles/TrackingApi.css";
function TrackingApi() {
  const [orderId, setOrderId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://fasvan-backend.onrender.com/api/track/orderId"
      );
      setTrackingInfo(response.data);
      setError(null);
      scrollToTrackingInfo(); // Call scrollToTrackingInfo after setting tracking info
    } catch (error) {
      console.error("Error fetching tracking info:", error);
      setTrackingInfo(null);
      setError("Error fetching tracking info. Please try again later.");
    }
  };

  const scrollToTrackingInfo = () => {
    const trackingInfoElement = document.getElementById("tracking-info");
    if (trackingInfoElement) {
      trackingInfoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="tracking-container">
      <h2 className="tracking-title">Track Shipment</h2>
      <form className="tracking-form" onSubmit={handleSubmit}>
        <label className="tracking-label">
          Order ID:
          <input
            className="tracking-input"
            type="text"
            value={orderId}
            onChange={handleChange}
          />
        </label>
        <button className="tracking-button" type="submit">
          Track Shipment
        </button>
      </form>

      {/* Display tracking info if available */}
      {trackingInfo && (
        <div id="tracking-info" className="tracking-info">
          <h3 className="tracking-subtitle">Tracking Information</h3>
          <div className="tracking-details">
            <p>
              <strong>Tracking Number:</strong> {orderId}
            </p>
            <p>
              <strong>Status:</strong> {trackingInfo.status}
            </p>
            <p>
              <strong>Location:</strong> {trackingInfo.location}
            </p>
            <p>
              <strong>Estimated Delivery Date:</strong>{" "}
              {trackingInfo.estimated_delivery_date}
            </p>
            <div>
              <strong>Items:</strong>
              <ul>
                {trackingInfo.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default TrackingApi;
