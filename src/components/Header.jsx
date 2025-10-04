const Header = () => {
  return (
    <header className="px-10 py-3 flex items-center justify-between whitespace-nowrap text-white">
      <div className="flex items-center gap-4">
        <div className="size-6">
          <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">LinguaLearn</h2>
      </div>
      <nav className="flex items-center gap-9 text-sm font-medium">
        <a href="#">Home</a>
        <a href="#">About Us</a>
      </nav>
    </header>
  );
};

export default Header;
