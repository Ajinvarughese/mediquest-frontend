import "./navbar.css";
import logo from "../../assests/images/logo1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUser } from "../../hooks/LocalStorageUser";


const patienNav = [
    {
      name: "Book Appointment",
      link: "/appointment-booking"
    },
    {
      name: "Insurance Claim",
      link: "/insurance-claim"
    }
]
const Nvbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div onClick={() => navigate("/")} className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="nav-items">
        {getUser().role && <Link to="/dashboard">Dashboard</Link>}
        {getUser().role === "PATIENT" && 
          patienNav.map((item, index) => (
            <Link to={item.link} key={index}><h3>{item.name}</h3></Link>
          ))
        }
        <Link to="/doctor-list">Doctor List</Link>
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