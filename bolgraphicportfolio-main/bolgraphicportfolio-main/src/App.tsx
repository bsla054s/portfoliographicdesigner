import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Benefits from './components/Benefits';
import Contact from './components/Contact';
import FloatingElements from './components/FloatingElements';

function App() {
  return (
    <div className="min-h-screen bg-white relative">
      <FloatingElements />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Benefits />
      <Contact />
    </div>
  );
}

export default App;
