import { useState } from "react";

import './CustomPage.css'
import './DesignPage.css'
import './Page.css'
import emailjs from 'emailjs-com';
function CustomPage() {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
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
                setBase64Image(null);
            }, (error) => {
                alert('שגיאה בשליחה. נסו שוב מאוחר יותר.');
                console.error('FAILED...', error);
            });
    };


    return (
        <div className="design-page">
            <form className="design-form" onSubmit={handleSubmit}>
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
                <div className="segment">
                    <label htmlFor="fileUpload">בחר תמונה של השלט:</label>
                    <input type="file" id="fileUpload" accept="image/*" onChange={handleFileChange} />
                </div>

                {base64Image && (
                    <div className="image-preview">
                        <p>תצוגה מקדימה:</p>
                        <img src={base64Image} alt="Preview" style={{ maxWidth: "300px", borderRadius: "8px" }} />
                    </div>
                )}
                <button type="submit">שלח</button>
            </form>
        </div>
    );

}


export default CustomPage;