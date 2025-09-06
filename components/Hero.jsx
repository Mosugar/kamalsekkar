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
  const viewfinderRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 }); // Wait for preloader
    
    // Animate viewfinder first
    tl.fromTo(viewfinderRef.current,
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      "-=1"
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
      </div>

      <div className={styles.viewfinderContainer} ref={viewfinderRef}>
        <img 
          src="https://res.cloudinary.com/dylpck2et/image/upload/v1757191601/camera-lens-view-finder-display-background_z1samt.png"
          alt="Camera Viewfinder"
          className={styles.viewfinderImage}
        />
        <div className={styles.viewfinderOverlay}></div>
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
              Visual Storyteller & Cinematic Artist
            </h2>
            
            <p className={styles.description} ref={descRef}>
              With a professional degree in <span className={styles.highlight}>Audiovisual & Cinematic Arts</span> and over a decade of experience since 2015, I've crafted compelling visual narratives from intimate portraits to broadcast television. Former collaborator with <span className={styles.highlight}>Laâyoune Regional TV</span>, I bring both creative vision and technical precision to every frame.
            </p>
            
            <div className={styles.cta} ref={ctaRef}>
              <button 
                className={styles.primaryBtn}
                onClick={scrollToPortfolio}
              >
                <span>View Portfolio</span>
                <div className={styles.btnGlow}></div>
              </button>
              <button 
                className={styles.secondaryBtn}
                onClick={scrollToContact}
              >
                <span>Get In Touch</span>
                <div className={styles.btnBorder}></div>
              </button>
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

      {/* Recording overlay UI elements */}
      <div className={styles.cameraUI}>
        <div className={styles.recordingIndicator}>
          <div className={styles.recDot}></div>
          <span>REC</span>
        </div>
        <div className={styles.cameraSettings}>
          <span className={styles.resolution}>4K • 60fps</span>
          <span className={styles.timer}>00:00:47</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;