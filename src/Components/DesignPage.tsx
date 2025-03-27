import { useState } from "react";
import NeonSign from "./NeonSign";
import backgrounds from './backgrounds.json'
import './DesignPage.css'
const fonts = ["Sacramento", "Dancing Script", "Great Vibes", "Pacifico"];
const colors = [
    { name: "Pink", value: "#ff00ff" },
    { name: "Cyan", value: "#00ffff" },
    { name: "Orange", value: "#ff4500" },
    { name: "Yellow", value: "#ffff00" },
    { name: "Green", value: "#00ff00" }
];
function DesignPage() {
    const [text, setText] = useState("Mood Light");
    const [font, setFont] = useState("Sacramento");
    const [color, setColor] = useState("#ff00ff");
    const [background, setBackground] = useState("background1.jpg")

    const [isOn, setIsOn] = useState(true);


    return (
        <div className="page-content">
            <h1>עצבו שלט ניאון משלכם</h1>
            <div className="design-page">
                <div className="custom-designer">
                    <form className="design-form">
                        <div className="segment">
                            <label>הזינו את תוכן השלט</label>
                            <input type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)} />
                        </div>
                        <div className="segment">
                            <label>בחרו גופן</label>
                            <div className="font-options">
                                {fonts.map((fnt) => (
                                    <button
                                        type="button"
                                        key={fnt}
                                        className={fnt === font ? "selected-option" : ""}
                                        onClick={() => setFont(fnt)}
                                    >
                                        {fnt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="segment">
                            <label>בחרו רקע</label>
                            <div className="background-options">
                                <button
                                    type="button"
                                    className={background === "" ? "selected-option" : ""}
                                    onClick={() => setBackground("")}
                                >
                                    ללא רקע
                                </button>

                                {backgrounds.backgrounds.map((bg, index) => (
                                    <button
                                        type="button"
                                        key={index}
                                        className={bg === background ? "selected-option" : ""}
                                        style={{
                                            backgroundImage: `url(/images/${bg})`,
                                            backgroundSize: "cover",
                                            width: 60,
                                            height: 60,
                                        }}
                                        onClick={() => setBackground(bg)}
                                    />
                                ))}

                            </div>
                        </div>
                        <div className="segment">
                            <label>בחרו צבע</label>
                            <div className="color-options">
                                {colors.map((col) => (
                                    <button
                                        type="button"
                                        key={col.value}
                                        className={col.value === color ? "selected-option" : ""}
                                        style={{ backgroundColor: col.value, color: "white", width: 60, height: 60 }}
                                        onClick={() => setColor(col.value)}
                                    />
                                ))}
                            </div>
                        </div>
                    </form>
                </div >
                <div className="canvas-container">
                    <button onClick={() => { setIsOn(!isOn); }}>{isOn ? 'ON' : 'OFF'}</button>
                    <NeonSign text={text} font={font} color={color} background={background} width={550} height={550} isOn={isOn} />
                </div>
            </div>
        </div >
    );
}



export default DesignPage;