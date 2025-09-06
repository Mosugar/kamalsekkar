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
      { opacity: 0, x: -100, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(content,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(stats.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      "-=0.5"
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
    { number: 100, label: "Projects Completed", suffix: "+" },
    { number: 7, label: "Years in Broadcast TV", suffix: "+" },
    { number: 3, label: "Companies Founded", suffix: "" }
  ];

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <div className={styles.imageSection} ref={imageRef}>
            <div className={styles.imageWrapper}>
              <div className={styles.profileImage}>
                {/* Placeholder for Kamal's photo */}
                <div className={styles.imagePlaceholder}>
                  <span>📸</span>
                </div>
              </div>
              <div className={styles.imageOverlay}></div>
            </div>
            <div className={styles.floatingElements}>
              <div className={styles.element1}>🎬</div>
              <div className={styles.element2}>📺</div>
              <div className={styles.element3}>🎨</div>
            </div>
          </div>

          <div className={styles.textSection} ref={contentRef}>
            <div className={styles.sectionHeader}>
              <span className={styles.subtitle}>About Me</span>
              <h2 className={styles.title}>
                Creative Director & 
                <span className={styles.highlight}> Visual Storyteller</span>
              </h2>
            </div>

            <div className={styles.description}>
              <p>
                Hello, my name is <strong>Sekkar Kamal</strong>. I'm a Professional Photographer & 
                Cinematographer with over a decade of experience in creating compelling visual narratives 
                that span from intimate portraits to national broadcast television.
              </p>
              <p>
                I hold a professional degree in <strong>Audiovisual & Cinema</strong> from Mondial Media 
                International University, complemented by advanced studies at the International Institute 
                of Media and Journalism. This solid educational foundation has been the cornerstone of my 
                10+ year journey in the visual arts industry.
              </p>
              <p>
                Currently serving as <strong>Founder & Creative Director of Wardd Studios</strong> since August 2024, 
                I've successfully launched over 100 projects across diverse sectors including real estate, 
                education, fashion, and e-commerce. My previous experience as a Camera Operator & Visual Content 
                Producer at <strong>SNRT</strong> provided me with invaluable broadcast television expertise, 
                where I produced content for national audiences.
              </p>
              <p>
                My approach combines technical precision with creative vision, whether I'm directing a 
                multi-disciplinary team, filming a music video, or crafting visual content for digital platforms. 
                I personally handle filming, production, and editing while leading production and post-production teams.
              </p>
            </div>

            <div className={styles.specialties}>
              <h3>Core Specializations</h3>
              <div className={styles.specialtyList}>
                <span className={styles.specialtyItem}>Fashion Photography</span>
                <span className={styles.specialtyItem}>Culinary Styling</span>
                <span className={styles.specialtyItem}>Portrait Photography</span>
                <span className={styles.specialtyItem}>Music Video Production</span>
                <span className={styles.specialtyItem}>Commercial Content</span>
                <span className={styles.specialtyItem}>TV Reportage & Documentaries</span>
                <span className={styles.specialtyItem}>Brand Identity & Digital Marketing</span>
                <span className={styles.specialtyItem}>Web Development</span>
              </div>
            </div>

            <div className={styles.cta}>
              <a 
                href="https://www.linkedin.com/in/kamal-sekkar/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.linkedinBtn}
              >
                <span>Connect on LinkedIn</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.stats} ref={statsRef}>
          {achievements.map((achievement, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statNumber}>
                <span data-count={achievement.number}>0</span>
                <span className={styles.suffix}>{achievement.suffix}</span>
              </div>
              <div className={styles.statLabel}>{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;