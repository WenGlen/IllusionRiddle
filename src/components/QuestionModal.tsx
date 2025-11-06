import { useState, useEffect, useRef } from 'react';

interface QuestionModalProps {
    show: boolean;
    onClose: () => void;
    onBack?: () => void;
    onConfirm?: (value: string) => void;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
    placeholder?: string;
    modalEnabled?: "on" | "off";
}

const QuestionModal: React.FC<QuestionModalProps> = ({
    show,
    onClose,
    onBack,
    onConfirm,
    scrollContainerRef,
    placeholder = "Enter the answer word...",
    modalEnabled = "on",
}) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // 彈窗啟動時自動聚焦
    useEffect(() => {
        // 如果開關為 off，不執行任何效果
        if (modalEnabled === "off") return;
        if (show && inputRef.current) {
            inputRef.current.focus();
        }
    }, [show, modalEnabled]);

    // 彈窗顯示時阻止滾動
    useEffect(() => {
        // 如果開關為 off，不執行任何效果
        if (modalEnabled === "off") return;

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const preventScroll = (e: WheelEvent | TouchEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };

        if (show) {
            // 禁用滾動
            scrollContainer.style.overflow = 'hidden';
            scrollContainer.style.pointerEvents = 'none';
            // 添加事件監聽器阻止滾動
            scrollContainer.addEventListener('wheel', preventScroll as EventListener, { passive: false });
            scrollContainer.addEventListener('touchmove', preventScroll as EventListener, { passive: false });
        } else {
            // 恢復滾動
            scrollContainer.style.overflow = '';
            scrollContainer.style.pointerEvents = '';
            // 移除事件監聽器
            scrollContainer.removeEventListener('wheel', preventScroll as EventListener);
            scrollContainer.removeEventListener('touchmove', preventScroll as EventListener);
        }

        return () => {
            // 清理
            if (scrollContainer) {
                scrollContainer.style.overflow = '';
                scrollContainer.style.pointerEvents = '';
                scrollContainer.removeEventListener('wheel', preventScroll as EventListener);
                scrollContainer.removeEventListener('touchmove', preventScroll as EventListener);
            }
        };
    }, [show, scrollContainerRef, modalEnabled]);

    const handleBack = () => {
        if (onBack) {
            onBack(); // 调用 onBack 回调，标记为刚刚点击了 Watch Again
        }
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(inputValue);
        }
        
        setInputValue('');
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleCancel();
        } else if (e.key === 'Enter' && inputValue.trim()) {
            handleConfirm();
        }
    };

    // 如果開關為 off，永遠不顯示彈窗
    if (modalEnabled === "off" || !show) return null;

    return (
        <>
            {/* 半透明背景遮罩 */}
            <div 
                className="fixed inset-0 bg-black/70 z-[49]"
                onClick={(e) => {e.stopPropagation();}}
                onWheel={(e) => {e.preventDefault();e.stopPropagation();}}
                onTouchMove={(e) => {e.preventDefault();e.stopPropagation();}}
                style={{ touchAction: 'none',overscrollBehavior: 'none'}}
            />
            {/* 彈窗內容 */}
            <div className="fixed inset-0 z-50 flex-col-center-center pointer-events-none">
                <div 
                    className="bg-background  rounded-lg p-8 shadow-lg max-w-md w-full mx-8 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col gap-4">

                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={placeholder}
                            className="w-full px-6 py-4 border border-primary rounded bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            onKeyDown={handleKeyDown}
                        />
                        <div className="flex-col-center-center gap-2 mt-6">

                            <button
                                onClick={handleBack}
                                className="px-4 py-2 border border-border rounded w-full"
                            >
                                Watch Again
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-border rounded w-full"
                            >
                                See Final
                            </button>

                            <button
                                onClick={handleConfirm}
                                disabled={!inputValue.trim()}
                                className="px-4 py-2 bg-border text-primary-foreground rounded w-full hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Answer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuestionModal;
