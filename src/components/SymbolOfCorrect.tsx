import { type ReactNode } from 'react';

interface symbolOfCorrectProps {
    children?: ReactNode;
    y?: string;
    name?: string;
    img?: string;
}

export default function SymbolOfCorrect({
    children,
    y="0px",
    name="Answer",
}: symbolOfCorrectProps) {
    return (
        <div className={`border border-border-muted p-2 bg-background 
                            w-content        h-12    flex-row-between-center gap-2
                         md:w-24 md:h-36 md:flex-col-between-center`}
             style={{ transform: `translateY(${y})` }}>
            <div className="w-8 h-8  md:w-20 md:h-20 border border-border-muted ">
                {children}
            </div>
            <p className="text-center text-[12px] whitespace-nowrap">
                {name} <span className=" hidden md:inline"><br/>illusion</span>
            </p>
        </div>
    );
}