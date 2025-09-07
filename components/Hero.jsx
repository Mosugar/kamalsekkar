// components/Hero.jsx - Optimized Full Size Cinematic Director Hero
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/hero.module.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const viewfinderRef = useRef(null);
  const clapperRef = useRef(null);
  const filmStripRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 }); // Wait for preloader
    
    // Cinematic entrance animations
    tl.fromTo(filmStripRef.current?.children || [],
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power2.out" }
    )
    .fromTo(viewfinderRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
      "-=1"
    )
    .fromTo(clapperRef.current,
      { opacity: 0, y: -50, rotateX: -20 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "back.out(1.7)" },
      "-=1"
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 100, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50, rotateX: -10 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(ctaRef.current?.children || [],
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Professional parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = heroRef.current;
      const speed = scrolled * 0.15; // Subtle parallax for cinematic feel
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
      {/* Cinematic Background Layers */}
      <div className={styles.heroBackground}>
        <div className={styles.gradientOverlay}></div>
      </div>

      {/* Film Strip Decoration */}
      <div className={styles.filmStrip} ref={filmStripRef}>
        <div className={styles.perforation}></div>
        <div className={styles.perforation}></div>
        <div className={styles.perforation}></div>
        <div className={styles.perforation}></div>
        <div className={styles.perforation}></div>
      </div>

      {/* Viewfinder Background Integration */}
      <div className={styles.viewfinderContainer} ref={viewfinderRef}>
        <img 
          src="https://res.cloudinary.com/dylpck2et/image/upload/v1757191601/camera-lens-view-finder-display-background_z1samt.png"
          alt="Camera Viewfinder Background"
          className={styles.viewfinderImage}
        />
        <div className={styles.viewfinderOverlay}></div>
      </div>
      
      {/* Main Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.heroText}>
            {/* Director's Clapperboard */}
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

            {/* Cinematic Title */}
            <h1 className={styles.heroTitle} ref={titleRef}>
              <span className={styles.greeting}>Lights, Camera, Action</span>
              <br />
              <span className={styles.name}>Kamal</span>
              <span className={styles.accent}> Sekkar</span>
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
                <span>View Reel</span>
              </button>
              <button 
                className={styles.secondaryBtn}
                onClick={scrollToContact}
                aria-label="Get In Touch"
              >
                <span>Get In Touch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Director Credits */}
        <div className={styles.heroCredits}>
          <div>DIRECTED BY KAMAL SEKKAR</div>
        </div>
      </div>

      {/* Professional Camera UI */}
      <div className={styles.cameraUI}>
        {/* Recording Indicator */}
        <div className={styles.recordingIndicator}>
          <div className={styles.recDot}></div>
          <span>RECORDING</span>
        </div>
        
        {/* Camera Settings Display */}
        <div className={styles.cameraSettings}>
          <div className={styles.resolution}>4K • CINEMA</div>
          <div className={styles.timer}>00:00:47</div>
        </div>
      </div>

      {/* Film Grain Effect */}
      <div className={styles.filmGrain}></div>
    </section>
  );
};

export default Hero;