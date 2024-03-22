import React, { useState } from "react";
import axios from "axios";
import "../styles/CancelOrderApi.css";
function CancelOrderApi() {
  const [orderId, setOrderId] = useState("");
  const [cancelResponse, setCancelResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://pfe-apigw-uat.porter.in/v1/orders/${orderId}/cancel`,
        null,
        {
          headers: {
            "X-API-KEY": "8c18d7ac-38a8-4930-a020-149b0fdf45d5",
            "Content-Type": "application/json",
          },
        }
      );
      setCancelResponse(response.data);
      setError(null);
    } catch (error) {
      console.error("Error canceling order:", error);
      setCancelResponse(null);
      setError("Error canceling order. Please try again later.");
    }
  };

  return (
    <div className="cancel-order-container">
      <h2 className="cancel-order-heading">Cancel Order</h2>
      <form onSubmit={handleCancel} className="cancel-order-form">
        <label className="order-id-label">
          Order ID:
          <input
            type="text"
            value={orderId}
            onChange={handleChange}
            className="order-id-input"
          />
        </label>
        <button type="submit" className="cancel-order-btn">
          Cancel Order
        </button>
      </form>

      {/* Display cancel response if available */}
      {cancelResponse && (
        <div className="json-response">
          <h3>Complete Response (JSON)</h3>
          <pre>{JSON.stringify(cancelResponse, null, 2)}</pre>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CancelOrderApi;
