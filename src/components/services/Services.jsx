import Service from "../service/Service";
import "./services.css";
import services from "../../assests/services"; 

const Services = () => {
  return (
    <div className="services-container">
      <h3>Our Services</h3>

      <div className="services-wrapper">
        {services.map((item, index) => (
          <Service
            key={index}
            image={item.image}
            name={item.name}
            body={item.body}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
