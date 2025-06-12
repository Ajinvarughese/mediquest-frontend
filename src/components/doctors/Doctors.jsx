import "./doctors.css";
import sphere2 from "../../assests/images/Ellipse 2.png";
import sphere3 from "../../assests/images/Ellipse 3.png";
import doctors from "../../assests/doctors"; // This is the doctor data array
import Doctor from "../doctor/Doctor"; // This is the Doctor component

const Doctors = () => {
  return (
    <div className="doctors-container">
      <h3>Our Doctors</h3>
      <p>
        Teamwork and effective communication among Doctor members is critical to <br />
        providing high-quality patient care and ensuring positive health outcomes.
      </p>

      <img className="sphere2" src={sphere2} alt="sphere2" />
      <img className="sphere3" src={sphere3} alt="sphere3" />

      <div className="doctors-wrapper">
        {doctors.map((doctor, index) => (
          <Doctor
            key={index}
            name={doctor.name}
            department={doctor.department}
            image={doctor.image}
          />
        ))}
      </div>

      <button>Explore More</button>
    </div>
  );
};

export default Doctors;
