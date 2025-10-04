import { useState } from "react";

const LanguageCard = () => {
  const languages = [
    "Mandarin Chinese (Simplified)",
    "Spanish (Spain)",
    "French (France)",
    "German (Standard)",
    "Japanese (Standard)",
    "Italian (Standard)",
    "Korean (Standard)",
    "Portuguese (Brazil)",
    "Russian (Standard)",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLanguage = languages[currentIndex];

  // navigate through list
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < languages.length - 1) setCurrentIndex(currentIndex + 1);
  };

  // dropdown selection
  const handleSelect = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="glassy rounded-lg flex flex-col flex-1 p-4 justify-between">
      {/* Top controls */}
      <div className="flex justify-between gap-2 px-2 py-1">
        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2 text-white rounded ${
              currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === languages.length - 1}
            className={`p-2 text-white rounded ${
              currentIndex === languages.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        {/* Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 p-2 text-white">
            <span className="truncate">{currentLanguage}</span>
            <span className="material-symbols-outlined">expand_more</span>
          </button>

          {/* Dropdown menu */}
          <div className="absolute hidden group-hover:block right-0 mt-2 w-56 rounded-md shadow-lg glassy z-10">
            <div className="py-1 rounded-md max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {languages.map((lang, index) => (
                <button
                  key={lang}
                  onClick={() => handleSelect(index)}
                  className={`block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 ${
                    index === currentIndex ? "bg-white/20" : ""
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Word display (for demo) */}
      <div className="flex-1 bg-white/20 dark:bg-black/10 flex flex-col items-center justify-center rounded-md text-center p-4">
        <p className="text-4xl font-bold text-white">你好</p>
        <p className="text-lg text-white/80 mt-2">Hello</p>
      </div>
    </div>
  );
};

export default LanguageCard;
