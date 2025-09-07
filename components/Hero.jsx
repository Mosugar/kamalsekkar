// components/Hero.jsx - Clean Modern Cinematic Hero
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/hero.module.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const clapperRef = useRef(null);
  const filmStripRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3 }); // Wait for preloader
    
    // Clean entrance animations
    tl.fromTo(filmStripRef.current?.children || [],
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    )
    .fromTo(clapperRef.current,
      { opacity: 0, y: -30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.6"
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(ctaRef.current?.children || [],
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Subtle parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = heroRef.current;
      const speed = scrolled * 0.1;
      if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      {/* Clean Background */}
      <div className={styles.heroBackground}></div>

      {/* Minimal Film Strip */}
      <div className={styles.filmStrip} ref={filmStripRef}>
        <div className={styles.perforation}></div>
        <div className={styles.perforation}></div>
        <div className={styles.perforation}></div>
      </div>
      
      {/* Main Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.heroText}>
            {/* Modern Clapperboard */}
            <div className={styles.clapperboard} ref={clapperRef}>
              <div className={styles.clapperStripes}>
                <div className={styles.clapperStripe}></div>
                <div className={styles.clapperStripe}></div>
                <div className={styles.clapperStripe}></div>
              </div>
              <div className={styles.clapperInfo}>
                <div>SCENE: HERO</div>
                <div>TAKE: 01</div>
              </div>
            </div>

            {/* Clean Title */}
            <h1 className={styles.heroTitle} ref={titleRef}>
              <span className={styles.greeting}>Lights, Camera, Action</span>
              <span className={styles.name}>KAMAL</span>
              <span className={styles.accent}>SEKKAR</span>
            </h1>
            
            {/* Professional Subtitle */}
            <h2 className={styles.subtitle} ref={subtitleRef}>
              Director • Cinematographer • Visual Storyteller
            </h2>
            
            {/* Action Buttons */}
            <div className={styles.cta} ref={ctaRef}>
              <button 
                className={styles.primaryBtn}
                onClick={scrollToPortfolio}
                aria-label="View Portfolio Reel"
              >
                View Reel
              </button>
              <button 
                className={styles.secondaryBtn}
                onClick={scrollToContact}
                aria-label="Get In Touch"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Director Credits */}
        <div className={styles.heroCredits}>
          Directed by Kamal Sekkar
        </div>
      </div>

      {/* Minimal Camera UI */}
      <div className={styles.cameraUI}>
        {/* Recording Indicator */}
        <div className={styles.recordingIndicator}>
          <div className={styles.recDot}></div>
          <span>RECORDING</span>
        </div>
        
        {/* Camera Settings */}
        <div className={styles.cameraSettings}>
          <div className={styles.resolution}>4K • CINEMA</div>
          <div className={styles.timer}>00:00:47</div>
        </div>
      </div>

      {/* Subtle Film Grain */}
      <div className={styles.filmGrain}></div>
    </section>
  );
};

export default Hero;