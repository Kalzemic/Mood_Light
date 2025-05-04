
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

                    <button>עצבו שלט בעצמכם</button>
                    <button>כבר יש לכם רעיון? לשליחה לחצו כאן</button>

                </div>

                <div className="projects-grid">
                    {projectsData.projects.map((project, index) => (
                        <div className="project-card" key={index}>
                            <img src={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



export default HomePage;