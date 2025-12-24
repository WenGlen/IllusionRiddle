interface CafeWallUnitProps {

    unitHeight: number;
    unitMoveX: number;
    opacity: number;

}

export default function CafeWallUnit({

    unitHeight=48,
    unitMoveX=0,
    opacity=1,

}: CafeWallUnitProps) {
    return (
        <div className="flex-row-center-center" style={{ transform: `translatex(${unitMoveX}px)`, opacity: `${opacity}` }}>
            <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            <div className=" " style={{ width: `${unitHeight*2}px`, height: `${unitHeight}px` }}/>
            <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
        </div>
    );
}

