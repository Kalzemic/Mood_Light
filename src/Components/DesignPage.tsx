import { useState } from "react";
import NeonSign from "./NeonSign";
import backgrounds from './backgrounds.json'
import './DesignPage.css'
import emailjs from 'emailjs-com';
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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedColorName = colors.find(c => c.value === color)?.name || color;
        const templateParams = {
            name,
            email,
            phone,
            text,
            font,
            color: selectedColorName,
            background
        };

        emailjs.send(
            'Mood_Light_1',
            'order_form_1',
            templateParams,
            'ygrZNz9RXoV7GvbyF'
        )
            .then((response) => {
                alert('הפרטים נשלחו בהצלחה!');
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                alert('שגיאה בשליחה. נסו שוב מאוחר יותר.');
                console.error('FAILED...', error);
            });
    };


    const [isOn, setIsOn] = useState(true);


    return (
        <div className="page-content">
            <div className="signs">
                <NeonSign text="Custom " font="Dancing Script" color="#ff00ff" width={260} height={260} isOn={true} />
                <NeonSign text="Sign" font="Dancing Script" color="#0f9df0" width={260} height={260} isOn={true} />
            </div>
            <div className="design-page">
                <div className="custom-designer">
                    <form className="design-form" onSubmit={handleSubmit}>
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
                        <div className="segment">
                            <label>שם:</label>
                            <input type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="segment">
                            <label>:כתובת מייל</label>
                            <input type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="segment">
                            <label>:טלפון</label>
                            <input type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <button type="submit">שלח</button>
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