
import NeonSign from './NeonSign';
import './Page.css'
import './ProjectsPage.css'
import projectsData from './projects.json'
function ProjectsPage() {



    return (
        <div className="page-content">
            <div className="signs">
                <NeonSign text="Our " font='Dancing Script' color="#ff00ff" width={300} height={300} isOn={true} />
                <NeonSign text="Projects" font='Dancing Script' color="#0f9df0" width={300} height={300} isOn={true} />
            </div>
            <div className="projects-grid">
                {projectsData.projects.map((project, index) => (
                    <div className="project-card" key={index}>
                        <img src={project} />
                    </div>
                ))}
            </div>
        </div>
    );
}


export default ProjectsPage;