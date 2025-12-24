import ScrollContainer from '../components/ScrollContainer';
import { useRef, useState } from 'react';
import MullerLyerLine from '../components/element/MullerLyerLine';
import QuestionModal from '../components/QuestionModal';
import { useIsMobile } from '../hooks/useIsMobile';

interface sectionProps {
    show?: "" | "hidden";
    onAnswerCorrect?: () => void;
}

const showStatus = {
    "": "block",
    hidden: "!hidden",
};

  
export default function MullerLyerIllusion({
        show="",
        onAnswerCorrect,
    }: sectionProps) {

        const numberOfLines = 8;
        const lineSpace = 100;

        const totalSteps = 16;
        const groundAppearStart = 1 /totalSteps;
        const groundAppearEnd = 3 /totalSteps;
        const stepMoveStart = 4 /totalSteps;
        const stepMoveEnd = 9 /totalSteps;

        const questionPoint = 10 /totalSteps;

        const answerStart = 11 /totalSteps;
        const answerMiddle = 13 /totalSteps;
        const answerEnd = 15 /totalSteps;

        const totalHeight = (numberOfLines-2)*lineSpace;

        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const [stepMoveY, setStepMoveY] = useState(0);
        const [bottomMoveY, setBottomMoveY] = useState(0);
        const [topMoveY, setTopMoveY] = useState(0);
        const [groundWidth, setGroundWidth] = useState(0);
        const [sideOpacity, setSideOpacity] = useState(1);
        const [linesWidthChange, setLinesWidthChange] = useState(0);

        const [showModal, setShowModal] = useState(false);
        const [hasAnswered, setHasAnswered] = useState(false);
        const [justWatchedAgain, setJustWatchedAgain] = useState(false);
        const isMobile = useIsMobile();

        
        const MullerLyerScrollProgress = (scrollProgress: number) => {

            /* ------問題彈窗------ */
            // 點擊 Watch Again，需等滾動至頂部才能再次觸發
            if (justWatchedAgain && scrollProgress < questionPoint * 0.5) {
                setJustWatchedAgain(false);
            }
            
            if (scrollProgress >= questionPoint && !showModal && !hasAnswered && !justWatchedAgain) {
                setShowModal(true);
            }

            /* ------改變地面寬度------ */
            let groundWidth = 0;
            if (scrollProgress < groundAppearStart) {
                groundWidth = 0;
            } else if (scrollProgress > groundAppearEnd) {
                groundWidth = 100;
            } else {
                const groundProgress = (scrollProgress - groundAppearStart) / (groundAppearEnd - groundAppearStart);
                groundWidth = groundProgress * 100;
            }
            setGroundWidth(groundWidth);

            let stepMoveY = 0;
            const stepMoveYMax = isMobile ? 380 : 350;
            let bottomMoveY = 0;
            let topMoveY = 0;

            if (scrollProgress < stepMoveStart) {
                stepMoveY = 0; 
                bottomMoveY = 0;
                topMoveY = 0;
            } else if (scrollProgress > stepMoveEnd) {
                stepMoveY = totalHeight;
                bottomMoveY = 150;
                topMoveY = stepMoveYMax;
            } else { 
                const stepMoveProgress = (scrollProgress - stepMoveStart) / (stepMoveEnd - stepMoveStart);
                stepMoveY = stepMoveProgress * totalHeight;
                bottomMoveY = Math.min(150, 1.5*stepMoveY);
                topMoveY = Math.max( 0 , 1.5 * ( stepMoveY - totalHeight )+stepMoveYMax);
            }
            setStepMoveY(stepMoveY);
            setBottomMoveY(bottomMoveY);
            setTopMoveY(topMoveY);


            /* ------解答------ */
            let sideOpacity = 1;
            if (scrollProgress >= answerStart && scrollProgress <= answerMiddle) {
                const fadeOutProgress = (scrollProgress - answerStart) / (answerMiddle - answerStart);
                sideOpacity = 1 - fadeOutProgress;
            } else if (scrollProgress > answerMiddle) {
                sideOpacity = 0;
            }
            setSideOpacity(sideOpacity);

            // 如果是移動裝置（寬度小於 md），寬度變化範圍減半
            const widthChangeRange = isMobile ? 100 : 150;
            let linesWidthChange = 0;
            if (scrollProgress >= answerMiddle && scrollProgress <= answerEnd) {
                const ChangeProgress = (scrollProgress - answerMiddle) / (answerEnd - answerMiddle);
                linesWidthChange = ChangeProgress * widthChangeRange;
            } else if (scrollProgress > answerEnd) {
                linesWidthChange = widthChangeRange;
            }
            setLinesWidthChange(linesWidthChange);

        };


        // 滑動時 sideDirection 變換區
        const centerY = 0; 
        const transitionRange = 150; // (px)
        const centerStart = centerY - transitionRange / 2; 
        const centerEnd = centerY + transitionRange / 2; 

        const calculateSideDirection = (baseY: number) => {
            const actualY = baseY + stepMoveY;
            
            if (actualY <= centerStart) {
                return 0;
            } else if (actualY >= centerEnd) {
                return 1;
            } else {
                const directionProgress = (actualY - centerStart) / transitionRange;
                return directionProgress;
            }
        };

        // 滑動時 opacity 變換區
        const calculateOpacity = (baseY: number) => {

            const actualY = baseY + stepMoveY;
            
            const fadeInStart = -1.5*lineSpace;  // (px)
            const fadeInEnd = - lineSpace;    // (px)
            const fadeOutStart = lineSpace; // (px)
            const fadeOutEnd = 1.5*lineSpace;   // (px)
            
            if (actualY < fadeInStart) {
                return 0;
            } else if (actualY >= fadeInStart && actualY < fadeInEnd) {
                const opacityProgress = (actualY - fadeInStart) / (fadeInEnd - fadeInStart);
                return opacityProgress;
            } else if (actualY >= fadeInEnd && actualY <= fadeOutStart) {
                return 1;
            } else if (actualY > fadeOutStart && actualY <= fadeOutEnd) {
                const opacityProgress = (actualY - fadeOutStart) / (fadeOutEnd - fadeOutStart);
                return 1 - opacityProgress;
            } else {
                return 0;
            }
        };

        return (
            <section id="müller-lyer-illusion" className={`relative screen-fix flex-col-center-center ${showStatus[show]}`}>

                <div className="absolute-center pointer-events-none h-0">
                    <div style={{ transform: `translateY(${stepMoveY}px)` }}>
                        {Array.from({ length: numberOfLines }, (_, index) => {
                            const y = -lineSpace * (index);
                            const sideDirection = calculateSideDirection(y);
                            const opacity = calculateOpacity(y);
                            // 只改變 index = numberOfLines-1 和 numberOfLines-2 的寬度
                            const addChangeWidth = index === numberOfLines-3;
                            const subChangeWidth = index === numberOfLines-1;
                            return (
                                <MullerLyerLine 
                                    key={index}
                                    y={y + "px"} 
                                    sideDirection={sideDirection}
                                    opacity={opacity}
                                    sideOpacity={sideOpacity}
                                    wPlus={addChangeWidth ? linesWidthChange : subChangeWidth ? -linesWidthChange : 0}
                                />
                            );
                        })}
                    </div>

                    <div /* ground */ className="flex-col-center-center" style={{ transform: `translateY(${bottomMoveY}px)` }}>
                       <div className="h-px w-full bg-border" style={{ width:`${groundWidth}vw`, transform: `translateY(${lineSpace}px)` }}></div>
                       <div className="h-px w-full bg-border opacity-75" style={{ width:`${Math.max(0, groundWidth-25)}vw` , transform: `translateY(${lineSpace+20}px)` }}></div>
                       <div className="h-px w-full bg-border opacity-50" style={{ width:`${Math.max(0, groundWidth-50)}vw` , transform: `translateY(${lineSpace+40}px)` }}></div>
                       <div className="h-px w-full bg-border opacity-25" style={{ width:`${Math.max(0, groundWidth-75)}vw` , transform: `translateY(${lineSpace+60}px)` }}></div>
                    </div>

                    <div /* top */ className="scale-50 md:scale-100"
                                   style={{ transform: `translateY(${topMoveY}px)` }}>
                        <div className="flex-col-start-center" 
                             style={{ transform: `translateY(${-totalHeight}px)` }}>

                        <svg 
                            width={60}
                            height={50}
                        >
                            <path
                                d={`M 30 0 L 60 45 L 0 45 Z`}
                                fill="none"
                                stroke="var(--primary)"
                                strokeWidth="1"
                            />
                        </svg>

                        </div>
                    </div>

                </div>

                <ScrollContainer height="800vh" ref={scrollContainerRef} onScroll={MullerLyerScrollProgress}
                                 className=""/*"bg-gradient-test"*//>

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
                        const correctAnswers = ['pyramid','金字塔','tower','塔'];
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

/* Ans: pyramid, tower */
