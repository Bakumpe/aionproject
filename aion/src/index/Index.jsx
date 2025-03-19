import React from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import WelcomePage from "../components/WelcomePage";
import SubHeading from "../components/SubHeading";

function MyIndexPage() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <WelcomePage/>
          <SubHeading />
        </div>
      </div>

      <Whatsapp />
    </>
  );
}
export default MyIndexPage;
