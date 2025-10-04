import VideoFeed from "../components/VideoFeed";
import LanguageCard from "../components/LanguageCard";
import ImageCard from "../components/ImageCard";

const PracticePage = () => {
  return (
    <main className="flex flex-1 items-center justify-center px-8 gap-8 overflow-hidden">
      <div className="flex w-full h-[95%] max-w-8xl gap-5">
        <div className="w-1/2 flex items-center justify-center">
          <VideoFeed />
        </div>
        <div className="w-1/2 flex flex-col gap-4 justify-between">
          <LanguageCard />
          <ImageCard />
        </div>
      </div>
    </main>
  );
};

export default PracticePage;
