
import { Link } from 'react-router-dom';
import DesignPage from './DesignPage';
import './Page.css'
import './ProjectsPage.css'
import projectsData from './projects.json'

function HomePage() {
    return (
        <div>
            <div className="background-wrapper">
                <img src="project3.jpeg" className="background-img" alt="bg" />
            </div>
            <div className="page-content">

                {/* <div className="logo">
                    <img src="MoodLightLogoWhite.png" alt="Mood Light Logo" className="logo" />
                </div> */}
                <div className="homepage-buttons">

                    <button aria-label="קישור לדף הזמנת שלט"> <Link to="/Design">עצבו שלט בעצמכם</Link></button>
                    <button aria-label="קישור לשליחת רעיון משלכם לשלט"><Link to="/Custom">כבר יש לכם רעיון? לשליחה לחצו כאן</Link></button>

                </div>

                <div className="projects-grid">
                    {projectsData.projects.map((project, index) => (
                        <div className="project-card" key={index}>
                            <img src={project} alt="תמונה עבור אחד הפרויקטים שלנו" />
                        </div>
                    ))}
                </div>
                <DesignPage />
            </div>

        </div>
    );
}



export default HomePage;