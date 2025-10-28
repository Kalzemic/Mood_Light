import { useEffect, useRef } from "react";

interface NeonSignProps {
    text: string;
    font: string;
    color: string;
    width: number;
    height: number;
    isOn: boolean;
    background?: string;
}

const NeonSign: React.FC<NeonSignProps> = ({
    text,
    font,
    color,
    width,
    height,
    isOn,
    background
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const bgImageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        let hue = 0;

        const drawText = (neonColor: string) => {
            const lines = text.split("\n"); // Support multi-line!
            const maxWidth = canvas.width * 0.9;
            const maxHeight = canvas.height * 0.9;

            // Start with a high guess and shrink down
            let fontSize = Math.min(canvas.width / Math.max(...lines.map(l => l.length)) * 2.2, 200);
            ctx.font = `${fontSize}px '${font}', cursive`;

            // Measure width + total height of block
            let textMetrics = lines.map(line => ctx.measureText(line));
            let lineHeight = fontSize * 1.25; // spacing multiplier
            let totalHeight = lineHeight * lines.length;

            // Shrink until fits width & height
            while (
                (Math.max(...textMetrics.map(t => t.width)) > maxWidth || totalHeight > maxHeight)
                && fontSize > 10
            ) {
                fontSize -= 2;
                ctx.font = `${fontSize}px '${font}', cursive`;
                textMetrics = lines.map(line => ctx.measureText(line));
                lineHeight = fontSize * 1.25;
                totalHeight = lineHeight * lines.length;
            }

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (isOn) {
                ctx.shadowColor = neonColor;
                ctx.shadowBlur = 70;
                ctx.strokeStyle = neonColor;
                ctx.fillStyle = neonColor;
            } else {
                ctx.shadowColor = "transparent";
                ctx.shadowBlur = 0;
                ctx.strokeStyle = "gray";
                ctx.fillStyle = "gray";
            }

            ctx.lineWidth = 3;

            // Top offset to vertically center block
            const startY = (canvas.height - totalHeight) / 2 + lineHeight / 2;

            lines.forEach((line, i) => {
                const y = startY + i * lineHeight;
                ctx.fillText(line, canvas.width / 2, y);
                ctx.strokeText(line, canvas.width / 2, y);
            });
        };



        const drawFrame = (neonColor: string) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (bgImageRef.current && bgImageRef.current.complete) {
                ctx.drawImage(bgImageRef.current, 0, 0, canvas.width, canvas.height);
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            drawText(neonColor);
        };

        const animate = () => {
            const neonColor = `hsl(${hue}, 100%, 50%)`;
            drawFrame(neonColor);
            hue = (hue + 1) % 360;
            animationRef.current = requestAnimationFrame(animate);
        };

        // preload background image once
        if (background) {
            const img = new Image();
            img.src = `/images/${background}`;
            img.onload = () => {
                bgImageRef.current = img;
                if (color.toLowerCase() === "rgb" && isOn) {
                    animationRef.current && cancelAnimationFrame(animationRef.current);
                    animate();
                } else {
                    drawFrame(color);
                }
            };
            img.onerror = () => {
                console.warn("⚠️ Failed to load background. Using fallback.");
                bgImageRef.current = null;
                drawFrame(color);
            };
        } else {
            bgImageRef.current = null;
            if (color.toLowerCase() === "rgb" && isOn) {
                animationRef.current && cancelAnimationFrame(animationRef.current);
                animate();
            } else {
                drawFrame(color);
            }
        }

        return () => {
            animationRef.current && cancelAnimationFrame(animationRef.current);
        };
    }, [text, font, color, width, height, isOn, background]);

    return (
        <canvas
            ref={canvasRef}
            className="neon-sign"
            style={{ width: "100%", height: "auto", display: "block" }}
        />
    );
};

export default NeonSign;
