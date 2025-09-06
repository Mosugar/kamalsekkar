// components/ContactFooter.jsx - Cinematic Contact & Footer
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/contact-footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const ContactFooter = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(section?.children || [],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="contact" className={styles.contactFooter} ref={sectionRef}>
      <div className={styles.container}>
        {/* Cinematic Contact */}
        <div className={styles.contact}>
          <div className={styles.filmStrip}>
            <div className={styles.perforation}></div>
            <div className={styles.perforation}></div>
            <div className={styles.perforation}></div>
            <div className={styles.perforation}></div>
          </div>
          
          <div className={styles.titleCard}>
            <div className={styles.clapperboard}>
              <div className={styles.clapperTop}>
                <div className={styles.stripe}></div>
                <div className={styles.stripe}></div>
                <div className={styles.stripe}></div>
              </div>
              <div className={styles.clapperInfo}>
                <span className={styles.scene}>SCENE: CONTACT</span>
                <span className={styles.take}>TAKE: 01</span>
              </div>
            </div>
            <h2 className={styles.title}>LET'S CREATE SOMETHING LEGENDARY</h2>
          </div>

          <div className={styles.contactActions}>
            <a href="mailto:sekkarkamal@gmail.com" className={styles.actionButton}>
              <div className={styles.buttonIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className={styles.buttonText}>
                <span className={styles.buttonLabel}>DIRECT LINE</span>
                <span className={styles.buttonValue}>sekkarkamal@gmail.com</span>
              </div>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/kamal-sekkar/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.actionButton}
            >
              <div className={styles.buttonIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className={styles.buttonText}>
                <span className={styles.buttonLabel}>NETWORK</span>
                <span className={styles.buttonValue}>Professional Profile</span>
              </div>
            </a>
          </div>
        </div>

        {/* Cinematic Footer */}
        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.credits}>
              <div className={styles.creditTitle}>DIRECTED BY</div>
              <div className={styles.creditName}>KAMAL SEKKAR</div>
              <div className={styles.copyright}>© MMXXV ALL RIGHTS RESERVED</div>
            </div>
            
            <div className={styles.status}>
              <div className={styles.recordingLight}></div>
              <span className={styles.statusText}>ON SET • AVAILABLE FOR PROJECTS</span>
            </div>
          </div>
          
          <div className={styles.filmGrain}></div>
        </div>
      </div>
    </section>
  );
};

export default ContactFooter;