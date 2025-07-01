import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQPage.css';

const faqs = [
    { question: "זמן אספקה", answer: "זמן האספקה שלנו נע בין 14-25 ימי עסקים . כמובן שתמיד נשתדל לספק את השלט שלכם לפני." },
    { question: "אחריות", answer: "יש לכם אחריות על השלט למשך שנה, למעט ונדליזם." },
    { question: "האם ניתן לשלב איורים וטקסט באותו השלט?", answer: "כמובן, ניתן להכין שלטים מקוריים ומיוחדים, אנחנו תמיד מעדיפים לאתגר אותנו ולייצר שלטים מקוריים, דברו איתנו ונעזור להגשים כל רעיון" },
    { question: "האם ניתן לשלב כמה צבעים בשלט אחד?", answer: "כמובן, ניתן לשלב מגוון צבעים עבור שלט יחיד, אך אפשרויות מתקדמות כמו שלט מחליף צבעים ישפיעו על העלות" },
    { question: "עם מה השלט מגיע ?", answer: "כל שלט מגיע עם דימר שמחברים לשלט, שלט אישי לשלט שלכם שתוכלו בעזרתו לשלוט בעוצמת הבהירות של השלט שלכם וכך להחליט כמה תרצו שהוא יאיר את החלל שלכם, השלט מגיע בנוסף עם חבלי תלייה וברגים במידה ותרצו לשנות את אופן התלייה של השלט שלכם." }
];



const FAQPage = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="faq-page">
            <div className="qa-grid">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="qa-card"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={hoveredIndex === index ? 'answer' : 'question'}
                                className="qa-head"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {hoveredIndex === index ? faq.answer : faq.question}
                            </motion.h2>
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQPage;
