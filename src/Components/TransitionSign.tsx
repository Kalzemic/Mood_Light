import { motion } from 'framer-motion'
import './Page.css'

type TransitionSignProps = {
    text: string;
};

const TransitionSign: React.FC<TransitionSignProps> = ({ text }) => {

    return (
        <div className="transition-sign">
            <motion.h1
                className="qa-head"
                initial={{ textShadow: "0 0 30px rgb(255, 143, 225)" }}
                animate={{
                    // textShadow: [
                    //     "0 0 1px rgb(255, 143, 225)",
                    //     "0 0 5px rgb(255, 143, 225)",
                    //     "0 0 10px rgb(255, 143, 225)",
                    //     "0 0 20px rgb(255, 143, 225)",
                    //     "0 0 10px rgb(255, 143, 225)",
                    //     "0 0 5px rgb(255, 143, 225)",
                    //     "0 0 1px rgb(255, 143, 225)",
                    //     "0 0 30px rgb(255, 143, 225)",
                    //     "0 0 15px rgb(255, 143, 225)",
                    //     "0 0 5px rgb(255, 143, 225)",
                    //     "0 0 0px rgb(255, 143, 225)",
                    // ],
                    // opacity: [
                    //     1, 0.8, 1, 0.5, 1, 0.3, 1, 0.7, 1
                    // ]
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                }}
            >
                {text}
            </motion.h1>
        </div>
    );
}


export default TransitionSign;