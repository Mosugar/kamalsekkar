// components/Preloader.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/preloader.module.css';

const Preloader = () => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .to([logoRef.current, textRef.current],
      { opacity: 0, duration: 0.5, ease: "power2.in" },
      "+=0.5"
    )
    .to(preloaderRef.current,
      { y: "-100%", duration: 0.8, ease: "power2.inOut" },
      "-=0.2"
    );
  }, []);

  return (
    <div className={styles.preloader} ref={preloaderRef}>
      <div className={styles.preloaderContent}>
        <div className={styles.logo} ref={logoRef}>
          <div className={styles.camera}>📸</div>
        </div>
        <div className={styles.text} ref={textRef}>
          <h2>Kamal Sekkar</h2>
          <p>Loading Portfolio...</p>
        </div>
        <div className={styles.loadingBar}>
          <div className={styles.loadingProgress}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;