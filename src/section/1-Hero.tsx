interface sectionProps {
  show?: "" | "hidden";
}

const showStatus = {
  "": "block",
  hidden: "!hidden",
};

export default function Hero({
    show=""
  }: sectionProps) {
    return (
      <section id="hero" className={`w-screen h-screen flex-col-center-center snap-start snap-always ${showStatus[show]}`}>

        <div className="relative rotate-90">

          <div className="absolute-start translate-x-[var(--hero-Xregulate)] translate-y-[var(--hero-Yregulate)]">


            <div className="absolute-start">

              <div className="absolute-Frame hero-Frame-ILL translate-x-[0] ">
                <div className="hero-ILL-I1">l<span className="text-primary">i</span>l</div>
              </div>

              
                <div className="absolute-Frame hero-Frame-ILL translate-x-[var(--hero-spacing)]">
                  <div className="hero-ILL-Usion">
                    <div className="hero-ILL-I2">lil<br/><span className="text-primary">lil</span><br/>lil</div>
                  </div>
                </div>
                
                <div className="absolute-Frame hero-Frame-ILL translate-x-[var(--hero-2spacing)]">
                  <div className="hero-ILL-Usion">
                    <div className="hero-ILL-I3 ">lil<br/><span className="text-primary">lil</span><br/>lil</div>
                  </div>
                </div>
              

              <div className="absolute-Frame hero-Frame-usion translate-x-[var(--hero-3spacing)]">
              <div className="hero-ILL-Usion">usion<br/><span className="text-primary">usion</span><br/>usion</div>
              </div>
            </div>

            <div className="absolute-start translate-y-[var(--hero-Ybetween)]">

              <div className="absolute-start -translate-x-[0]  w-[240px] h-[var(--hero-frameHeight)]  overflow-hidden ">
                <div className="hero-RI-R relative">

                  <div className="absolute-Frame hero-Frame-ILL top-0 left-0">
                    <div className="hero-RI-I1">lil</div>
                  </div>

                  <div className="absolute-Frame hero-Frame-ILL translate-x-[var(--hero-spacing)]">
                    <div className="hero-RI-I2">lil</div>
                  </div>

                  <div className="absolute-star translate-x-[18px] translate-y-[var(--lineHeight)] text-primary">R</div>

                  <div className="absolute-Frame hero-Frame-ILL translate-y-[var(--2lineHeight)]">
                    <div className="hero-RI-I1">lil</div>
                  </div>

                  <div className="absolute-Frame hero-Frame-ILL translate-x-[var(--hero-spacing)] translate-y-[var(--2lineHeight)]">
                    <div className="hero-RI-I2">lil</div>
                  </div>

                </div>
              </div>

              <div className="absolute-Frame hero-Frame-ILL translate-x-[var(--hero-2spacing)]">
                <div className="hero-RI-I3">l<span className="text-primary">i</span>l</div>
              </div>

              <div className="absolute-Frame hero-Frame-usion translate-x-[var(--hero-3spacing)]">
                <div className="hero-RI-R">usion<br/><span className="text-primary">ddle</span><br/>usion</div>
              </div>
            </div>

          </div>

        </div>
        
      </section>
    );
}



