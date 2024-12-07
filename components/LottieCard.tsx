
import React, { useEffect, useRef } from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "lottie-player": any;
        }
    }
}
interface LottieCardProps {
    src: string;
    width?: string;
}

function LottieCard({ src, width }: LottieCardProps) {
    const ref = useRef(null);
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    return (
        <div style={{ width: width }}>
            <lottie-player
                id="firstLottie"
                ref={ref}
                autoplay
                loop
                mode="normal"
                width="400"
                height="400"
                src={src}
            />
        </div>
    );
}

export default LottieCard;
