interface SafetyRangeToolProps {
    show?: "" | "hidden";
}

export default function SafetyRangeTool({ show = "" }: SafetyRangeToolProps) {
    const showStatus = {
        "": "block",
        hidden: "!hidden",
    };

    return (
        <div id="safety-range-tool" className={`${showStatus[show]}`}>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[960px] h-[600px] border border-red-500 pointer-events-none z-[99]"/>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[880px] border border-blue-500 pointer-events-none z-[99]"/>
        </div>

    );
}