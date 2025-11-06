import './App.css'
import './css/index.scss'
import { useState } from 'react'
import Hero from './section/1-Hero'
import HowToPlay from './section/2-HowToPlay'
import HeringIllusion from './section/3-HeringIllusion'
import MullerLyerIllusion from './section/4-MullerLyerIllusion'
import SymbolOfCorrect from './components/SymbolOfCorrect'
import Test from './section/N-test'


function App() {
  const [heringCorrect, setHeringCorrect] = useState(false);
  const [mullerLyerCorrect, setMullerLyerCorrect] = useState(false);

  return (
    <>
      <div className="w-screen h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth no-scrollbar">
        <Hero show="" />
        <HowToPlay show="" />
        <HeringIllusion show="" onAnswerCorrect={() => setHeringCorrect(true)} />
        <MullerLyerIllusion show="" onAnswerCorrect={() => setMullerLyerCorrect(true)} />
        <Test show="hidden" />
        <HowToPlay show="" content="Sorry, that’s all for now — more to come!" />
        

        {/* 答對色塊 */}
        {heringCorrect && (
          <SymbolOfCorrect y="0px" content="Hering" />
        )}

        {mullerLyerCorrect && (
          <SymbolOfCorrect y="220px" content="Müller-Lyer" />
        )}


      </div>
    </>
  );
}

export default App;
