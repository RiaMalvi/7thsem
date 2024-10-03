// src/app/page.tsx
"use-client";

import Footer from "./components/Footer";
import Header from "./components/Header"; // Import the Header component
import Hero from "./components/landing/Hero";
import About from "./components/landing/About";
import Services from "./components/landing/Services";
import Faq from "./components/landing/Faq";
import Contact from "./components/landing/Contact";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Add flex and min-h-screen */}
      <Header />
      <main className="flex-grow">
        {" "}
        {/* Allow the main content to grow */}
        <Hero />
        <About />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
