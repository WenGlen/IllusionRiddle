import RotateLine from '../element/RotateLine';

interface IconProps {
}

export default function HeringIcon({
}: IconProps) {
    return (
        <div id="hering-icon" className={`relative w-full h-full overflow-hidden pointer-events-none`}> 
            <div >

                <RotateLine smHidden="off" rotate={20}/>
                <RotateLine smHidden="on" rotate={30}/>
                <RotateLine smHidden="off" rotate={40}/>
                <RotateLine smHidden="on" rotate={50}/>
                <RotateLine smHidden="off" rotate={60}/>
                <RotateLine smHidden="on" rotate={70}/>
                <RotateLine smHidden="off" rotate={80}/>
                <RotateLine smHidden="on" rotate={90}/>

            </div>

            <div >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[10px] md:-translate-y-[14px] w-full h-[2px] bg-border"/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2  translate-y-[8px]  md:translate-y-[12px] w-full h-[2px] bg-border"/>
            </div>

        </div>
    );
}
