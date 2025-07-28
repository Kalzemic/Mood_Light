
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
                            <li><a href="#homepage" aria-label="קישור לדף הבית">דף הבית</a></li>
                            <li><a href="#projects" aria-label="קישור לדף הפרויקטים שלנו">הפרויקטים שלנו</a></li>
                            <li><a href="#design" aria-label="קישור לדף הזמנת שלט">עצבו שלט בעצמכם</a></li>
                            <li><a href="#custom" aria-label="קישור לשליחת רעיון שלכם">שלחו לנו רעיון משלכם</a></li>
                        </ul>
                    </div>
                    <div className="hamburger-menu" onClick={toggleSidebar}>
                        ☰
                    </div>
                </div>
            </nav>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href="#homepage" aria-label="קישור לדף הבית">דף הבית</a></li>
                    <li><a href="#projects" aria-label="קישור לדף הפרויקטים שלנו">הפרויקטים שלנו</a></li>
                    <li><a href="#design" aria-label="קישור לדף הזמנת שלט">עצבו שלט בעצמכם</a></li>
                    <li><a href="#custom" aria-label="קישור לשליחת רעיון שלכם">שלחו לנו רעיון משלכם</a></li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;
