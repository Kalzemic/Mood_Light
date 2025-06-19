import { useState } from "react";

import './CustomPage.css'
import './DesignPage.css'
import './Page.css'
import emailjs from 'emailjs-com';


const sizes = ["62x20cm  : רגיל", "94x30cm : גדול", "109x35cm : גדול מאוד"]
const boards = ["ללא בורד אחורי", "חתוך לפי צורה"];


function CustomPage() {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [board, setBoard] = useState("");
    const [size, setSize] = useState("");
    const [base64Image, setBase64Image] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result as string);
            };
            reader.readAsDataURL(uploadedFile);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const templateParams = {
            name,
            email,
            phone,
            board,
            size,
            image: base64Image || "לא צורפה תמונה",
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
                setName("");
                setEmail("");
                setPhone("");
                setBoard("");
                setSize("");
                setBase64Image(null);
            }, (error) => {
                alert('שגיאה בשליחה. נסו שוב מאוחר יותר.');
                console.error('FAILED...', error);
            });
    };


    return (
        <div className="design-page">
            <form className="design-form" onSubmit={handleSubmit}>
                <h2>שלחו לנו שלט משלכם</h2>
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
                    <label className="block text-black font-bold mb-1" htmlFor="luah" >בחרו לוח אחורי</label>
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
                    <label className="block text-black font-bold mb-1" htmlFor="godel" >בחרו גודל</label>
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