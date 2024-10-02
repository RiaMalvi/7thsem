// src/app/page.tsx
import Footer from './components/Footer';
import Header from './components/Header'; // Import the Header component
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Add flex and min-h-screen */}
      <Header />
      <main className="flex-grow"> {/* Allow the main content to grow */}
        <Hero />
        <Features/>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
