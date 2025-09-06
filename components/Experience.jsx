// components/Experience.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/experience.module.css';

const Experience = () => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    const header = headerRef.current;
    const timeline = timelineRef.current;

    if (!section || !header || !timeline) return;

    // Header animation
    gsap.fromTo(header,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Timeline items animation
    const timelineItems = timeline.querySelectorAll(`.${styles.experienceCard}`);
    timelineItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, [mounted]);

  const experiences = [
    {
      id: 1,
      title: "Founder & Creative Director",
      company: "Wardd Studios",
      period: "August 2024 - Present",
      type: "current",
      location: "Morocco",
      description: "Leading a full-service creative agency with 100+ successfully launched projects across diverse sectors.",
      achievements: [
        "Founded multi-disciplinary creative agency",
        "100+ projects across real estate, education, fashion",
        "Built team covering video production to web development", 
        "Established brand identity and digital marketing services"
      ],
      technologies: ["Leadership", "Project Management", "Video Production", "Business Development"],
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-500"
    },
    {
      id: 2,
      title: "Camera Operator & Visual Content Producer",
      company: "SNRT (National Broadcasting)",
      period: "March 2023 - August 2024",
      type: "broadcast",
      location: "Morocco",
      description: "Broadcast television experience producing content for national audiences across Morocco.",
      achievements: [
        "Produced and directed TV series 'BYED OU KHEL'",
        "Specialized in television reporting and documentaries",
        "Mastered multi-camera setups and live production",
        "Created content reaching diverse national audiences"
      ],
      technologies: ["Broadcast TV", "Multi-camera Setup", "Live Production", "Documentary"],
      gradient: "from-violet-500 to-purple-600",
      iconBg: "bg-violet-500"
    },
    {
      id: 3,
      title: "Photographer & Cinematographer", 
      company: "Studio Sahara Prod",
      period: "2020 - 2024",
      type: "creative",
      location: "Morocco",
      description: "Specialized in music video production and event coverage for local and national artists.",
      achievements: [
        "Produced music videos for local and national artists",
        "Mastered lighting for various environments",
        "Created viral social media content and campaigns",
        "Built strong reputation in music industry"
      ],
      technologies: ["Music Videos", "Event Coverage", "Social Media", "Lighting Design"],
      gradient: "from-blue-500 to-cyan-600",
      iconBg: "bg-blue-500"
    }
  ];

  const timelineDots = experiences.map((_, index) => index);

  return (
    <section id="experience" className={styles.experience} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.subtitle}>Professional Journey</span>
          <h2 className={styles.title}>
            Career <span className={styles.highlight}>Timeline</span>
          </h2>
          <p className={styles.description}>
            A decade of visual storytelling across broadcast television, 
            music industry, and creative entrepreneurship.
          </p>
        </div>

        <div className={styles.timeline} ref={timelineRef}>
          <div className={styles.timelineTrack}>
            {timelineDots.map((dot, index) => (
              <div key={index} className={styles.timelineDot}></div>
            ))}
          </div>

          <div className={styles.experienceList}>
            {experiences.map((exp, index) => (
              <div key={exp.id} className={styles.experienceCard}>
                <div className={styles.cardGlow}></div>
                
                <div className={styles.cardHeader}>
                  <div className={`${styles.companyIcon} ${exp.iconBg}`}>
                    <span className={styles.iconText}>
                      {exp.company.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  
                  <div className={styles.headerContent}>
                    <div className={styles.titleRow}>
                      <h3 className={styles.jobTitle}>{exp.title}</h3>
                      <span className={`${styles.statusBadge} ${styles[exp.type]}`}>
                        {exp.type === 'current' ? 'Current' : 
                         exp.type === 'broadcast' ? 'Broadcast' : 'Creative'}
                      </span>
                    </div>
                    <h4 className={styles.company}>{exp.company}</h4>
                    <div className={styles.metadata}>
                      <span className={styles.period}>{exp.period}</span>
                      <span className={styles.location}>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className={styles.jobDescription}>{exp.description}</p>

                <div className={styles.achievementsList}>
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className={styles.achievementItem}>
                      <div className={styles.achievementBullet}></div>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.techStack}>
                  <span className={styles.techLabel}>Focus Areas:</span>
                  <div className={styles.techTags}>
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.careerStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>3</span>
            <span className={styles.statLabel}>Major Roles</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100+</span>
            <span className={styles.statLabel}>Projects Delivered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;