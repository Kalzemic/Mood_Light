
import './Navbar.css'
import { useState } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-left">
                        <img src="MoodLightLogo.png" alt="Company Logo" className="logo" />
                    </div>
                    <div className="navbar-center desktop-menu">
                        <ul>
                            <li><a href="#homepage">דף הבית</a></li>
                            <li><a href="#projects">הפרויקטים שלנו</a></li>
                            <li><a href="#design">עצבו שלט בעצמכם</a></li>
                            <li><a href="#custom">שלחו לנו לוגו משלכם</a></li>
                        </ul>
                    </div>
                    <div className="hamburger-menu" onClick={toggleSidebar}>
                        ☰
                    </div>
                </div>
            </nav>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href="#homepage" onClick={toggleSidebar}>דף הבית</a></li>
                    <li><a href="#projects" onClick={toggleSidebar}>הפרויקטים שלנו</a></li>
                    <li><a href="#design" onClick={toggleSidebar}>עצבו שלט בעצמכם</a></li>
                    <li><a href="#custom" onClick={toggleSidebar}>שלחו לנו לוגו משלכם</a></li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;
