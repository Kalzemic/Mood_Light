import { useState } from "react";

import './CustomPage.css'
import './DesignPage.css'
import './Page.css'
import emailjs from 'emailjs-com';


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

const cable_entries = ["ימין", "שמאל", "למעלה", "למטה"]
const hang_types = ["ברגים", "חבלים"]
const cable_color = ["שחור", "שקוף"]


function CustomPage() {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [board, setBoard] = useState("");
    const [size, setSize] = useState("");
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [width, setWidth] = useState(60); // in cm
    const height = 28 + Math.floor((width - 60) / 3); // 10:1 rigidity
    const [cableEntry, setCableEntry] = useState("")
    const [cableColor, setCableColor] = useState("")
    const [hangType, setHangType] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [cableLength, setCableLength] = useState(2);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            setSelectedFile(uploadedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result as string);
            };
            reader.readAsDataURL(uploadedFile);
        }
    };


    async function uploadImageToCloudinary(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "moodlight_custom");

        const cloudName = "kalzemic";

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Upload failed");
        }

        const data = await response.json();
        return data.secure_url;
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email === "" || phone === "" || name === "") {
            alert("אירעה שגיאה, אנא וודאו שכתבתם שם, מייל ומספר טלפון")
            return;
        }
        try {
            let imageUrl = "לא צורפה תמונה";

            if (selectedFile) {
                imageUrl = await uploadImageToCloudinary(selectedFile);
            }

            const templateParams = {
                name,
                email,
                phone,
                board,
                width,
                height,
                cableEntry,
                cableColor,
                cableLength,
                hangType,
                image: imageUrl, // ✅ final hosted URL
            };

            await emailjs.send(
                'Mood_Light_1',
                'order_form_custom',
                templateParams,
                'ygrZNz9RXoV7GvbyF'
            );

            alert('הפרטים נשלחו בהצלחה!');
            setName("");
            setEmail("");
            setPhone("");
            setBoard("");
            setSize("");
            setBase64Image(null);
            setSelectedFile(null); // ✅ reset
        } catch (error) {
            console.error('FAILED...', error);
            alert('שגיאה בשליחה. נסו שוב מאוחר יותר.');
        }
    };



    return (
        <div className="design-page">
            <form className="design-form" onSubmit={handleSubmit}>
                <div className="segment">
                    <label className="block text-black font-bold mb-1" htmlFor="shem">שם:</label>
                    <input
                        className=" rounded-2xl bg-black text-pink-400 border border-pink-400 rounded px-3 py-2 placeholder-pink-300"
                        type="text"
                        id="shem"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="segment">
                    <label className="block text-black font-bold mb-1" htmlFor="email">:כתובת מייל</label>
                    <input
                        className=" rounded-2xl bg-black text-pink-400 border border-pink-400 rounded px-3 py-2 placeholder-pink-300"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="segment">
                    <label className="block text-black font-bold mb-1" htmlFor="telephone">:טלפון</label>
                    <input
                        className=" rounded-2xl bg-black text-pink-400 border border-pink-400 rounded px-3 py-2 placeholder-pink-300"
                        type="text"
                        id="telephone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="segment">
                    <label htmlFor="board-type">בחרו לוח אחורי</label>
                    <div className="board-options">
                        {boards.map(bo => (
                            <button
                                aria-label={bo}
                                id="board-type"
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
                        </div>
                    }
                </div>

                {/* Size Selection */}
                <div className="segment">
                    <label htmlFor="size">בחרו גודל</label>
                    <div className="size-options">
                        {sizes.map(si => (
                            <button
                                id="size"
                                key={si}
                                aria-label={si}
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
                        <label htmlFor="custom-size">
                            רוחב: {width} ס״מ &nbsp; | &nbsp; גובה: {height} ס״מ
                        </label>
                        <input
                            id="custom-size"
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
                    <label htmlFor="cable-length">בחרו מאיפה תרצו שהכבל ייצא מהשלט</label>
                    <div className="board-options">
                        {cable_entries.map(ce => (
                            <button
                                id="cable-length"
                                key={ce}
                                aria-label={ce}
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
                    <label htmlFor="cable-color">בחרו את צבע הכבל</label>
                    <div className="board-options">
                        {cable_color.map(cc => (
                            <button
                                id="cable-color"
                                key={cc}
                                aria-label={cc}
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
                    <label htmlFor="cable-length">בחרו אורך כבל (במטרים): {cableLength.toFixed(1)} מטר</label>
                    <input
                        id="cable-length"
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
                    <label htmlFor="board-option">בחרו אפשרות תלייה</label>
                    <div className="board-options">
                        {hang_types.map(ht => (
                            <button
                                id="board-option"
                                key={ht}
                                aria-label={ht}
                                type="button"
                                className={ht === cableColor ? "selected-option" : ""}
                                onClick={() => setHangType(ht)}
                            >
                                {ht}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="segment">
                    <label className="block text-black font-bold mb-1" htmlFor="fileUpload">בחר תמונה של השלט:</label>
                    <input
                        className="text-pink-400 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-pink-500 file:text-white
                     hover:file:bg-pink-400
                     bg-black rounded-2xl px-3 py-2
                     mx-auto block w-full max-w-xs"
                        type="file" id="fileUpload" accept="image/*" onChange={handleFileChange} />
                </div>

                {base64Image && (
                    <div className="image-preview">
                        <p>תצוגה מקדימה:</p>
                        <img src={base64Image} alt="Preview" style={{ maxWidth: "300px", borderRadius: "8px" }} />
                    </div>
                )}
                <div className="segment">
                    <button type="submit">שלח</button> </div>
            </form>
        </div>
    );

}


export default CustomPage;