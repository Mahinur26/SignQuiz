const Footer = ({ setMode, mode }) => {
  return (
    <footer className="flex justify-center items-center py-4">
      <div className="flex glassy rounded-full overflow-hidden shadow-lg">
        <button
          onClick={() => setMode("practice")}
          className={`flex-1 min-w-[120px] max-w-[480px] h-14 px-8 text-lg font-bold tracking-[0.015em] ${
            mode === "practice"
              ? "bg-primary text-white"
              : "bg-white/30 text-white hover:bg-primary/60"
          }`}
        >
          Practice
        </button>
        <button
          onClick={() => setMode("quiz")}
          className={`flex-1 min-w-[120px] max-w-[480px] h-14 px-8 text-lg font-bold tracking-[0.015em] ${
            mode === "quiz"
              ? "bg-primary text-white"
              : "bg-white/30 text-white hover:bg-primary/60"
          }`}
        >
          Quiz
        </button>
      </div>
    </footer>
  );
};

export default Footer;
