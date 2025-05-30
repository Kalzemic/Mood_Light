import "./BackgroundVideo.css"

function BackgroundVideo(source: string) {
    return (
        <video className="background-video" autoPlay loop muted>
            <source src={source} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}



export default BackgroundVideo;