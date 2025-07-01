import { motion } from 'framer-motion';
import './QAPage.css'
import './Page.css'



const questions = ["question", "question", "question"
]

const QAPage = () => {
    return (
        <div>

            <motion.div
                className='qa-grid'
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,

                }}
                transition={{
                    duration: 1,

                }}
            >


                {questions.map((question) => (
                    <div className="qa-card">
                        <h2>{question}</h2>
                    </div>
                ))}

            </motion.div>
        </div>
    );
}



export default QAPage;