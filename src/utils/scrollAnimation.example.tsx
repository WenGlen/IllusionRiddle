/**
 * 使用 scrollAnimation 工具函數的重構示例
 * 展示如何將原本的 if-else 判斷簡化
 */

import { calculateRangeValue, calculateStepValue, calculateInRange } from './scrollAnimation';

// ========== 原本的寫法 ==========
function oldWay(scrollProgress: number, numberOfLines: number) {
    const linesAppearStart = 1 / 16;
    const linesAppearEnd = 2 / 16;
    
    // 原本：需要寫很多 if-else
    let visibleLineCount = 0; 
    if (scrollProgress < linesAppearStart) {
        visibleLineCount = 0; 
    } else if (scrollProgress > linesAppearEnd) {
        visibleLineCount = numberOfLines;
    } else { 
        const linesProgress = (scrollProgress - linesAppearStart) / (linesAppearEnd - linesAppearStart);
        visibleLineCount = Math.floor(linesProgress * numberOfLines);
    }
    
    return visibleLineCount;
}

// ========== 使用工具函數後的寫法 ==========
function newWay(scrollProgress: number, numberOfLines: number) {
    const linesAppearStart = 1 / 16;
    const linesAppearEnd = 2 / 16;
    
    // 簡化：一行搞定
    const visibleLineCount = calculateRangeValue(scrollProgress, {
        start: linesAppearStart,
        end: linesAppearEnd,
        beforeValue: 0,
        afterValue: numberOfLines,
        calculate: (progress) => Math.floor(progress * numberOfLines)
    });
    
    return visibleLineCount;
}

// ========== 更多使用範例 ==========

// 範例 1: 階梯式判斷（只有兩個值）
function example1(scrollProgress: number, questionPoint: number) {
    // 原本：
    // let answerOpacity = 0;
    // if (scrollProgress <= questionPoint) {
    //     answerOpacity = 0;
    // } else {
    //     answerOpacity = 1;
    // }
    
    // 簡化：
    const answerOpacity = calculateStepValue(
        scrollProgress,
        questionPoint,
        0,  // beforeValue
        1,  // afterValue
        true // inclusive (<=)
    );
    
    return answerOpacity;
}

// 範例 2: 淡出動畫
function example2(scrollProgress: number, answerStart: number, answerMiddle: number) {
    // 原本：
    // let lineOpacity = 1;
    // if (scrollProgress >= answerStart && scrollProgress <= answerMiddle) {
    //     const fadeOutProgress = (scrollProgress - answerStart) / (answerMiddle - answerStart);
    //     lineOpacity = 1 - fadeOutProgress;
    // } else if (scrollProgress > answerMiddle) {
    //     lineOpacity = 0;
    // }
    
    // 簡化：
    const lineOpacity = calculateRangeValue(scrollProgress, {
        start: answerStart,
        end: answerMiddle,
        beforeValue: 1,
        afterValue: 0,
        calculate: (progress) => 1 - progress // 淡出：從 1 到 0
    });
    
    return lineOpacity;
}

// 範例 3: 複雜的自定義計算
function example3(scrollProgress: number, answerMiddle: number, answerEnd: number) {
    // 原本：
    // let eyeRadius = 100000;
    // if (scrollProgress >= answerMiddle && scrollProgress <= answerEnd) {
    //     const reduceProgress = (scrollProgress - answerMiddle) / (answerEnd - answerMiddle);
    //     eyeRadius = 100000 / (reduceProgress * 200);
    // } else if (scrollProgress > answerEnd) {
    //     eyeRadius = 500;
    // }
    
    // 簡化：
    const eyeRadius = calculateRangeValue(scrollProgress, {
        start: answerMiddle,
        end: answerEnd,
        beforeValue: 100000,
        afterValue: 500,
        calculate: (progress) => 100000 / (progress * 200)
    });
    
    return eyeRadius;
}

// 範例 4: 需要 clamp 的情況（眨眼動畫）
function example4(scrollProgress: number, blinkStart: number, blinkEnd: number) {
    // 原本：
    // const blinkProgress = Math.min(Math.max(0, (scrollProgress - blinkStart)/(blinkEnd - blinkStart)), 1);
    // const blinkHeight = Math.abs((blinkProgress-0.75)*4);
    
    // 簡化：
    const blinkProgress = calculateInRange(
        scrollProgress,
        blinkStart,
        blinkEnd,
        0, // 區間外的預設值
        (progress) => {
            // 區間內：clamp 並計算
            const clamped = Math.min(Math.max(0, progress), 1);
            return Math.abs((clamped - 0.75) * 4);
        }
    );
    
    return blinkProgress;
}

// ========== 在實際組件中的使用 ==========
export function exampleUsage(scrollProgress: number) {
    const totalSteps = 16;
    const linesAppearStart = 1 / totalSteps;
    const linesAppearEnd = 2 / totalSteps;
    const blinkStart = 3 / totalSteps;
    const blinkEnd = 9 / totalSteps;
    const questionPoint = 10 / totalSteps;
    const answerStart = 11 / totalSteps;
    const answerMiddle = 12 / totalSteps;
    const answerEnd = 15 / totalSteps;
    const numberOfLines = 120;
    
    // 所有動畫計算都變得很簡潔
    const visibleLineCount = calculateRangeValue(scrollProgress, {
        start: linesAppearStart,
        end: linesAppearEnd,
        beforeValue: 0,
        afterValue: numberOfLines,
        calculate: (progress) => Math.floor(progress * numberOfLines)
    });
    
    const answerOpacity = calculateStepValue(scrollProgress, questionPoint, 0, 1, true);
    
    const lineOpacity = calculateRangeValue(scrollProgress, {
        start: answerStart,
        end: answerMiddle,
        beforeValue: 1,
        afterValue: 0,
        calculate: (progress) => 1 - progress
    });
    
    const eyeRadius = calculateRangeValue(scrollProgress, {
        start: answerMiddle,
        end: answerEnd,
        beforeValue: 100000,
        afterValue: 500,
        calculate: (progress) => 100000 / (progress * 200)
    });
    
    const blinkProgress = calculateInRange(
        scrollProgress,
        blinkStart,
        blinkEnd,
        0,
        (progress) => {
            const clamped = Math.min(Math.max(0, progress), 1);
            return Math.abs((clamped - 0.75) * 4);
        }
    );
    
    return {
        visibleLineCount,
        answerOpacity,
        lineOpacity,
        eyeRadius,
        blinkProgress
    };
}

