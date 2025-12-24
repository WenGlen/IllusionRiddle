
import { useIsMobile } from '../../hooks/useIsMobile';

interface IconProps {
}

export default function CafeWallIcon({
}: IconProps) {
    const isMobile = useIsMobile();
    const unitHeight = isMobile ? 8 : 16;
    const unitMoveX = isMobile ? 2 : 4;


    return (
        <div className="w-full h-full flex-col-center-center overflow-hidden">
            
            <div className="general-line w-full"/>

            <div className="flex-row-center-center" style={{ transform: `translatex(${unitMoveX}px)` }}>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            </div>

            <div className="general-line w-full"/>

            <div className="flex-row-center-center" style={{ transform: `translatex(${-unitMoveX}px)` }}>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            </div>

            <div className="general-line w-full"/>

            <div className="flex-row-center-center" style={{ transform: `translatex(${unitMoveX}px)` }}>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            </div>

            <div className="general-line w-full"/>

            <div className="flex-row-center-center" style={{ transform: `translatex(${-unitMoveX}px)` }}>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            </div>

            <div className="general-line w-full"/>

            <div className="flex-row-center-center" style={{ transform: `translatex(${unitMoveX}px)` }}>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className=" " style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
                <div className="bg-border" style={{ width: `${unitHeight}px`, height: `${unitHeight}px` }}/>
            </div>

            <div className="general-line w-full"/>

        </div>
    );
}
