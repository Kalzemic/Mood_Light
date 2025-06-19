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
  { name: "Cool White", value: "#f5f5f5" }
];

const sizes = [
  "62x20cm  : רגיל",
  "94x30cm : גדול",
  "109x35cm : גדול מאוד"
];

const boards = [
  "ללא בורד אחורי",
  "חתוך לפי צורה"
];

function DesignPage() {
  const [isOn, setIsOn] = useState(true);
  const [text, setText] = useState("Mood Light");
  const [font, setFont] = useState("Sacramento");
  const [color, setColor] = useState("#ff00ff");
  const [background, setBackground] = useState("background1.jpg");

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
            <label htmlFor="text">הזינו את תוכן השלט</label>
            <input id="text" type="text" value={text} onChange={e => setText(e.target.value)} />
          </div>

          {/* Font Selection */}
          <div className="segment">
            <label>בחרו גופן</label>
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
            </div>
          </div>

          {/* Color Selection */}
          <div className="segment">
            <label>בחרו צבע</label>
            <div className="color-options">
              {colors.map(col => (
                <button
                  key={col.value}
                  type="button"
                  style={{ backgroundColor: col.value, width: 60, height: 60 }}
                  className={col.value === color ? "selected-option" : ""}
                  onClick={() => setColor(col.value)}
                  aria-label={col.name}
                />
              ))}
            </div>
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
                  onClick={() => setSize(si)}
                >
                  {si}
                </button>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="segment">
            <label htmlFor="name">:שם</label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="segment">
            <label htmlFor="email">:כתובת מייל</label>
            <input id="email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="segment">
            <label htmlFor="phone">:טלפון</label>
            <input id="phone" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          <button type="submit">שלח</button>
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
