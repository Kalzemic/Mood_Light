import NeonSign from './NeonSign';
import './Page.css'


function HomePage() {
    return (
        <div className="page-content">
            <div className="signs">
                <NeonSign text="Mood" font="Dancing Script" color="#ff00ff" width={300} height={300} isOn={true} />
                <NeonSign text=" Light" font="Dancing Script" color="#0f9df0" width={300} height={300} isOn={true} />
            </div>
        </div>
    );
}



export default HomePage;