

import DesignPage from './DesignPage';
import './Page.css'
import './ProjectsPage.css'
import './Homapage.css'
import projectsData from './projects.json'
import CustomPage from './CustomPage';
import { motion } from 'framer-motion';
import TransitionSign from './TransitionSign';
import FAQPage from './FAQPage';
import { useState } from 'react';


function HomePage() {

    const [popupImage, setPopupImage] = useState<string | null>(null);

    const handleImageClick = (imgSrc: string) => {
        setPopupImage(imgSrc);
    };

    const closePopup = () => {
        setPopupImage(null);
    };


    return (
        <div>


            <div className="page-content">
                <section id="homepage">
                    <div className="homepage-logo">
                        <motion.img
                            initial={{ filter: "drop-shadow(0 0 1px rgb(255, 143, 225))" }}
                            animate={{
                                filter: [
                                    "drop-shadow(0 0 1px rgb(255, 143, 225))",
                                    "drop-shadow(0 0 10px rgb(255, 143, 225))",
                                    "drop-shadow(0 0 30px rgb(255, 143, 225))",
                                    "drop-shadow(0 0 60px rgb(255, 143, 225))",
                                    "drop-shadow(0 0 30px rgb(255, 143, 225))",
                                    "drop-shadow(0 0 10px rgb(255, 143, 225))",
                                    "drop-shadow(0 0 1px rgb(255, 143, 225))"
                                ],
                                scale: [1, 1.1, 1]
                            }}
                            whileHover={{

                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            src="MoodLightLogo.png"
                            alt="Mood Light Logo"
                            className="logo"
                        />

                    </div>
                    <div className="homepage-buttons">
                        <ul>
                            <li><a href="#design" aria-label="קישור לדף הזמנת שלט">עצבו שלט בעצמכם</a></li>
                            <li><a href="#custom" aria-label="קישור לשליחת רעיון משלכם לשלט">כבר יש לכם רעיון?</a></li>
                        </ul>
                    </div>
                </section>
                <TransitionSign text="הפרויקטים שלנו"></TransitionSign>
                <section id="projects">
                    <div className="projects-grid">
                        {projectsData.projects.map((project, index) => (
                            <div
                                className="project-card"
                                key={index}
                                onClick={() => handleImageClick(project)}
                            >
                                <img src={project} alt="תמונה עבור אחד הפרויקטים שלנו" />
                            </div>
                        ))}
                    </div>
                </section>

                {popupImage && (
                    <div className="image-popup" onClick={closePopup}>
                        <img
                            src={popupImage}
                            alt="תמונה מוגדלת"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
                        />
                    </div>
                )}
                <TransitionSign text="עצבו שלט בעצמכם"></TransitionSign>
                <section id="design">

                    <DesignPage />
                </section>
                <TransitionSign text="שלחו לנו את הרעיון שלכם"></TransitionSign>
                <section id="custom">
                    <CustomPage />
                </section>
                <TransitionSign text="שאלות נפוצות" />
                <section id="qa">
                    <FAQPage />
                </section>

            </div>


            <footer className="contact-footer">
                <div className="footer-content">
                    {/* <span>📞 טלפון: 052-577-2886</span><br /> */}
                    <span>✉️ אימייל: mood.light.sa@gmail.com</span><br />
                    <div className="footer-legal">
                        <span>© {new Date().getFullYear()} Mood-Light-ltd — כל הזכויות שמורות</span><br />
                        <span className="signature">Made by Michael Zizov</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}



export default HomePage;