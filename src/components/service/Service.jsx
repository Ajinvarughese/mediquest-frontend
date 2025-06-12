import { Link } from "react-router-dom";
import "./service.css";

const Service = ({ image, name, body, link }) => {
  const content = (
    <div className="service-container">
      <div className="service-icon">
        <img src={image} alt={name} />
      </div>

      <div className="service-head">
        <h5>{name}</h5>
      </div>

      <div className="service-body">
        <p>{body}</p>
      </div>
    </div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
};

export default Service;
