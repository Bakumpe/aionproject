import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import WelcomePage from "../components/WelcomePage";

function MyIndexPage() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <WelcomePage/>
        </div>
        <div className="sideBar">
          {" "}
          <Footer />
        </div>
      </div>

      <Whatsapp />
    </>
  );
}
export default MyIndexPage;
