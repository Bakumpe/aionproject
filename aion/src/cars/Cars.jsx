import Footer from "../components/Footer";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import FetchCars from "./FetchCars";
import "./car.css"

function Cars() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <h1 className="vehicleHead">Vehicles</h1>
          <div>
            <FetchCars />
          </div>
        </div>
        <div className="sideBar">
          <Footer />
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default Cars;
