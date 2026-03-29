import { useRef } from 'react';
import Nav      from './components/Nav';
import Hero     from './components/Hero';
import Projects from './components/Projects';
import About    from './components/About';
import Skills   from './components/Skills';
import Contact  from './components/Contact';
import Footer   from './components/Footer';
import useTheme from './hooks/useTheme';

export default function App() {
  const { theme, toggle } = useTheme();
  const stackRef      = useRef(null);   // hero stack-wrap element
  const stackCardRefs = useRef([]);     // individual stack card elements
  const flipControls  = useRef(null);   // pause/resume flip loop

  return (
    <div style={{ position: 'relative' }}>
      <Nav theme={theme} onToggleTheme={toggle} />

      <Hero
        stackRef={stackRef}
        stackCardRefs={stackCardRefs}
        onStackReady={(_, controls) => { flipControls.current = controls; }}
      />

      {/* Projects receives stackRef so it can measure + hide the hero stack on scroll */}
      <Projects stackRef={stackRef} stackCardRefs={stackCardRefs} flipControls={flipControls} />

      <About />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
