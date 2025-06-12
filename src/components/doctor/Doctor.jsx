import "./doctor.css";

const Doctor = ({ name, department, image }) => {
  return (
    <div className="doctor-container">
      <div className="doctor-image">
        <img src={image} alt="doctor" />
      </div>

      <div className="doctor-details">
        <h6>{name}</h6>
        <p>{department}</p>
      </div>
    </div>
  );
};

export default Doctor;
