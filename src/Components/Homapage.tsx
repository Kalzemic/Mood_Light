
import { Link } from 'react-router-dom';
import DesignPage from './DesignPage';
import './Page.css'
import './ProjectsPage.css'
import './Homapage.css'
import projectsData from './projects.json'
import BackgroundCarousel from './BackgroundCarousel';

function HomePage() {
    return (
        <div>

            <BackgroundCarousel />
            <div className="page-content">
                <section id="homepage">
                    <div className="homepage-logo">
                        <img src="MoodLightLogo.png" alt="Mood Light Logo" className="logo" />
                    </div>
                    <div className="homepage-buttons">

                        <button aria-label="קישור לדף הזמנת שלט"> <Link to="/Design">עצבו שלט בעצמכם</Link></button>
                        <button aria-label="קישור לשליחת רעיון משלכם לשלט"><Link to="/Custom">כבר יש לכם רעיון? לשליחה לחצו כאן</Link></button>

                    </div>
                </section>
                <section id="projects">
                    <div className="projects-grid">
                        {projectsData.projects.map((project, index) => (
                            <div className="project-card" key={index}>
                                <img src={project} alt="תמונה עבור אחד הפרויקטים שלנו" />
                            </div>
                        ))}
                    </div>
                </section>
                <section id="design">
                    <DesignPage />
                </section>
            </div>

        </div>
    );
}



export default HomePage;