// components/Preloader.jsx - Creative Cinematic Preloader
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/preloader.module.css';

const Preloader = () => {
  const preloaderRef = useRef(null);
  const clapperRef = useRef(null);
  const titleRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progressive loading animation
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // GSAP Timeline for cinematic entrance
    const tl = gsap.timeline();
    
    // Cinematic entrance sequence
    if (clapperRef.current) {
      tl.fromTo(clapperRef.current,
        { 
          scale: 0, 
          rotation: -180, 
          opacity: 0,
          y: -100 
        },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1,
          y: 0,
          duration: 1.2, 
          ease: "back.out(1.7)" 
        }
      );
    }
    
    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { 
          opacity: 0, 
          y: 50,
          scale: 0.8 
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8, 
          ease: "power3.out" 
        },
        "-=0.6"
      );
    }
    
    if (progressRef.current) {
      tl.fromTo(progressRef.current,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.9 
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6, 
          ease: "power3.out" 
        },
        "-=0.4"
      );
    }

    // Exit animation after loading
    const exitTimeout = setTimeout(() => {
      const exitTl = gsap.timeline();
      
      // Collect valid refs
      const validRefs = [
        clapperRef.current,
        titleRef.current,
        progressRef.current
      ].filter(ref => ref !== null);
      
      if (validRefs.length > 0) {
        exitTl.to(validRefs,
          { 
            opacity: 0, 
            y: -30,
            scale: 0.9,
            duration: 0.6, 
            ease: "power2.in",
            stagger: 0.1
          }
        );
      }
      
      if (preloaderRef.current) {
        exitTl.to(preloaderRef.current,
          { 
            y: "-100%", 
            duration: 0.8, 
            ease: "power2.inOut" 
          },
          "-=0.3"
        );
      }
    }, 3000);

    return () => {
      clearInterval(loadingInterval);
      clearTimeout(exitTimeout);
    };
  }, []);

  return (
    <div className={styles.preloader} ref={preloaderRef}>
      {/* Camera focus frame */}
      <div className={styles.focusFrame}></div>
      
      {/* Focus corner indicators */}
      <div className={styles.focusCorners}>
        <div className={styles.focusCorner}></div>
        <div className={styles.focusCorner}></div>
        <div className={styles.focusCorner}></div>
        <div className={styles.focusCorner}></div>
      </div>

      <div className={styles.preloaderContent}>
        {/* Clapperboard Logo */}
        <div className={styles.logo} ref={clapperRef}>
          <div className={styles.clapperboardContainer}>
            <img 
              src="https://res.cloudinary.com/dylpck2et/image/upload/v1757260304/Pngtree_movie_filming_props_clapperboard_film_5493444_bhtqfg.png"
              alt="Director's Clapperboard"
              className={styles.clapperboardImage}
            />
          </div>
        </div>

        {/* Director Title */}
        <div className={styles.text} ref={titleRef}>
          <h1 className={styles.directorTitle}>KAMAL SEKKAR</h1>
          <p className={styles.subtitle}>Director • Cinematographer</p>
          <div className={styles.loadingText}>LOADING PORTFOLIO...</div>
        </div>

        {/* Creative Loading Bar */}
        <div className={styles.loadingSection} ref={progressRef}>
          <div className={styles.progressText}>{Math.floor(progress)}%</div>
          <div className={styles.filmStrip}>
            <div 
              className={styles.loadingProgress}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Director Credits */}
      <div className={styles.credits}>
        <div className={styles.creditLine}>Directed by</div>
        <div className={styles.directorName}>KAMAL SEKKAR</div>
      </div>
    </div>
  );
};

export default Preloader;