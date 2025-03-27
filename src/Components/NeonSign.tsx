import { useEffect, useRef } from "react";


interface NeonSignProps {
    text: string;
    font: string;
    color: string;
    width: number;
    height: number;
    background?: string;
    isOn: boolean
}

const NeonSign: React.FC<NeonSignProps> = ({ text, font, color, background, width, height, isOn }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Fixed canvas size regardless of background
        const canvasWidth = width;
        const canvasHeight = height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const drawText = (ctx: CanvasRenderingContext2D, width: number, height: number, isOn: boolean) => {
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = `80px '${font}', cursive`;
            // Stronger Neon Glow Effect
            if (isOn) {
                ctx.shadowColor = color;
                ctx.shadowBlur = 70; // Increased glow effect
                ctx.strokeStyle = color;
            }
            else {
                ctx.shadowBlur = 0;
            }
            ctx.lineWidth = 3;

            // Draw glowing stroke effect
            ctx.strokeText(text, width / 2, height / 2);

            // Fill with neon color
            if (isOn)
                ctx.fillStyle = color;
            else
                ctx.fillStyle = "gray";
            ctx.fillText(text, width / 2, height / 2);
        };

        document.fonts.ready.then(() => {
            if (background) {
                const bgImage = new Image();
                bgImage.src = `/images/${background}`;

                bgImage.onload = () => {
                    ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);
                    drawText(ctx, canvasWidth, canvasHeight, isOn);
                };
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                drawText(ctx, canvasWidth, canvasHeight, isOn);
            }
        });
    }, [text, font, color, background, height, width, isOn]);


    return <canvas ref={canvasRef} className="neon-sign" />;
};

export default NeonSign;
