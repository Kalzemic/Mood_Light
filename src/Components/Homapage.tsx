
import { Link } from 'react-router-dom';
import DesignPage from './DesignPage';
import './Page.css'
import './ProjectsPage.css'
import projectsData from './projects.json'

function HomePage() {
    return (
        <div>
            <div className="page-content">
                <div className="logo">
                    {/* <NeonSign text="Mood" font="Dancing Script" color="#ff00ff" width={300} height={300} isOn={true} />
                <NeonSign text=" Light" font="Dancing Script" color="#0f9df0" width={300} height={300} isOn={true} /> */}
                    <img src="MoodLightLogoWhite.png" alt="Mood Light Logo" className="logo" />
                </div>
                <div className="buttons">

                    <button> <Link to="/Design">עצבו שלט בעצמכם</Link></button>
                    <button><Link to="/Custom">כבר יש לכם רעיון? לשליחה לחצו כאן</Link></button>

                </div>
            </div>
            <div className="page-content">
                <div className="projects-grid">
                    {projectsData.projects.map((project, index) => (
                        <div className="project-card" key={index}>
                            <img src={project} />
                        </div>
                    ))}
                </div>
            </div>
            <DesignPage />
        </div>
    );
}



export default HomePage;