

interface HeringAnswerProps {
    className?: string;
    eyeRadius?: number;
    opacity?: number;
}



export default function HeringAnswer({
    className = "",
    eyeRadius = 100000,
    opacity = 0,
    }: HeringAnswerProps) {

        return (
            <div id="hering-answer" className={`pointer-events-none ${className}`}
                 style={{opacity: `${opacity}` }}>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[var(--hering-EyeHeight-half)] w-full h-[var(--hering-EyeHeight-half)] flex-row-center overflow-hidden">
                    <div className={` border-primaryThickness border-primary rounded-full`}
                         style={{minWidth: `${eyeRadius}px`, minHeight: `${eyeRadius}px`}}/>

                </div>

                <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-[var(--hering-EyeHeight-half)] w-full h-[var(--hering-EyeHeight-half)] flex justify-center items-end overflow-hidden">
                    <div className={` border-primaryThickness border-primary rounded-full`}
                         style={{minWidth: `${eyeRadius}px`, minHeight: `${eyeRadius}px`}}/>
                </div>

                <div className="absolute-center z-30  w-[var(--hering-EyeballHeight)] h-[var(--hering-EyeballHeight)] flex-shrink-0 bg-background rounded-full border border-border"/>

            </div>
        );
}
