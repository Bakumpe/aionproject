import Footer from "../components/Footer";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import "./car.css";

function Cars() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Find Your Perfect Vehicle</p>
          </div>
          <h1 className="ourservice">Cars For Hire</h1>
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
