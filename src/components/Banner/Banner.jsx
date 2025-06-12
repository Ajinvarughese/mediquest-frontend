import "./banner.css"
import ellipse from "../../assests/images/ellipse.png";
import doctor from "../../assests/images/banner-doctor.png";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="banner-container">
    <div className="banner-content">
      
      <div className="banner-heading">
        <h2>
          Every Good Thing <br />Start With Good <br />Health
        </h2>
      </div>
  
      <div className="banner-subheading">
        <p>
          We are here to serve people with <br/>patient-centered care to deliver 
          <br/>outstanding healthcare for
          better lives.
        </p>
      </div>
  
      <div className="banner-button">
        <button onClick={() => navigate("/appointment-booking")} className="banner-appoinment-button">Book Appointment</button>
        <button onClick={() => navigate("/")} className="banner-learn-button">Learn More</button>
      </div>
  
    </div>
  
    <div className="banner-graphics">
      <img src={ellipse} alt="ellipse" />
      <img src={doctor} alt="doctor" />
    </div>
  </div>
  
      
  )
}

export default Banner
