import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PracticePage from "./pages/PracticePage";
import "./index.css";

function App() {
  // Track whether we’re in practice or quiz mode
  const [mode, setMode] = useState("practice");

  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#0d171b] dark:text-slate-50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
      <div className="absolute inset-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gray-700/20 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Layout */}
      <div className="relative flex flex-col justify-between flex-1 h-full overflow-hidden">
        <Header />
        <PracticePage mode={mode} />
        <Footer setMode={setMode} mode={mode} />
      </div>
    </div>
  );
}

export default App;
