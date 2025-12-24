interface AbsoluteArcProps {
    angle?: string;
    innerRadius?: string;
    thickness?: string;
    className?: string;
    x?: string;
    y?: string;
    scale?: string;
    rotate?: string;
    direction?: "center" | "left" | "right";
    color?: string;
}


const directionOptions = {
    center: "calc(var(--arc-angle)/-2)",
    left: "calc(-1 * var(--arc-angle))",
    right: "0deg",
}


export default function AbsoluteArc({
    angle = "30deg",
    innerRadius = "1000px",
    thickness = "100px",
    className = "",
    x = "0",
    y = "0",
    scale = "1",
    rotate = "0deg",   
    direction = "right",
    color = "var(--border-mainLine)",
}: AbsoluteArcProps) {
    const style = {
        '--arc-angle': angle,
        '--arc-innerRadius': innerRadius,
        '--arc-thickness': thickness,
        '--arc-startAngle': directionOptions[direction],
        '--arc-color': color,
    } as React.CSSProperties;

    return (
        <div className={`absolute-center`}>
            <div className={`w-0 h-0`}
                 style={{transform: `translateX(${x}) translateY(${y}) rotate(${rotate}) scale(${scale})`}}
                >
                    <div className={`Arc ${className}`}
                         style={style}
                    />
            </div>
        </div>  
    );
}

