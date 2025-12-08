import Header from './components/Header';
import Spin from './pages/Spin';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#88d4ec] font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <Spin />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;