import { useState } from "react";
import NeonSign from "./NeonSign";
import backgrounds from './backgrounds.json'
import './DesignPage.css'
import emailjs from 'emailjs-com';
const fonts = ["Sacramento", "Dancing Script", "Great Vibes", "Pacifico", "Assistant"];
const colors = [
    { name: "Pink", value: "#ff00ff" },
    { name: "Cyan", value: "#00ffff" },
    { name: "Orange", value: "#ff4500" },
    { name: "Yellow", value: "#ffff00" },
    { name: "Green", value: "#00ff00" }
];
const sizes = ["62x20cm  : רגיל", "94x30cm : גדול", "109x35cm : גדול מאוד"]
const boards = ["ללא בורד אחורי", "חתוך לפי צורה"];
function DesignPage() {
    const [isOn, setIsOn] = useState(true);
    const [text, setText] = useState("Mood Light");
    const [font, setFont] = useState("Sacramento");
    const [color, setColor] = useState("#ff00ff");
    const [background, setBackground] = useState("background1.jpg")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [board, setBoard] = useState("");
    const [size, setSize] = useState("");

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
            board,
            size
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





    return (
        <div>
            <div className="design-page">
                <div className="custom-designer">
                    <form className="design-form" onSubmit={handleSubmit}>
                        <div className="segment">
                            <label htmlFor="text hashelet">הזינו את תוכן השלט</label>
                            <input id="text hashelet" type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)} />
                        </div>
                        <div className="segment">
                            <label htmlFor="gofan">בחרו גופן</label>
                            <div className="font-options">
                                {fonts.map((fnt) => (
                                    <button
                                        type="button"
                                        id="gofan"
                                        aria-label={fnt}
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
                            <label htmlFor="tseva">בחרו צבע</label>
                            <div className="color-options">
                                {colors.map((col) => (
                                    <button
                                        type="button"
                                        id="tseva"
                                        aria-label={col.name}
                                        key={col.value}
                                        className={col.value === color ? "selected-option" : ""}
                                        style={{ backgroundColor: col.value, color: "white", width: 60, height: 60 }}
                                        onClick={() => setColor(col.value)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="segment">
                            <label htmlFor="luah" >בחרו לוח אחורי</label>
                            <div className="board-options">
                                {boards.map((bo) => (
                                    <button
                                        type="button"
                                        id="luah"
                                        aria-label={bo}
                                        key={bo}
                                        className={bo === board ? "selected-option" : ""}
                                        onClick={() => setBoard(bo)}
                                    >
                                        {bo}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="segment">
                            <label htmlFor="godel" >בחרו גודל</label>
                            <div className="size-options">
                                {sizes.map((si) => (
                                    <button
                                        type="button"
                                        id="godel"
                                        aria-label={si}
                                        key={si}
                                        className={si === size ? "selected-option" : ""}
                                        onClick={() => setSize(si)}
                                    >
                                        {si}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="segment">
                            <label htmlFor="shem">שם:</label>
                            <input type="text"
                                id="shem"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="segment">
                            <label htmlFor="email">:כתובת מייל</label>
                            <input type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="segment">
                            <label htmlFor="telephone">:טלפון</label>
                            <input type="text"
                                id="telephone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <button type="submit">שלח</button>
                    </form>
                </div >
                <div className="canvas-container">
                    <button onClick={() => { setIsOn(!isOn); }}>{isOn ? 'ON' : 'OFF'}</button>
                    <NeonSign text={text} font={font} color={color} background={background} width={450} height={450} isOn={isOn} />
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
                                    aira-label="רקע"
                                    key={index}
                                    className={bg === background ? "selected-option" : ""}
                                    style={{
                                        backgroundImage: `url(/images/${bg})`,
                                        backgroundSize: "cover",
                                        width: 45,
                                        height: 45,
                                    }}
                                    onClick={() => setBackground(bg)}
                                />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}



export default DesignPage;