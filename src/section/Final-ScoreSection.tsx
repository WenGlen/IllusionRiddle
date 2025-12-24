import { forwardRef } from 'react';
import HeringIcon from '../components/answerCard-icon/HeringIcon';
import MullerLyerIcon from '../components/answerCard-icon/MullerLyerIcon';
import CafeWallIcon from '../components/answerCard-icon/CafeWallIcon';

interface ScoreSectionProps {
    heringCorrect: boolean;
    mullerLyerCorrect: boolean;
    cafeWallCorrect: boolean;
    onReset: () => void;
}

const ScoreSection = forwardRef<HTMLElement, ScoreSectionProps>(({
    heringCorrect,
    mullerLyerCorrect,
    cafeWallCorrect,
    onReset,
}, ref) => {
    const totalIllusions = 3;
    const completedCount = [heringCorrect, mullerLyerCorrect, cafeWallCorrect].filter(Boolean).length;
    
    const getCongratulationText = () => {
        if (completedCount === 0) {
            return "Keep exploring!";
        } else if (completedCount === totalIllusions) {
            return "Congratulations!<br/>You've completed all illusions!";
        } else {
            return "Great!<br/>Keep going!";
        }
    };

    const completedIllusions = [
        { name: "Hering", icon: <HeringIcon />, completed: heringCorrect },
        { name: "Müller-Lyer", icon: <MullerLyerIcon />, completed: mullerLyerCorrect },
        { name: "Cafe Wall", icon: <CafeWallIcon />, completed: cafeWallCorrect },
    ];

    const lines = getCongratulationText().split('<br/>');

    return (
        <section ref={ref} id="score-section" className={`screen-fix flex-col-center-center snap-start snap-always p-8`}>
            <div className="border border-border-muted bg-background rounded-md p-6 md:p-8 max-w-md w-full mx-8">
                <div className="flex-col-center-center gap-6">
                    {/* 完成数量 */}
                    <div className="text-center">
                        <p className="text-2xl md:text-3xl font-semibold">
                            {completedCount} / {totalIllusions} completed
                        </p>
                    </div>

                    {/* 祝贺文字 */}
                    <div className="text-center text-lg md:text-xl">
                        {lines.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>

                    {/* 完成的 Illusion 列表 */}
                    <div className="w-full flex-col-center-center gap-3">
                        {completedIllusions.map((illusion) => (
                            <div
                                key={illusion.name}
                                className={`w-full flex-row-center-center gap-3 p-3 border rounded ${
                                    illusion.completed
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border-muted opacity-50'
                                }`}
                            >
                                <div className="w-8 h-8 md:w-16 md:h-16 border border-border-muted">
                                    {illusion.icon}
                                </div>
                                <p className="text-sm md:text-base flex-1 text-left">
                                    {illusion.name} Illusion
                                </p>
                                {illusion.completed && (
                                    <span className="text-primary text-lg">✓</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 重置按钮 */}
                    <button
                        onClick={onReset}
                        className="px-6 py-3 border border-border rounded w-full hover:bg-border-subtle transition-colors text-base md:text-lg"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </section>
    );
});

ScoreSection.displayName = 'ScoreSection';

export default ScoreSection;

