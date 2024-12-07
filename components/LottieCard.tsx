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
}

function LottieCard({ src }: LottieCardProps) {
    const ref = useRef(null);
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    return (
        <div style={{ width: "550px" }}>
            <lottie-player
                id="firstLottie"
                ref={ref}
                autoplay
                loop
                mode="normal"
                width="450"
                height="450"
                src={src}
            />
        </div>
    );
}

export default LottieCard;