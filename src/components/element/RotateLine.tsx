interface lineProps {
    smHidden?: "on" | "off";
    rotate?: number;
}




const smHiddenOptions = {
    "on": "hidden md:block",
    "off": "",

}

export default function RotateLine({
    rotate,
    smHidden = "off",
    }: lineProps) {
    return (
        <>
            <div className={`absolute-center ${smHiddenOptions[smHidden]}`}>
                <div className="lines" style={{ transform: `rotate(${rotate}deg)` }}/>
                <> {rotate !== 90 && rotate !== undefined && (
                <div className={`absolute-center ${smHiddenOptions[smHidden]}`}>
                    <div className="lines" style={{ transform: `rotate(${-rotate}deg)` }}/>
                </div>
                )}
                </>
            </div>

        </>
    );
}
