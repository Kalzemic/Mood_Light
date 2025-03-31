
import './Page.css'


function HomePage() {
    return (
        <div className="page-content">
            <div className="logo">
                {/* <NeonSign text="Mood" font="Dancing Script" color="#ff00ff" width={300} height={300} isOn={true} />
                <NeonSign text=" Light" font="Dancing Script" color="#0f9df0" width={300} height={300} isOn={true} /> */}
                <img src="/MoodLightLogoWhite.png" alt="Mood Light Logo" className="logo" />
            </div>
        </div>
    );
}



export default HomePage;