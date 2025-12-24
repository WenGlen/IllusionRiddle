import { useIsMobile } from '../../hooks/useIsMobile';

interface MullerLyerLineProps {
    wMd?: number;
    wSm?: number;
    w?: number;
    wPlus?: number;
    minSideWidth?: number;
    lineThickness?: string;
    mainThickness?: string;
    mainColor?: string;
    sideColor?: string;
    className?: string;

    sideDirection?: number;
    opacity?: number;
    sideOpacity?: number;
    
    x?: string;
    y?: string;
}



export default function MullerLyerLine({
    wMd = 400,
    wSm = 250,
    w,
    wPlus = 0,
    minSideWidth = 30,
    mainThickness = "var(--primaryThickness)",
    lineThickness = "var(--primaryThickness)",
    mainColor = "var(--primary)",
    sideColor = "var(--border)",
    className = "",
    x = "0px",
    y = "0px",
    sideDirection = 0,
    opacity = 1,
    sideOpacity = 1,
   
}: MullerLyerLineProps) {
    const isMobile = useIsMobile();

    // 如果沒有傳入 w，根據裝置大小設定預設值：md 以下 200，否則 300
    const lineWidth = w !== undefined ? w : (isMobile ? wSm : wMd);

    const sideAngle = sideDirection * 120 + 30 ;
    const sideWidth = minSideWidth * Math.abs(1/Math.sin((sideAngle * Math.PI) / 180));

    const style = {
        '--muller-lineThickness': lineThickness,
        '--muller-mainColor': mainColor,
        '--muller-sideColor': sideColor,
    } as React.CSSProperties;
    
    return (
        
        <div className={`absolute-center ${className}`} > 
            <div style={{ transform: `translate(${x},${y})`, opacity: opacity }}>
                <div className={`MullerLyer-Block`}
                     style={{ width: `${lineWidth+wPlus}px` , height:mainThickness , ...style}}>
                    <div style={{ opacity: sideOpacity }}>
                        <div className={`MullerLyerLine-side top-0 left-0 origin-left`}  style={{ width: `${sideWidth}px`, transform: `rotate(${-sideAngle}deg)` }}/>
                        <div className={`MullerLyerLine-side bottom-0 left-0 origin-left`}  style={{ width: `${sideWidth}px`, transform: `rotate(${sideAngle}deg)` }}/>
    
                        <div className={`MullerLyerLine-side top-0 right-0 origin-right`}  style={{ width: `${sideWidth}px`, transform: `rotate(${sideAngle}deg)` }}/>
                        <div className={`MullerLyerLine-side bottom-0 right-0 origin-right`}  style={{ width: `${sideWidth}px`, transform: `rotate(${-sideAngle}deg)` }}/>
                    </div>
                </div>

            </div>
        </div>  
    );
}

