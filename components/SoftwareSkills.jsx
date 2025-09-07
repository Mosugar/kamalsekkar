// components/SoftwareSkills.jsx - Enhanced Creative Version
import { useEffect, useRef, useState, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/software-skills.module.css';

// Enhanced Tilt component with creative interactions
const TiltComponent = memo(({ children, className = "", index = 0 }) => {
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(300px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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

    // Enhanced tilt effect
    const tiltX = (0.5 - y) * 15;
    const tiltY = (x - 0.5) * 15;

    const glareX = x * 100;
    const glareY = y * 100;

    setTiltStyle({
      transform: `perspective(300px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.1)`,
      transition: 'transform 0.1s ease-out',
    });

    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, rgba(255,215,0,0.2) 30%, rgba(255,255,255,0) 70%)`,
      opacity: 0.6,
    });
  };

  const handleMouseEnter = () => {
    // Create a magical entrance effect
    gsap.to(tiltRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(300px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    });

    setGlareStyle(prev => ({
      ...prev,
      opacity: 0,
    }));

    // Return to normal state
    gsap.to(tiltRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <div
      className={`${styles.tiltContainer} ${className}`}
      ref={tiltRef}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className={styles.glare} style={glareStyle} />
    </div>
  );
});

TiltComponent.displayName = "TiltComponent";

// Enhanced skill bubble with creative effects
const SkillBubble = memo(({ skill, index }) => {
  const bubbleRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    
    // Create a burst effect on click
    gsap.timeline()
      .to(bubbleRef.current, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(bubbleRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: "back.out(2)"
      })
      .to(bubbleRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.8)"
      });
  };

  return (
    <TiltComponent index={index}>
      <div 
        className={styles.skillBubble} 
        ref={bubbleRef}
        onClick={handleClick}
        style={{
          animationDelay: `${index * 0.1}s`,
          filter: isActive ? 'hue-rotate(180deg) saturate(1.5)' : 'none'
        }}
      >
        <div className={styles.bubbleContent}>
          <div className={styles.iconWrapper}>
            <img
              src={skill.icon}
              alt={skill.name}
              className={styles.skillIcon}
              loading="lazy"
            />
          </div>
          <div className={styles.skillTooltip}>{skill.name}</div>
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse tracking for background effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
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

  // Enhanced GSAP animations
  useEffect(() => {
    if (!isInView || !mounted) return;

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const skillEl = skillRef.current;

    if (skillEl) {
      // Create magical entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: skillEl,
          start: "20% bottom",
          end: "bottom center",
        },
      });

      // Header animations
      tl.fromTo(skillEl.querySelector(`.${styles.sectionHeading}`), {
        opacity: 0,
        y: 50,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      });

      // Container magical appearance
      tl.fromTo(skillEl.querySelector(`.${styles.skillsContent}`), {
        opacity: 0,
        scale: 0.8,
        rotateY: -15
      }, {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Bubbles magical entrance with burst effect
      const bubbles = skillEl.querySelectorAll(`.${styles.skillBubble}`);
      
      tl.fromTo(bubbles, {
        opacity: 0,
        scale: 0,
        y: 100,
        rotation: 180
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(2)",
        stagger: {
          each: 0.1,
          from: "center",
          grid: "auto"
        }
      }, "-=0.8");

      // Add floating animation to bubbles
      bubbles.forEach((bubble, index) => {
        gsap.to(bubble, {
          y: Math.sin(index) * 10,
          duration: 3 + (index * 0.2),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.1
        });
      });
    }
  }, [isInView, mounted]);

  // Creative software tools with enhanced descriptions
  const softwareSkills = [
    { 
      icon: "https://res.cloudinary.com/dylpck2et/image/upload/v1757195296/adobe-premiere-svgrepo-com_j1bbrn.svg", 
      name: "Adobe Premiere Pro",
      category: "Video Editing"
    },
    { 
      icon: "https://res.cloudinary.com/dylpck2et/image/upload/v1757195299/DaVinci_Resolve_17_logo_yt5pad.svg", 
      name: "DaVinci Resolve",
      category: "Color Grading"
    },
    { 
      icon: "https://res.cloudinary.com/dylpck2et/image/upload/v1757195297/Adobe_After_Effects_CC_icon_b63iv0.svg", 
      name: "After Effects",
      category: "Motion Graphics"
    },
    { 
      icon: "https://res.cloudinary.com/dylpck2et/image/upload/v1757195296/Adobe_Photoshop_CC_icon_eyvhdv.svg", 
      name: "Photoshop",
      category: "Photo Editing"
    },
    { 
      icon: "https://res.cloudinary.com/dylpck2et/image/upload/v1757195297/Adobe_Photoshop_Lightroom_CC_logo_mlwe8u.svg", 
      name: "Lightroom",
      category: "Photo Management"
    },
    { 
      icon: "https://res.cloudinary.com/dylpck2et/image/upload/v1757195297/icons8-final-cut-pro-x_fsawxi.svg", 
      name: "Final Cut Pro",
      category: "Professional Editing"
    },
    { 
      icon: "https://res.cloudinary.com/dylpck2et/image/upload/v1757195297/Adobe_Illustrator_CC_icon_zepu0f.svg", 
      name: "Illustrator",
      category: "Vector Graphics"
    }
  ];

  return (
    <section 
      id="software-skills" 
      className={styles.skillsSection}
    >
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
          <div className={styles.skillsHeader}></div>
          <div className={styles.bubblesContainer}>
            {softwareSkills.map((skill, index) => (
              <SkillBubble
                key={index}
                skill={skill}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className={styles.skillsStats}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>7</span>
            <span className={styles.statLabel}>Professional Tools</span>
            <div className={styles.statDecoration}></div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Years Experience</span>
            <div className={styles.statDecoration}></div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>Pro</span>
            <span className={styles.statLabel}>Level Expertise</span>
            <div className={styles.statDecoration}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftwareSkills;