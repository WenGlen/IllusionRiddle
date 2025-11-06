import { useEffect, useRef, useState } from 'react';
import ScrollContainer from '../components/ScrollContainer';
import QuestionModal from '../components/QuestionModal';
import HeringAnswer from '../components/HeringAnswer';

interface sectionProps {
    show?: "" | "hidden";
    onAnswerCorrect?: () => void;
}

const showStatus = {
    "": "block",
    hidden: "!hidden",
};

export default function HeringIllusion({
        show="",
        onAnswerCorrect,
    }: sectionProps) {

        const numberOfLines = 120;

        const totalSteps = 16;
        const linesAppearStart = 1 /totalSteps;
        const linesAppearEnd = 2 /totalSteps;
        const blinkStart = 3 /totalSteps;
        const blinkEnd = 9 /totalSteps;

        const questionPoint = 10 /totalSteps;

        const answerStart = 11 /totalSteps;
        const answerMiddle = 12 /totalSteps;
        const answerEnd = 15 /totalSteps;



        const radialLinesRef = useRef<HTMLDivElement>(null);
        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const lineElementsRef = useRef<HTMLDivElement[]>([]);
        const eyelidRef = useRef<HTMLDivElement>(null);

        const [showModal, setShowModal] = useState(false);
        const [hasAnswered, setHasAnswered] = useState(false);
        const [justWatchedAgain, setJustWatchedAgain] = useState(false);
        const [lineOpacity, setLineOpacity] = useState(1);
        const [eyeRadius, setEyeRadius] = useState(100000);
        const [answerOpacity, setAnswerOpacity] = useState(0);

        const HeringScrollProgress = (scrollProgress: number) => {

            /* ------問題彈窗------ */
            // 點擊 Watch Again，需等滾動至頂部才能再次觸發
            if (justWatchedAgain && scrollProgress < questionPoint * 0.5) {
                setJustWatchedAgain(false);
            }
            
            if (scrollProgress >= questionPoint && !showModal && !hasAnswered && !justWatchedAgain) {
                setShowModal(true);
            }

            
            const radialLines = radialLinesRef.current;
            const eyelid = eyelidRef.current;
            if (!radialLines || !eyelid) return;

            /* ------計算顯示線條數量------ */
            let visibleLineCount = 0; 
            
            if (scrollProgress < linesAppearStart) {
                visibleLineCount = 0; 
            } else if (scrollProgress > linesAppearEnd) {
                visibleLineCount = numberOfLines;
            } else { 
                const linesProgress = (scrollProgress - linesAppearStart) / (linesAppearEnd - linesAppearStart);
                visibleLineCount = Math.floor(linesProgress * numberOfLines);
            }
            
            /* ------解答提前出現------ */
            let answerOpacity = 0;
            if (scrollProgress <= questionPoint) {
                answerOpacity = 0;
            } else {
                answerOpacity = 1;
            }
            setAnswerOpacity(answerOpacity);

            /* ------計算解答段落的線條透明度------ */
            let lineOpacity = 1;

            if (scrollProgress >= answerStart && scrollProgress <= answerMiddle) {
                const fadeOutProgress = (scrollProgress - answerStart) / (answerMiddle - answerStart);
                lineOpacity = 1 - fadeOutProgress;
            } else if (scrollProgress > answerMiddle) {
                lineOpacity = 0;
            }
            setLineOpacity(lineOpacity);
   

            let eyeRadius = 100000;
            if (scrollProgress >= answerMiddle && scrollProgress <= answerEnd) {
                const reduceProgress = (scrollProgress - answerMiddle) / (answerEnd - answerMiddle);
                eyeRadius = 100000 /(reduceProgress*100);
            } else if (scrollProgress > answerEnd) {
                eyeRadius = 1000;
            }

            setEyeRadius(eyeRadius);

            // 更新線條的顯示狀態和透明度
            lineElementsRef.current.forEach((line, index) => {
                if (index < visibleLineCount) {
                    line.style.opacity = lineOpacity.toString();
                } else {
                    line.style.opacity = '0';
                }
            });

            /* ------眨眼狀態------ */
            const blinkProgress = Math.min(Math.max(0, (scrollProgress - blinkStart)/(blinkEnd - blinkStart)), 1);
            const blinkHeight = Math.abs((blinkProgress-0.75)*4);

            const baseHeightStr = getComputedStyle(document.documentElement).getPropertyValue('--hering-EyeHeight').trim();
            const baseHeight = parseFloat(baseHeightStr) || 100;
            eyelid.style.height = `${baseHeight * blinkHeight }px`;
        };

        useEffect(() => {
            const radialLines = radialLinesRef.current;
            if (!radialLines) return;
            
            radialLines.innerHTML = '';
            lineElementsRef.current = [];

            // 創建所有線條
            
            for (let i = 0; i < numberOfLines; i++) {
                const line = document.createElement('div');
                const angle = i * (360 / numberOfLines);
                line.className = 'radial-line';
                line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
                radialLines.appendChild(line);
                lineElementsRef.current.push(line);
            }

            //初始狀態設置
            HeringScrollProgress(0);
        }, []);

        
        return (
            <section id="hering-illusion" className={`relative screen-fix ${showStatus[show]}`}>



                <div className="absolute-center z-10  w-full h-full  pointer-events-none overflow-hidden"> 
                    <div /*overlay-focus*/ className="absolute-center z-20 bg-gradient-focus w-full h-full"></div>
                    <div id="radial-lines" 
                         ref={radialLinesRef} 
                         className="w-full h-full"></div>
                </div>

                <div className="absolute-center z-20 w-full h-full flex-col-center-center pointer-events-none"
                     style={{opacity: lineOpacity }}>  
                        <div id="Eyelid" 
                         ref={eyelidRef}
                         className="w-full h-[var(--hering-EyeHeight)] border-t-primaryThickness border-b-primaryThickness border-primary 
                                    flex-col-center-center overflow-hidden ">
                        <div id="Eyeball" 
                             className="w-[var(--hering-EyeballHeight)] h-[var(--hering-EyeballHeight)] flex-shrink-0 bg-background rounded-full"></div>
                    </div>
                </div>

                <HeringAnswer eyeRadius={ eyeRadius } opacity={ answerOpacity } />

                <ScrollContainer height="600vh" ref={scrollContainerRef} onScroll={HeringScrollProgress}/>
                <QuestionModal
                    modalEnabled="on"
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onBack={() => {
                        setJustWatchedAgain(true); // 標記剛點擊了 Watch Again
                    }}
                    onConfirm={(value) => {
                        // 驗證答案：不分大小寫，忽略前後空白
                        const trimmedValue = value.trim().toLowerCase();
                        const correctAnswers = ['eye', 'eyes', 'eyelid', 'eyelids', 'blink'];
                        const isCorrect = correctAnswers.includes(trimmedValue);
                        
                        if (isCorrect && onAnswerCorrect) {
                            onAnswerCorrect();
                        }

                        setHasAnswered(true);
                    }}
                    scrollContainerRef={scrollContainerRef}
                />

            </section>
        );
}

/*Ans:blink, eye, eyes, eyelid, eyelids */