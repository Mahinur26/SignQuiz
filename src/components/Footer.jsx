const Footer = () => {
  return (
    <footer className="flex justify-center items-center py-4">
      <div className="flex glassy rounded-full overflow-hidden shadow-lg">
        <button className="flex-1 min-w-[120px] max-w-[480px] h-14 px-8 bg-white/30 text-white text-lg font-bold tracking-[0.015em]">
          Practice
        </button>
        <button className="flex-1 min-w-[120px] max-w-[480px] h-14 px-8 bg-primary text-white text-lg font-bold tracking-[0.015em]">
          Quiz
        </button>
      </div>
    </footer>
  );
};

export default Footer;
