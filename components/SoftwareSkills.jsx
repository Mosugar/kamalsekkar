// components/SoftwareSkills.jsx
import { useEffect, useRef, useState, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/software-skills.module.css';

// Tilt component for interactive bubbles
const TiltComponent = memo(({ children, className = "" }) => {
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(120px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.2s ease-out',
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
  });
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!tiltRef.current) return;

    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - y) * 8;
    const tiltY = (x - 0.5) * 8;

    const glareX = x * 100;
    const glareY = y * 100;

    setTiltStyle({
      transform: `perspective(120px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`,
      transition: 'transform 0.2s ease-out',
    });

    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`,
      opacity: 0.4,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(120px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out',
    });

    setGlareStyle(prev => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <div
      className={`${styles.tiltContainer} ${className}`}
      ref={tiltRef}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className={styles.glare} style={glareStyle} />
    </div>
  );
});

TiltComponent.displayName = "TiltComponent";

// Individual skill bubble component
const SkillBubble = memo(({ skill, category }) => {
  return (
    <TiltComponent>
      <div className={`${styles.skillBubble} ${styles[category]}`}>
        <div className={styles.bubbleContent}>
          <div className={styles.iconWrapper}>
            <img
              src={skill.icon}
              alt={skill.name}
              className={styles.skillIcon}
              loading="lazy"
            />
          </div>
          <span className={styles.skillName}>{skill.name}</span>
          <div className={styles.skillCategory}>{category}</div>
        </div>
      </div>
    </TiltComponent>
  );
});

SkillBubble.displayName = "SkillBubble";

const SoftwareSkills = () => {
  const [mounted, setMounted] = useState(false);
  const skillRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set up Intersection Observer to trigger animations only when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      if (skillRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Set up GSAP animations when element is in view
  useEffect(() => {
    if (!isInView || !mounted) return;

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const skillEl = skillRef.current;

    if (skillEl) {
      // Use timeline for better performance - exact same as your Skills component
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: skillEl,
          start: "30% bottom",
          end: "bottom center",
        },
      });

      // Animate all bubbles at once with stagger
      tl.to(`.${styles.skillBubble}`, {
        y: 0,
        opacity: 1,
        stagger: {
          each: 0.05,
          from: "random",
        },
        duration: 0.5,
      });
    }
  }, [isInView, mounted]);

  // Photography/Cinematography software skills
  const softwareSkills = [
    { icon: "/icons/premiere.svg", name: "Adobe Premiere Pro" },
    { icon: "/icons/davinci.svg", name: "DaVinci Resolve" },
    { icon: "/icons/after-effects.svg", name: "After Effects" },
    { icon: "/icons/photoshop.svg", name: "Photoshop" },
    { icon: "/icons/lightroom.svg", name: "Lightroom" },
    { icon: "/icons/finalcut.svg", name: "Final Cut Pro" },
    { icon: "/icons/illustrator.svg", name: "Illustrator" },
    { icon: "/icons/figma.svg", name: "Figma" },
    { icon: "/icons/capture-one.svg", name: "Capture One" },
    { icon: "/icons/cinema4d.svg", name: "Cinema 4D" },
    { icon: "/icons/blender.svg", name: "Blender" },
    { icon: "/icons/audition.svg", name: "Adobe Audition" },
    { icon: "/icons/bridge.svg", name: "Adobe Bridge" },
    { icon: "/icons/media-encoder.svg", name: "Media Encoder" },
    { icon: "/icons/frame-io.svg", name: "Frame.io" },
    { icon: "/icons/youtube.svg", name: "YouTube Studio" },
    { icon: "/icons/vimeo.svg", name: "Vimeo" },
    { icon: "/icons/obs.svg", name: "OBS Studio" }
  ];

  return (
    <section id="software-skills" className={styles.skillsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <span className={styles.subtitle}>Creative Tools</span>
          <h2 className={styles.title}>
            Software & <span className={styles.highlight}>Applications</span>
          </h2>
          <p className={styles.description}>
            Professional-grade software powering every aspect of visual storytelling and content creation.
          </p>
        </div>

        <div className={styles.skillsContent} ref={skillRef}>
          <div className={styles.bubblesContainer}>
            {softwareSkills.map((skill, index) => (
              <SkillBubble
                key={index}
                skill={skill}
              />
            ))}
          </div>
        </div>

        <div className={styles.skillsBlob}>
          <div className={styles.skillsBlob1}></div>
          <div className={styles.skillsBlob2}></div>
        </div>
      </div>
    </section>
  );
};


export default SoftwareSkills;