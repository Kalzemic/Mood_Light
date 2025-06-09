import { useEffect, useState } from 'react';
import './BackgroundCarousel.css';

const images = ['project1.jpeg', 'project2.jpeg', 'project3.jpeg', 'project4.jpg', 'project5.jpg', 'project6.jpg',
    'project7.jpg', 'project8.jpg', 'project_9.jpg', 'project_10.jpg', 'project_11.jpg'
];

const BackgroundCarousel: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3500); // change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="background-wrapper">
            {images.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    className={`background-img ${i === index ? 'active' : ''}`}
                    alt={`bg-${i}`}
                />
            ))}
        </div>
    );
};

export default BackgroundCarousel;
