import ScrollContainer from '../components/ScrollContainer';
import HeringAnswer from '../components/answerSection/HeringAnswer';
//import { useRef } from 'react';

interface sectionProps {
    show?: "" | "hidden";
}

const showStatus = {
    "": "block",
    hidden: "!hidden",
};

export default function Test({
        show=""
    }: sectionProps) {



        //const scrollContainerRef = useRef<HTMLDivElement>(null);
        //const testScrollProgress = (scrollProgress: number) => {

        //};
        const eyeRadius = 100000/1;

        return (
            <section id="hering-illusion" className={`relative screen-fix ${showStatus[show]}`}>

                <div className="absolute-center z-10  w-full h-full  pointer-events-none overflow-hidden"> 
                    <div id="radial-lines" 
    
                         className="w-full h-full"></div>
                </div>

                <div className="absolute-center z-20 w-full h-full flex-col-center-center pointer-events-none">  
                        <div id="Eyelid" 
                         className="w-full h-[var(--hering-EyeHeight)] border-t-primaryThickness border-b-primaryThickness border-primary 
                                    flex-col-center-center overflow-hidden ">
                        <div id="Eyeball" 
                             className="w-[var(--hering-EyeballHeight)] h-[var(--hering-EyeballHeight)] flex-shrink-0 bg-background rounded-full border border-border"></div>
                    </div>
                </div>

                <HeringAnswer eyeRadius={ eyeRadius } />

                <ScrollContainer height="600vh" /*ref={scrollContainerRef} onScroll={testScrollProgress}*//>
                

            </section>
        );
}




/*
Hering Illusion
Müller-Lyer Illusion (Brentano Illusion)


Ebbinghaus Illusion ⊙ ◎
Caffee wall Illusion 
Poggendorff Illusion 
Helmholtz Illusion ||| ☰
Mach band effect 
Ponzo Illusion
Zöllner Illusion


__Gestalt__
Breathing Illusion

__XXX__
Fechner Illusion
Vertigo Illusion
Phantom Illusion
Double Vision Illusion
Apparent Motion Illusion


Stereoblind Illusion
Horizon Illusion
Stroop Illusion
Kusner Illusion
Superposition Illusion
Warren Illusion
Pecking Order Illusion
*/