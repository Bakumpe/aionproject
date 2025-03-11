import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";

function RegisterService(){
    return(
        <>
        <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Register Service</p>
          </div>
          
        </div>
      </div>

      <Whatsapp />
        </>
    )
}

export default RegisterService;