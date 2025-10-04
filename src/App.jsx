import Header from "./components/Header";
import Footer from "./components/Footer";
import PracticePage from "./pages/PracticePage";

function App() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#0d171b] dark:text-slate-50">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
      <div className="absolute inset-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gray-700/20 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative flex flex-col h-full">
        <Header />
        <PracticePage />
        <Footer />
      </div>
    </div>
  );
}

export default App;
