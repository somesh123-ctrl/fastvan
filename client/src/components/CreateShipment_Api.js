import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateShipmentApi.css"; // Import CSS file

function CreateShipmentApi() {
  // State to hold shipment data
  const [shipmentData, setShipmentData] = useState({
    request_id: "",
    delivery_instructions: {
      description: "",
    },
    pickup_details: {
      address: {
        apartment_address: "",
        street_address1: "",
        street_address2: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        lat: "",
        lng: "",
        contact_details: {
          name: "",
          phone_number: "",
        },
      },
    },
    drop_details: {
      address: {
        apartment_address: "",
        street_address1: "",
        street_address2: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        lat: "",
        lng: "",
        contact_details: {
          name: "",
          phone_number: "",
        },
      },
    },
    additional_comments: "",
  });

  // State to hold shipment response
  const [shipmentResponse, setShipmentResponse] = useState(null);

  // Function to handle input change
  const handleChange = (e, fieldPath) => {
    const { value } = e.target;
    setShipmentData((prevState) => ({
      ...prevState,
      [fieldPath]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://fasvan-backend.onrender.com/api/shipments",
        shipmentData,
        {
          headers: {
            "x-api-key": "8c18d7ac-38a8-4930-a020-149b0fdf45d5",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Shipment created successfully:", response.data);
      setShipmentResponse(response.data);
    } catch (error) {
      console.error("Error creating shipment:", error);
    }
  };

  // Component to display shipment response
  const ShipmentResponse = ({ data }) => {
    return (
      <div className="shipment-response">
        <h2>Shipment Created Successfully</h2>
        <p>Request ID: {data.request_id}</p>
        <p>Order ID: {data.order_id}</p>
        <p>Estimated Pickup Time: {data.estimated_pickup_time}</p>
        <p>
          Estimated Fare Details: {data.estimated_fare_details.currency}{" "}
          {data.estimated_fare_details.minor_amount}
        </p>
        <p>
          Tracking URL:{" "}
          <a href={data.tracking_url} target="_blank" rel="noopener noreferrer">
            {data.tracking_url}
          </a>
        </p>
      </div>
    );
  };

  return (
    <div className="create-shipment-container">
      <h2>Create Shipment</h2>
      <form onSubmit={handleSubmit} className="shipment-form">
        <label className="form-label">
          Request ID:
          <input
            type="text"
            value={shipmentData.request_id}
            onChange={(e) => handleChange(e, "request_id")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Delivery Instructions:
          <input
            type="text"
            value={shipmentData.delivery_instructions.description}
            onChange={(e) =>
              handleChange(e, "delivery_instructions.description")
            }
            className="form-input"
          />
        </label>
        <br />

        <h3>Pickup Address</h3>
        <label className="form-label">
          Apartment Address:
          <input
            type="text"
            value={shipmentData.pickup_details.address.apartment_address}
            onChange={(e) =>
              handleChange(e, "pickup_details.address.apartment_address")
            }
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Street Address 1:
          <input
            type="text"
            value={shipmentData.pickup_details.address.street_address1}
            onChange={(e) =>
              handleChange(e, "pickup_details.address.street_address1")
            }
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Street Address 2:
          <input
            type="text"
            value={shipmentData.pickup_details.address.street_address2}
            onChange={(e) =>
              handleChange(e, "pickup_details.address.street_address2")
            }
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Landmark:
          <input
            type="text"
            value={shipmentData.pickup_details.address.landmark}
            onChange={(e) => handleChange(e, "pickup_details.address.landmark")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          City:
          <input
            type="text"
            value={shipmentData.pickup_details.address.city}
            onChange={(e) => handleChange(e, "pickup_details.address.city")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          State:
          <input
            type="text"
            value={shipmentData.pickup_details.address.state}
            onChange={(e) => handleChange(e, "pickup_details.address.state")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Pincode:
          <input
            type="text"
            value={shipmentData.pickup_details.address.pincode}
            onChange={(e) => handleChange(e, "pickup_details.address.pincode")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Country:
          <input
            type="text"
            value={shipmentData.pickup_details.address.country}
            onChange={(e) => handleChange(e, "pickup_details.address.country")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Latitude:
          <input
            type="text"
            value={shipmentData.pickup_details.address.lat}
            onChange={(e) => handleChange(e, "pickup_details.address.lat")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Longitude:
          <input
            type="text"
            value={shipmentData.pickup_details.address.lng}
            onChange={(e) => handleChange(e, "pickup_details.address.lng")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Sender Name:
          <input
            type="text"
            value={shipmentData.pickup_details.address.contact_details.name}
            onChange={(e) =>
              handleChange(e, "pickup_details.address.contact_details.name")
            }
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Sender Phone Number:
          <input
            type="text"
            value={
              shipmentData.pickup_details.address.contact_details.phone_number
            }
            onChange={(e) =>
              handleChange(
                e,
                "pickup_details.address.contact_details.phone_number"
              )
            }
            className="form-input"
          />
        </label>
        <br />

        <h3>Drop Address</h3>
        <label className="form-label">
          Apartment Address:
          <input
            type="text"
            value={shipmentData.drop_details.address.apartment_address}
            onChange={(e) =>
              handleChange(e, "drop_details.address.apartment_address")
            }
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Street Address 1:
          <input
            type="text"
            value={shipmentData.drop_details.address.street_address1}
            onChange={(e) =>
              handleChange(e, "drop_details.address.street_address1")
            }
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Street Address 2:
          <input
            type="text"
            value={shipmentData.drop_details.address.street_address2}
            onChange={(e) =>
              handleChange(e, "drop_details.address.street_address2")
            }
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Landmark:
          <input
            type="text"
            value={shipmentData.drop_details.address.landmark}
            onChange={(e) => handleChange(e, "drop_details.address.landmark")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          City:
          <input
            type="text"
            value={shipmentData.drop_details.address.city}
            onChange={(e) => handleChange(e, "drop_details.address.city")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          State:
          <input
            type="text"
            value={shipmentData.drop_details.address.state}
            onChange={(e) => handleChange(e, "drop_details.address.state")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Pincode:
          <input
            type="text"
            value={shipmentData.drop_details.address.pincode}
            onChange={(e) => handleChange(e, "drop_details.address.pincode")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Country:
          <input
            type="text"
            value={shipmentData.drop_details.address.country}
            onChange={(e) => handleChange(e, "drop_details.address.country")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Latitude:
          <input
            type="text"
            value={shipmentData.drop_details.address.lat}
            onChange={(e) => handleChange(e, "drop_details.address.lat")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Longitude:
          <input
            type="text"
            value={shipmentData.drop_details.address.lng}
            onChange={(e) => handleChange(e, "drop_details.address.lng")}
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Receiver Name:
          <input
            type="text"
            value={shipmentData.drop_details.address.contact_details.name}
            onChange={(e) =>
              handleChange(e, "drop_details.address.contact_details.name")
            }
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Receiver Phone Number:
          <input
            type="text"
            value={
              shipmentData.drop_details.address.contact_details.phone_number
            }
            onChange={(e) =>
              handleChange(
                e,
                "drop_details.address.contact_details.phone_number"
              )
            }
            className="form-input"
          />
        </label>
        <br />

        <label className="form-label">
          Additional Comments:
          <textarea
            value={shipmentData.additional_comments}
            onChange={(e) => handleChange(e, "additional_comments")}
            className="form-textarea"
          />
        </label>
        <br />

        <button type="submit" className="submit-btn">
          Create Shipment
        </button>
      </form>
      {/* Display shipment response if available */}
      {shipmentResponse && <ShipmentResponse data={shipmentResponse} />}
    </div>
  );
}

export default CreateShipmentApi;
