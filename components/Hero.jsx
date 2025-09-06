// components/Hero.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/hero.module.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 }); // Wait for preloader
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = heroRef.current;
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
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
      <div className={styles.heroBackground}>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.particles}></div>
      </div>
      
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle} ref={titleRef}>
              <span className={styles.greeting}>Hello, I'm</span>
              <br />
              <span className={styles.name}>Kamal</span>
              <span className={styles.accent}> Sekkar</span>
            </h1>
            
            <h2 className={styles.subtitle} ref={subtitleRef}>
              Professional Photographer & Cinematographer
            </h2>
            
            <p className={styles.description} ref={descRef}>
              With over <span className={styles.highlight}>10+ years of experience</span>, 
              I create high-quality visual content that captures emotion, detail, and story. 
              Specialized in Fashion, Food, Portraits, Music Videos, Commercials & TV Reportage.
            </p>
            
            <div className={styles.cta} ref={ctaRef}>
              <button 
                className={styles.primaryBtn}
                onClick={scrollToPortfolio}
              >
                View Portfolio
              </button>
              <button 
                className={styles.secondaryBtn}
                onClick={scrollToContact}
              >
                Get In Touch
              </button>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.cameraIcon}>
              <div className={styles.lens}></div>
              <div className={styles.flash}></div>
            </div>
          </div>
        </div>
        
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel}></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;