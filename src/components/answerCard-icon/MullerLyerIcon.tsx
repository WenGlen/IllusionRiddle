import MullerLyerLine from '../element/MullerLyerLine';
import { useIsMobile } from '../../hooks/useIsMobile';

interface IconProps {
}

export default function MullerLyerIcon({
}: IconProps) {
    const isMobile = useIsMobile();

    return (
        
        <div id="muller-lyer-icon" className={`relative w-full h-full overflow-hidden pointer-events-none`}> 

                <MullerLyerLine sideDirection={0} y={isMobile ? "-5px" : "-10px"}
                                w={ isMobile ? 15 : 40} minSideWidth={isMobile ? 2.5 : 5} 
                                mainThickness="2px" lineThickness="2px" mainColor="var(--border)" />
                <MullerLyerLine sideDirection={1} y={isMobile ? "5px" : "10px"}
                                w={ isMobile ? 15 : 40} minSideWidth={isMobile ? 2.5 : 5} 
                                mainThickness="2px" lineThickness="2px" mainColor="var(--border)" />


        </div>
    );
}
