

import DesignPage from './DesignPage';
import './Page.css'
import './ProjectsPage.css'
import './Homapage.css'
import projectsData from './projects.json'
import CustomPage from './CustomPage';
import { motion } from 'framer-motion';
import TransitionSign from './TransitionSign';
import FAQPage from './FAQPage';


function HomePage() {

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
                <TransitionSign text="כמה מהשלטים שלנו"></TransitionSign>
                <section id="projects">

                    <div className="projects-grid">
                        {projectsData.projects.map((project, index) => (
                            <div className="project-card" key={index}>
                                <img src={project} alt="תמונה עבור אחד הפרויקטים שלנו" />
                            </div>
                        ))}
                    </div>
                </section>
                <TransitionSign text="עצבו שלט משלכם"></TransitionSign>
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

        </div>
    );
}



export default HomePage;