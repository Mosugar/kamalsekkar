// components/About.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/about.module.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;

    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(image,
      { opacity: 0, scale: 0.8, rotateY: -15 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(content.children,
      { opacity: 0, y: 30, stagger: 0.2 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(stats.children,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Counter animation
    const counters = stats.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      gsap.fromTo(counter, 
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const achievements = [
    { number: 10, label: "Years Experience", suffix: "+" },
    { number: 100, label: "Projects Delivered", suffix: "+" },
    { number: 1, label: "Studios Founded", suffix: "" },
    // { number: 50, label: "Happy Clients", suffix: "+" }
  ];

  const expertise = [
    "Fashion & Portrait Photography",
    "Commercial Video Production", 
    "Brand Storytelling",
    "Digital Content Strategy"
  ];

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <div className={styles.imageSection} ref={imageRef}>
            <div className={styles.imageContainer}>
              <div className={styles.profileImage}>
                <img 
                  src="https://res.cloudinary.com/dylpck2et/image/upload/v1757189208/IMG_3066_aslunw.jpg" 
                  alt="Kamal Sekkar - Professional Photographer & Cinematographer"
                  className={styles.profilePhoto}
                />
                <div className={styles.imageFrame}></div>
              </div>
              <div className={styles.creativeBadge}>
                <span>10+ Years</span>
                <small>Experience</small>
              </div>
            </div>
          </div>

          <div className={styles.contentSection} ref={contentRef}>
            <div className={styles.header}>
              <span className={styles.subtitle}>About</span>
              <h2 className={styles.title}>
                Visual Storyteller &
                <span className={styles.highlight}> Creative Director</span>
              </h2>
            </div>

            <div className={styles.description}>
              <p>
                I'm <strong>Kamal Sekkar</strong>, a photographer and cinematographer with over a decade 
                of experience creating compelling visual narratives. From intimate portraits to 
                national broadcast television, I bring stories to life through the lens.
              </p>
              <p>
                As Founder of <strong>Wardd Studios</strong>, I've delivered 100+ projects across 
                fashion, real estate, and e-commerce. My background includes broadcast work at 
                <strong> SNRT</strong> and a professional degree in Audiovisual & Cinema.
              </p>
            </div>

            <div className={styles.expertise}>
              <h3>What I Do Best</h3>
              <div className={styles.expertiseGrid}>
                {expertise.map((item, index) => (
                  <div key={index} className={styles.expertiseItem}>
                    <span className={styles.expertiseIcon}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              <a 
                href="#contact"
                className={styles.primaryBtn}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start a Project
              </a>
              <a 
                href="https://www.linkedin.com/in/kamal-sekkar/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect
              </a>
            </div>
          </div>
        </div>

        <div className={styles.stats} ref={statsRef}>
          {achievements.map((achievement, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statNumber}>
                <span data-count={achievement.number}>0</span>
                <span className={styles.suffix}>{achievement.suffix}</span>
              </div>
              <div className={styles.statLabel}>{achievement.label}</div>
              <div className={styles.statDecoration}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;