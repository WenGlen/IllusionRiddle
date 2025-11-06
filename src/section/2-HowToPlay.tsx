interface sectionProps {
    show?: "" | "hidden";
    content?: string;
}

const showStatus = {
    "": "block",
    hidden: "!hidden",
};



export default function HowToPlay({
    show="",
    content= "Look at the illusion.<br/>Imagine and make it stronger.<br/>Find the word!",
  }: sectionProps) {
    const lines = content.split('<br/>');
    
    return (
      <section id="how-to-play" className={`w-screen h-screen text-xl flex-col-center-center snap-start snap-always ${showStatus[show]}`}>
        <div>
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </section>
    );
}