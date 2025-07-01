import { useState } from "react";
import emailjs from 'emailjs-com';
import NeonSign from "./NeonSign";
import backgrounds from './backgrounds.json';
import './DesignPage.css';



const fonts = [
    "Sacramento", "Dancing Script", "Great Vibes", "Pacifico", "Assistant",
    "Rubik", "Amatic SC", "Baloo 2", "Bangers", "Caveat",
    "Comfortaa", "Courgette", "Fugaz One", "Indie Flower", "Lobster",
    "Montserrat", "Orbitron", "Playfair Display", "Raleway", "Satisfy",
    "Teko", "Tinos", "Ubuntu", "Varela Round", "Yanone Kaffeesatz"
];

const cable_entries = ["ימין", "שמאל"]
const hang_types = ["ברגים", "חבלים"]
const cable_color = ["שחור", "שקוף"]

const colors = [
    { name: "Pink", value: "#ff00ff" },
    { name: "Hot Pink", value: "#ff69b4" },
    { name: "Red", value: "#ff0000" },
    { name: "Orange", value: "#ff4500" },
    { name: "Yellow", value: "#ffff00" },
    { name: "Light Yellow", value: "#ffffcc" },
    { name: "Lime", value: "#bfff00" },
    { name: "Green", value: "#00ff00" },
    { name: "Turquoise", value: "#40e0d0" },
    { name: "Cyan", value: "#00ffff" },
    { name: "Light Blue", value: "#add8e6" },
    { name: "Blue", value: "#0000ff" },
    { name: "Indigo", value: "#4b0082" },
    { name: "Purple", value: "#800080" },
    { name: "Lavender", value: "#e6e6fa" },
    { name: "White", value: "#ffffff" },
    { name: "Warm White", value: "#fefbd8" },
    { name: "Gold", value: "#ffd700" },
    { name: "Silver", value: "#c0c0c0" },
    { name: "Cool White", value: "#f5f5f5" },
    { name: "RGB", value: "rgb" }

];

const sizes = [
    "62x20cm  : רגיל",
    "94x30cm : גדול",
    "109x35cm : גדול מאוד",
    "בחירה אישית"
];

const presetDimensions: Record<string, { width: number, height: number }> = {
    "62x20cm  : רגיל": { width: 62, height: 20 },
    "94x30cm : גדול": { width: 94, height: 30 },
    "109x35cm : גדול מאוד": { width: 109, height: 35 }
};


const boards = [
    "ללא בורד אחורי",
    "חתוך לפי צורה",
    "בורד מרובע"
];

const board_image: any = {
    "ללא בורד אחורי": "/no_board.jpg",
    "חתוך לפי צורה": "/shape_board.jpg",
    "בורד מרובע": "/square_board.jpg"
}

