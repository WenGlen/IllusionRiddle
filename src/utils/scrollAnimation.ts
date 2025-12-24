/**
 * 通用的滾動動畫工具函數
 * 用於簡化 scrollProgress 的區間判斷和計算邏輯
 */

export interface RangeConfig {
  /** 區間開始位置 (0-1) */
  start: number;
  /** 區間結束位置 (0-1) */
  end: number;
  /** 區間開始前的值 */
  beforeValue?: number;
  /** 區間結束後的值 */
  afterValue?: number;
  /** 自定義計算函數，接收進度值 (0-1)，返回計算結果 */
  calculate?: (progress: number) => number;
  /** 是否在區間外 clamp 值（限制在 beforeValue 和 afterValue 之間） */
  clamp?: boolean;
}

/**
 * 根據 scrollProgress 計算區間動畫值
 * 
 * @param scrollProgress 滾動進度 (0-1)
 * @param config 區間配置
 * @returns 計算後的值
 * 
 * @example
 * // 線性動畫：從 0.1 到 0.3，值從 0 到 100
 * const value = calculateRangeValue(scrollProgress, {
 *   start: 0.1,
 *   end: 0.3,
 *   beforeValue: 0,
 *   afterValue: 100,
 *   calculate: (p) => p * 100 // 線性插值
 * });
 * 
 * @example
 * // 階梯式：小於 start 返回 0，大於 end 返回 1，區間內返回 0.5
 * const value = calculateRangeValue(scrollProgress, {
 *   start: 0.2,
 *   end: 0.5,
 *   beforeValue: 0,
 *   afterValue: 1,
 *   calculate: () => 0.5
 * });
 */
export function calculateRangeValue(
  scrollProgress: number,
  config: RangeConfig
): number {
  const {
    start,
    end,
    beforeValue,
    afterValue,
    calculate,
    clamp = false,
  } = config;

  // 區間開始前
  if (scrollProgress < start) {
    return beforeValue !== undefined ? beforeValue : 0;
  }

  // 區間結束後
  if (scrollProgress > end) {
    return afterValue !== undefined ? afterValue : 1;
  }

  // 區間內：計算進度 (0-1)
  const progress = (scrollProgress - start) / (end - start);
  
  // 如果有自定義計算函數，使用它
  if (calculate) {
    const result = calculate(progress);
    
    // 如果需要 clamp，限制在 beforeValue 和 afterValue 之間
    if (clamp && beforeValue !== undefined && afterValue !== undefined) {
      const min = Math.min(beforeValue, afterValue);
      const max = Math.max(beforeValue, afterValue);
      return Math.max(min, Math.min(max, result));
    }
    
    return result;
  }

  // 預設線性插值
  if (beforeValue !== undefined && afterValue !== undefined) {
    return beforeValue + (afterValue - beforeValue) * progress;
  }

  return progress;
}

/**
 * 簡化版：只處理區間內的計算，區間外返回預設值
 * 
 * @param scrollProgress 滾動進度 (0-1)
 * @param start 區間開始
 * @param end 區間結束
 * @param defaultValue 區間外的預設值
 * @param calculate 區間內的計算函數
 * @returns 計算後的值
 */
export function calculateInRange(
  scrollProgress: number,
  start: number,
  end: number,
  defaultValue: number,
  calculate: (progress: number) => number
): number {
  if (scrollProgress < start || scrollProgress > end) {
    return defaultValue;
  }
  
  const progress = (scrollProgress - start) / (end - start);
  return calculate(progress);
}

/**
 * 簡化版：階梯式判斷（只有開始和結束兩個值）
 * 
 * @param scrollProgress 滾動進度 (0-1)
 * @param threshold 閾值
 * @param beforeValue 閾值前的值
 * @param afterValue 閾值後的值
 * @param inclusive 是否包含閾值本身（>= 或 >）
 * @returns 計算後的值
 */
export function calculateStepValue(
  scrollProgress: number,
  threshold: number,
  beforeValue: number,
  afterValue: number,
  inclusive: boolean = true
): number {
  if (inclusive) {
    return scrollProgress <= threshold ? beforeValue : afterValue;
  } else {
    return scrollProgress < threshold ? beforeValue : afterValue;
  }
}

