import { useState, useEffect } from 'react';

/**
 * 自定義 Hook：檢測當前螢幕寬度是否小於指定斷點（預設 768px，對應 Tailwind 的 md breakpoint）
 * @param breakpoint 斷點寬度，預設為 768px
 * @returns boolean - 如果螢幕寬度小於斷點則返回 true
 */
export function useIsMobile(breakpoint: number = 768): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };
        
        checkMobile(); // 初始檢查
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [breakpoint]);

    return isMobile;
}

