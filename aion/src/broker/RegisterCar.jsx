import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";

function RegisterCar(){
    return(
        <>
        <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Register Car</p>
          </div>
          
        </div>
      </div>

      <Whatsapp />
        </>
    )
}

export default RegisterCar;