function DesignPage() {
    const [isOn, setIsOn] = useState(true);
    const [text, setText] = useState("Mood Light");
    const [font, setFont] = useState("Sacramento");
    const [color, setColor] = useState("#ff00ff");
    const [background, setBackground] = useState("sign_background1.jpg");
    const [width, setWidth] = useState(60); // in cm
    const height = 28 + Math.floor((width - 60) / 3); // 10:1 rigidity
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [board, setBoard] = useState("");
    const [size, setSize] = useState("");
    const [cableEntry, setCableEntry] = useState("")
    const [cableColor, setCableColor] = useState("")
    const [hangType, setHangType] = useState("")
    const [cableLength, setCableLength] = useState(2);


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
            cableEntry,
            cableColor,
            cableLength,
            hangType,
            width,
            height
        };


        emailjs.send(
            'Mood_Light_1',
            'order_form_1',
            templateParams,
            'ygrZNz9RXoV7GvbyF'
        ).then(() => {
            alert('הפרטים נשלחו בהצלחה!');
        }).catch((error) => {
            console.error('FAILED...', error);
            alert('שגיאה בשליחה. נסו שוב מאוחר יותר.');
        });
    };

    return (
        <div className="design-page">
            {/* Form Section */}
            <div className="custom-designer">
                <form className="design-form" onSubmit={handleSubmit}>

                    {/* Text Input */}
                    <div className="segment">
                        <label htmlFor="text" className="block text-black font-bold mb-1">הזינו את תוכן השלט</label>
                        <input
                            className=" rounded-2xl bg-black text-pink-400 border border-pink-400 rounded px-3 py-2 placeholder-pink-300"
                            id="text" type="text" value={text} onChange={e => setText(e.target.value)} />
                    </div>

                    {/* Font Selection */}
                    <div className="segment">
                        <label className="block text-black font-bold mb-1">בחרו גופן</label>
                        <div className="font-options">
                            {fonts.map(fnt => (
                                <button
                                    key={fnt}
                                    type="button"
                                    style={{ fontFamily: fnt }}
                                    className={fnt === font ? "selected-option" : ""}
                                    onClick={() => setFont(fnt)}
                                >
                                    {fnt}
                                </button>

                            ))}
                            <h3>לגופן אחר צרו איתנו קשר</h3>
                        </div>
                    </div>


                    <div className="segment">
                        <label className="block text-black font-bold mb-1">בחרו צבע</label>
                        <div className="color-options">
                            {colors.map(col => (
                                <button
                                    key={col.value}
                                    type="button"
                                    style={{
                                        width: 60,
                                        height: 60,
                                        ...(col.value === "rgb"
                                            ? {
                                                backgroundImage: "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)",
                                                backgroundSize: "100% 100%",
                                                animation: "rainbowMove 4s linear infinite",
                                                border: "1px solid black"
                                            }
                                            : { backgroundColor: col.value })
                                    }}
                                    className={col.value === color ? "selected-option" : ""}
                                    onClick={() => setColor(col.value)}
                                    aria-label={col.name}
                                />
                            ))}
                        </div>
                        {color === "rgb" &&

                            <h3>שלט מחליף צבעים</h3>

                        }
                    </div>



                    {/* Board Selection */}
                    <div className="segment">
                        <label>בחרו לוח אחורי</label>
                        <div className="board-options">
                            {boards.map(bo => (
                                <button
                                    key={bo}
                                    type="button"
                                    className={bo === board ? "selected-option" : ""}
                                    onClick={() => setBoard(bo)}
                                >
                                    {bo}
                                </button>
                            ))}
                        </div>
                        {board != "" &&
                            <div className="selected-board">
                                <div

                                    style={{
                                        backgroundImage: `url(/boards${board_image[board]})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        width: 200,
                                        height: 200,
                                    }} />
                            </div>
                        }
                    </div>

                    {/* Size Selection */}
                    <div className="segment">
                        <label>בחרו גודל</label>
                        <div className="size-options">
                            {sizes.map(si => (
                                <button
                                    key={si}
                                    type="button"
                                    className={si === size ? "selected-option" : ""}
                                    onClick={() => {
                                        setSize(si);
                                        if (si === "בחירה אישית") {
                                            // keep width as-is
                                        } else {
                                            const dims = presetDimensions[si];
                                            if (dims) {
                                                setWidth(dims.width);
                                            }
                                        }
                                    }}
                                >
                                    {si}
                                </button>
                            ))}


                        </div>
                    </div>
                    {size === "בחירה אישית" && (
                        <div className="segment">
                            <label>
                                רוחב: {width} ס״מ &nbsp; | &nbsp; גובה: {height} ס״מ
                            </label>
                            <input
                                className="size-slider"
                                type="range"
                                min="70"
                                max="200"
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}
                    <div className="segment">
                        <label>בחרו מאיפה תרצו שהכבל ייצא מהשלט</label>
                        <div className="board-options">
                            {cable_entries.map(ce => (
                                <button
                                    key={ce}
                                    type="button"
                                    className={ce === cableEntry ? "selected-option" : ""}
                                    onClick={() => setCableEntry(ce)}
                                >
                                    {ce}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="segment">
                        <label>בחרו את צבע הכבל</label>
                        <div className="board-options">
                            {cable_color.map(cc => (
                                <button
                                    key={cc}
                                    type="button"
                                    className={cc === cableColor ? "selected-option" : ""}
                                    onClick={() => setCableColor(cc)}
                                >
                                    {cc}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="segment">
                        <label>בחרו אורך כבל (במטרים): {cableLength.toFixed(1)} מטר</label>
                        <input
                            type="range"
                            min="0.5"
                            max="5"
                            step="0.1"
                            value={cableLength}
                            onChange={(e) => setCableLength(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="segment">
                        <label>בחרו אפשרות תלייה</label>
                        <div className="board-options">
                            {hang_types.map(ht => (
                                <button
                                    key={ht}
                                    type="button"
                                    className={ht === cableColor ? "selected-option" : ""}
                                    onClick={() => setHangType(ht)}
                                >
                                    {ht}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* User Info */}
                    <div className="segment">
                        <label className="block text-black font-bold mb-1" htmlFor="name">:שם</label>
                        <input
                            className="rounded-2xl bg-black text-pink-400 border border-pink-400 rounded px-3 py-2 placeholder-pink-300"
                            id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="segment">
                        <label className="block text-black font-bold mb-1" htmlFor="email">:כתובת מייל</label>
                        <input
                            className="rounded-2xl bg-black text-pink-400 border border-pink-400 rounded px-3 py-2 placeholder-pink-300"
                            id="email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="segment">
                        <label className="block text-black font-bold mb-1" htmlFor="phone">:טלפון</label>
                        <input
                            className="rounded-2xl bg-black text-pink-400 border border-pink-400 rounded px-3 py-2 placeholder-pink-300"
                            id="phone" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className="segment">
                        <button type="submit">שלח</button>
                    </div>
                </form>
            </div>

            {/* Preview Section */}
            <div className="canvas-container">
                <button onClick={() => setIsOn(!isOn)}>{isOn ? 'ON' : 'OFF'}</button>
                <NeonSign
                    text={text}
                    font={font}
                    color={color}
                    background={background}
                    width={750}
                    height={750}
                    isOn={isOn}
                />

                {/* Background Selector */}
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
                                key={index}
                                type="button"
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
    );
}

export default DesignPage;
