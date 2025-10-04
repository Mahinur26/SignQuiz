import VideoFeed from "../components/VideoFeed";
import LanguageCard from "../components/LanguageCard";
import ImageCard from "../components/ImageCard";

const PracticePage = ({ mode }) => {
  return (
    <main className="flex flex-1 items-center justify-center px-8 gap-8 overflow-hidden">
      <div className="flex w-full h-[95%] max-w-7xl gap-8">
        {/* Left side - Video feed always visible */}
        <div className="w-1/2 flex items-center justify-center">
          <VideoFeed />
        </div>

        {/* Right side */}
        <div className="w-1/2 flex flex-col gap-6 justify-between">
          {/* Conditionally render LanguageCard */}
          {mode === "practice" && <LanguageCard />}
          <ImageCard />
        </div>
      </div>
    </main>
  );
};

export default PracticePage;
