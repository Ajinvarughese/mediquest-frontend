import "./footer.css"
import logo1 from "../../assests/images/logo1.jpg"
import ellipse4 from "../../assests/images/Ellipse 4.png"
import ellipse5 from "../../assests/images/ellipse5.png"

const Footer = () => {
    return (
        <>
            <div className="footer-container">

                <div className="footer-logo">
                    <img src={logo1} alt="footer-logo" />
                    <p>We aew a medicial clinic,<br />helping you for a better life.</p>
                </div>

                <div className="footer-medic">
                    <ul className="footer-lists">
                        <li>About</li>
                        <li>Appointment Booking</li>
                        <li>Doctor List</li>
                        <li>Insurance Claim</li>
                        <li>MEdicine Availability</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="footer-about">
                    <ul className="footer-lists">
                        <li>About</li>
                        <li>Medic</li>
                        <li>Vision & Mission</li>
                        <li>Careers</li>
                        <li>Support</li>
                        <li>FAQ</li>
                    </ul>
                </div>

                <div className="footer-social-media">
                    <ul className="footer-lists">
                        <li>Social Media</li>
                        <li>Twitter / X</li>
                        <li>Facebook</li>
                        <li>Instagram</li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <ul className="footer-lists">
                        <li>Contact</li>
                        <li>Austin Texas, 4567 Road Palm</li>
                        <li>+00 123 456 789</li>
                        <li>medi@test.com</li>
                    </ul>
                </div>

                <img className="footer-ellipse1" src={ellipse4} alt="ellipse4" />
                <img className="footer-ellipse2" src={ellipse5} alt="ellipse5" />

            </div>

            <div style={{width: "100%", textAlign: "center"}} className="footer-bottom">
                <p>&copy; 2025 All Right Preserved </p>
            </div>

        </>


    )
}

export default Footer