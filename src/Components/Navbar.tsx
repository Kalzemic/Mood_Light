import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    <img src="MoodLightLogo.png" alt="Company Logo" className="logo" />
                </div>
                <div className="navbar-center">
                    <ul>
                        <li><Link to="/">דף הבית</Link></li>
                        <li><Link to="/Design">עצבו שלט בעצמכם</Link></li>
                        <li><Link to="/Contact">שלחו לנו לוגו משלכם</Link></li>
                    </ul>
                </div>
                <div className="navbar-right" />
            </div>
        </nav>
    );
}

export default Navbar;
