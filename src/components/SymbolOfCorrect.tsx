interface symbolOfCorrectProps {
    y?: string;
    content?: string;
}

export default function SymbolOfCorrect({
    y="0px",
    content="Answer",
}: symbolOfCorrectProps) {
    return (
        <div className={`fixed right-4 top-4 w-36 h-48 bg-background border border-border  shadow-lg z-[60] flex-col-center-center`}
             style={{ transform: `translateY(${y})` }}>
            <div className="w-32 h-32 border border-border">
            </div>
            <p className="text-center">
                {content} <br/> illusion
            </p>
        </div>
    );
}