import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Advantages from './components/Advantages.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import EmojiField from './components/EmojiField.jsx';
import useFadeUp from './hooks/useFadeUp.js';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useFadeUp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <EmojiField />
      <Nav scrolled={scrolled} />
      <Hero />
      <Advantages />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
