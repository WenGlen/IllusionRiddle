import AbsoluteArc from '../components/Arc';
import ScrollContainer from '../components/ScrollContainer';
import { useRef, useState } from 'react';

interface sectionProps {
    show?: "" | "hidden";
}

const showStatus = {
    "": "block",
    hidden: "!hidden",
};




  
export default function JastrowIllusion({
        show=""
    }: sectionProps) {

        const numberOfArcs = 16;
        const arcSpacing = 100;

        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const [translateY, setTranslateY] = useState(0);

        const JastrowScrollProgress = (scrollProgress: number) => {
            const startTranslateY = -100;
            const endTranslateY = 1000;
            const newTranslateY = startTranslateY + (scrollProgress * (endTranslateY - startTranslateY));
            setTranslateY(newTranslateY);
        };

        // 计算哪个 arc 在正中间（基于 translateY）
        // 当 translateY 增加时，外层容器向下移动，所以中间的 arc 是索引等于 translateY / arcSpacing 的那个
        const getCenterArcIndex = () => {

            const centerIndex = Math.round(translateY / arcSpacing);
            // 确保索引在有效范围内
            return Math.max(0, Math.min(numberOfArcs - 1, centerIndex));
        };

        const centerArcIndex = getCenterArcIndex();



        return (
            <section id="jastrow-illusion" className={`relative screen-fix flex-col-center-center ${showStatus[show]}`}>
                <div /*overlay-focus*/ className="absolute-center z-10 bg-gradient-focus w-full h-full pointer-events-none hidden"></div>
                <div id="overlay-focus" className="absolute-center z-10 w-full h-[500px] border"></div>
                <div className="absolute-center pointer-events-none">

                    
                    <div className="translate-x-[100px] translate-y-[200px] rotate-[-5deg] ">
                        <div className="absolute-center"
                             style={{transform: `translateY(${translateY}px)`}}>
                            {Array.from({ length: numberOfArcs }, (_, index) => {
                                const yPosition = `${-index * arcSpacing}px`;
                                const opacity = index === centerArcIndex ? 1 : 0.5;
                                return (
                                    <div key={index} style={{ opacity }}>
                                        <AbsoluteArc y={yPosition}/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                <ScrollContainer height="400vh" ref={scrollContainerRef} onScroll={JastrowScrollProgress}
                                 className="bg-gradient-test"/>



            </section>
        );
}

/*Ans: pyramid */

