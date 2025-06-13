import "./navbar.css";
import logo from "../../assests/images/logo1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUser } from "../../hooks/LocalStorageUser";


const Nvbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div onClick={() => navigate("/")} className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="nav-items">
        <Link to ="/about"><h3>About</h3></Link>
        <Link to="/appointment-booking"><h3>Appointment Booking</h3></Link>
        <Link to="/doctor-list"><h3>Doctor List</h3></Link>
        <Link to="/insurance-claim" >Insurance Claim</Link>
        <Link to="/medicine-availability">MedicineAvailability</Link>
        <h3>Contact</h3>

      </div>

      <div className="side-nav-items">
        {
          getUser().phone ? (
            <h3 onClick={() => {deleteUser(); window.location.reload()}} >Logout</h3>
          )
          :
          (
            <h3 onClick={() => navigate("/login")} >Login</h3>
          )
        }
      </div>
    </div>
  );
};

export default Nvbar;