import './App.css'
import './css/index.scss'
import { useState, useRef } from 'react'
import Hero from './section/1-Hero'
import HowToPlay from './section/2-HowToPlay'
import HeringIllusion from './section/3-HeringIllusion'
import MullerLyerIllusion from './section/4-MullerLyerIllusion'
import CafeWallIllusion from './section/5-CafeWallIllusion'
import ScoreSection from './section/Final-ScoreSection'

import SymbolOfCorrect from './components/SymbolOfCorrect'

import HeringIcon from './components/answerCard-icon/HeringIcon'
import MullerLyerIcon from './components/answerCard-icon/MullerLyerIcon'
import CafeWallIcon from './components/answerCard-icon/CafeWallIcon'


import SafetyRangeTool from './layouts/test-SafetyRangeTool'

function App() {
  const [heringCorrect, setHeringCorrect] = useState(false);
  const [mullerLyerCorrect, setMullerLyerCorrect] = useState(false);
  const [cafeWallCorrect, setCafeWallCorrect] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setHeringCorrect(false);
    setMullerLyerCorrect(false);
    setCafeWallCorrect(false);
    setResetKey(prev => prev + 1); // 增加 resetKey 以重置所有组件
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div /* 側邊會顯示答案的範圍 */ className="relative w-screen h-screen overflow-y-scroll scroll-smooth no-scrollbar "  >

        <div className="w-screen h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth no-scrollbar"
             ref={scrollContainerRef}>

          <Hero show="" />
          <HowToPlay show="" />
          <HeringIllusion key={`hering-${resetKey}`} show="" onAnswerCorrect={() => setHeringCorrect(true)} />
          <MullerLyerIllusion key={`muller-lyer-${resetKey}`} show="" onAnswerCorrect={() => setMullerLyerCorrect(true)} />
          <CafeWallIllusion key={`cafe-wall-${resetKey}`} show="" onAnswerCorrect={() => setCafeWallCorrect(true)} />
          
          <div /* 答案顯示區域 */ className="absolute top-8 right-4 z-[60] max-w-[calc(100vw-2rem)]">
            <div className="flex-row-center md:flex-col-center gap-4 overflow-x-auto scroll-smooth no-scrollbar flex-nowrap ">
            {heringCorrect && (<SymbolOfCorrect name="Hering" ><HeringIcon /></SymbolOfCorrect> )}
            {mullerLyerCorrect && (<SymbolOfCorrect name="Müller-Lyer" ><MullerLyerIcon /></SymbolOfCorrect> )}
            {cafeWallCorrect && (<SymbolOfCorrect name="Cafe Wall" ><CafeWallIcon /></SymbolOfCorrect> )}
            </div>
          </div>

        </div>

        <ScoreSection 
          heringCorrect={heringCorrect}
          mullerLyerCorrect={mullerLyerCorrect}
          cafeWallCorrect={cafeWallCorrect}
          onReset={handleReset}
        />

        <SafetyRangeTool show="hidden" />
        
      </div>
    </>
  );
}

export default App;
