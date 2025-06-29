import { motion } from 'framer-motion';
import './QAPage.css'
import './Page.css'
import TransitionSign from './TransitionSign';


const questions = ["question", "question", "question"
]

const QAPage = () => {
    return (
        <div className="page-content">
            <TransitionSign text="שאלות נפוצות" />
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


                {questions.map((question, index) => (
                    <div className="qa-card">
                        <h2>{question}</h2>
                    </div>
                ))}

            </motion.div>
        </div>
    );
}



export default QAPage;