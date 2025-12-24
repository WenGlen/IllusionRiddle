import ScrollContainer from '../components/ScrollContainer';
import { useRef, useState } from 'react';
import CafeWallUnit from '../components/element/CafeWallUnit';
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

  
export default function CafeWallIllusion({
        show="",
        onAnswerCorrect,
    }: sectionProps) {

        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const [showModal, setShowModal] = useState(false);
        const [hasAnswered, setHasAnswered] = useState(false);
        const [justWatchedAgain, setJustWatchedAgain] = useState(false);
        const [unitMoveX, setUnitMoveX] = useState(0);
        const [unitAppearProgress, setUnitAppearProgress] = useState(0);
        const [seesawExpandProgress, setSeesawExpandProgress] = useState(0);
        const [allUnitOpacity, setAllUnitOpacity] = useState(1);
        const [seesawLineRotation, setSeesawLineRotation] = useState(0);


        const unitWidth = 480;
        const unitHeight = 36;
        const n = 8; // unit最多水平移動幾個px


        const totalSteps = 16;
        const unitAppearStart = 1 /totalSteps;
        const unitAppearEnd = 2 /totalSteps;

        const SeesawAppearStart = 2 /totalSteps;
        const SeesawAppearEnd = 3 /totalSteps;

        const SeesawMoveStart = 5 /totalSteps;
        const SeesawMoveEnd = 9 /totalSteps;

        const questionPoint = 10 /totalSteps;

        const answerStart = 11 /totalSteps;
        const answerMiddle = 13 /totalSteps;
        const answerEnd = 15 /totalSteps;







        const CafeWallScrollProgress = (scrollProgress: number) => {
            // 在 unitAppearStart 到 unitAppearEnd 期間，unit會由上至下依序出現
            if (scrollProgress >= unitAppearStart && scrollProgress < unitAppearEnd) {
                const relativeProgress = (scrollProgress - unitAppearStart) / (unitAppearEnd - unitAppearStart);
                const totalUnits = 12;
                const appearProgress = relativeProgress * totalUnits;
                setUnitAppearProgress(appearProgress);
            } else if (scrollProgress < unitAppearStart) {
                setUnitAppearProgress(0);
            } else {
                setUnitAppearProgress(12);
            }


            // 在 SeesawAppearStart 到 SeesawAppearEnd 期間，Seesaw跟general-line會從正中間水平展開
            if (scrollProgress >= SeesawAppearStart && scrollProgress < SeesawAppearEnd) {
                const relativeProgress = (scrollProgress - SeesawAppearStart) / (SeesawAppearEnd - SeesawAppearStart);
                setSeesawExpandProgress(relativeProgress);
            } else if (scrollProgress < SeesawAppearStart) {
                setSeesawExpandProgress(0);
            } else {
                setSeesawExpandProgress(1);
            }

            // 在 SeesawMoveStart 到 SeesawMoveEnd 期間，unit會左右移動
            let newUnitMoveX = 0;
            if (scrollProgress >= SeesawMoveStart && scrollProgress < SeesawMoveEnd) {
                const relativeProgress = (scrollProgress - SeesawMoveStart) / (SeesawMoveEnd - SeesawMoveStart);
                
                // 將滾動進度分五步: 0 → n → 0 → -n → 0 → n 
                const cycleLength = 1 / 5; // 每个阶段占1/5的相对进度
                
                if (relativeProgress < cycleLength) { // 0 → n
                    newUnitMoveX = n * (relativeProgress / cycleLength)
                } else if (relativeProgress < cycleLength * 3) {// n → 0 → -n
                    newUnitMoveX = n - (2 * n * (relativeProgress - cycleLength) / (cycleLength * 2));
                } else if (relativeProgress < cycleLength * 5) {// -n → n
                    newUnitMoveX = -n + (2 * n * (relativeProgress - cycleLength * 3) / (cycleLength * 2));
                }
            } else if (scrollProgress >= SeesawMoveEnd) {
                newUnitMoveX = n;
            }
            setUnitMoveX(newUnitMoveX);

            // 當滾動回到開頭時，重置 justWatchedAgain 狀態
            if (scrollProgress < questionPoint) {
                setJustWatchedAgain(false);
            }

            if (scrollProgress >= questionPoint && !showModal && !hasAnswered && !justWatchedAgain) {
                setShowModal(true);
            }

            // 在 answerStart 到 answerMiddle 期間，unit會消失
            if (scrollProgress >= answerStart && scrollProgress < answerMiddle) {
                const relativeProgress = (scrollProgress - answerStart) / (answerMiddle - answerStart);
                setAllUnitOpacity(1 - relativeProgress); // 从 1 渐变为 0
            } else if (scrollProgress < answerStart) {
                setAllUnitOpacity(1);
            } else {
                setAllUnitOpacity(0);
            }

            // 在 answerMiddle 到 answerEnd 期間，seesaw-line會左右來回選轉
            const seesawRotation = 5;
            if (scrollProgress >= answerMiddle && scrollProgress < answerEnd) {
                const relativeProgress = (scrollProgress - answerMiddle) / (answerEnd - answerMiddle);
                // 將轉動進度分五步: 0 → 15° → 0 → -15° → 0 → 15° 
                const cycleLength = 1 / 5; // 每个阶段占1/5的相对进度
                if (relativeProgress < cycleLength) { // 0 → 15°
                    setSeesawLineRotation(seesawRotation * (relativeProgress / cycleLength));
                } else if (relativeProgress < cycleLength * 3) { // 15° → 0 → -15°
                    setSeesawLineRotation(-seesawRotation * 2 * (relativeProgress - cycleLength) / (cycleLength * 2));
                } else if (relativeProgress < cycleLength * 5) { // -15° → 0 → 15°
                    setSeesawLineRotation(seesawRotation * 2 *(relativeProgress - cycleLength * 3) / (cycleLength * 2));
                }

            } else if (scrollProgress <= answerMiddle) {
                setSeesawLineRotation(0);
            }
        };

        return (
            <section id="cafe-wall-illusion" className={`relative screen-fix flex-col-center-center ${showStatus[show]}`}>



                {/* CafeWallUnit 和 general-line 组合 */}
                <div className="w-full absolute-center pointer-events-none flex-col-center-center"
                     style={{ opacity: allUnitOpacity }}>
                    
                    {[...Array(12)].map((_, index) => {
                        const baseOpacityValues = [0.2, 0.4, 0.6, 0.8, 1, 1, 1, 1, 0.8, 0.6, 0.4, 0.2];
                        const baseOpacity = baseOpacityValues[index];
                        
                        // 根據 unitAppearProgress 控制顯示，添加漸入效果
                        // unitAppearProgress 從 0 開始，當 unitAppearProgress > index 時單元開始顯示
                        const appearOpacity = Math.max(0, Math.min(1, unitAppearProgress - index));
                        const opacity = baseOpacity * appearOpacity;
                        
                        // 指定移動：index 為 0 和 11 時不移動，中間交替使用 unitMoveX 和 -unitMoveX
                        const shouldMove = index !== 0 && index !== 11;
                        const moveXPattern = shouldMove ? (index % 2 === 1 ? unitMoveX : -unitMoveX) : 0;
                        
                        return (
                            <div key={`unit-${index}`} className="w-full flex-col-center-center">
                                <div 
                                    className="general-line" 
                                    style={{ 
                                        width: `${unitWidth}px`,
                                        transform: `scaleX(${seesawExpandProgress})`,
                                        transformOrigin: 'center',
                                        opacity: opacity
                                    }}
                                />
                                <CafeWallUnit 
                                    unitMoveX={moveXPattern} 
                                    unitHeight={unitHeight} 
                                    opacity={opacity}
                                />
                                <div 
                                    className="general-line" 
                                    style={{ 
                                        width: `${unitWidth}px`,
                                        transform: `scaleX(${seesawExpandProgress})`,
                                        transformOrigin: 'center',
                                        opacity: opacity
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* seesaw-line 和 seesaw-fulcrum 组合 */}
                <div className="absolute top-1/2 -translate-y-[2px] left-1/2 -translate-x-1/2  pointer-events-none flex-col-center-center">

                    <div //蹺蹺板的板子
                        id="seesaw-line" 
                        className="h-[var(--primaryThickness)] bg-primary "
                        style={{ 
                            width: `${unitWidth}px`,
                            transform: `scaleX(${seesawExpandProgress}) rotate(${seesawLineRotation}deg)`,
                            transformOrigin: 'center'
                        }}
                    />

                    <div //支點
                        id="seesaw-fulcrum"
                        style={{
                            transform: `scaleX(${seesawExpandProgress})`,
                            transformOrigin: 'center top'
                        }}
                    >
                        <svg
                            width={unitHeight}
                            height={unitHeight * 3.5}
                            style={{ display: 'block' }}
                        >
                            <path
                                d={`M ${unitHeight / 2} 0 L ${unitHeight} ${unitHeight * 1} L 0 ${unitHeight * 1} Z`}
                                fill="none"
                                stroke="var(--primary)"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                </div>



                <ScrollContainer height="800vh" ref={scrollContainerRef} onScroll={CafeWallScrollProgress}
                                 className=""/*"bg-gradient-test"*//>
   
                <QuestionModal
                    modalEnabled="on"
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onBack={() => {
                        setJustWatchedAgain(true); // 標記剛點擊了 Watch Again
                        setShowModal(false); // 關閉彈窗
                    }}
                    onConfirm={(value) => {
                        // 驗證答案：不分大小寫，忽略前後空白
                        const trimmedValue = value.trim().toLowerCase();
                        const correctAnswers = ['seesaw','翹翹板','蹺蹺板','libra','天秤','天平','balance','平衡'];
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

/* Ans: Seesaw, Libra */

