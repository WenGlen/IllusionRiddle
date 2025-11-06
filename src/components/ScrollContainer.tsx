import { forwardRef, type ReactNode } from 'react';

interface ScrollContainerProps {
    children?: ReactNode;
    height?: string;
    className?: string;
    id?: string;
    onScroll?: (scrollProgress: number) => void;
}

const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
    ({ 
        children, 
        height = "400vh",
        className = "",
        id,
        onScroll 
    }, ref) => {
        
        const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
            if (!onScroll) return;
            
            const scrollTop = e.currentTarget.scrollTop;
            const scrollHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;
            const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            
            onScroll(scrollProgress);
        };

        const contentHeight = height;

        return (
            <div 
                ref={ref}
                id={id}
                onScroll={handleScroll}
                className={`relative w-full h-full overflow-y-scroll overflow-hidden no-scrollbar scroll-smooth`}
            >
                <div 
                    className={`w-full flex-col-center-center ${className}`}
                    style={{ height: contentHeight }}
                >
                    {children}
                </div>
            </div>
        );
    }
);

ScrollContainer.displayName = 'ScrollContainer';

export default ScrollContainer;

