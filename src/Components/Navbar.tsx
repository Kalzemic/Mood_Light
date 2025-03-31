import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar" >
            <ul>
                <li><Link to="/">דף הבית</Link></li>
                <li><Link to="/Projects">הפרויקטים שלנו</Link></li>
                <li><Link to="/Design">עצבו שלט בעצמכם</Link></li>
                <li><Link to="/Product-Info">מידע על המוצר</Link></li>
                <li><Link to="/Contact">שלחו לנו לוגו משלכם</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;