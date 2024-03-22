import logo from "./logo.svg";
import "./App.css";
import QuoteApi from "./components/QuoteApi";
import CreateShipmentApi from "./components/CreateShipment_Api";
import TrackingApi from "./components/TrackingApi";
import CancelOrderApi from "./components/CancelOrderApi";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <QuoteApi />
      <CreateShipmentApi />
      <TrackingApi />
      <CancelOrderApi /> */}
    </div>
  );
}

export default App;
