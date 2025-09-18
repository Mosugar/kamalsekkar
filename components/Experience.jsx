// components/Experience.jsx - Refined with cleaner animations
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/experience.module.css';

const Experience = () => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

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
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    // Simple header animation
    gsap.fromTo(header,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Clean card animations - one at a time
    const experienceCards = cards.querySelectorAll(`.${styles.experienceCard}`);
    experienceCards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
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
      description: "Leading a full-service creative agency specializing in visual storytelling across multiple industries. Building comprehensive brand experiences through photography, videography, and digital content creation.",
      achievements: [
        "Founded multi-disciplinary creative agency from ground up",
        "Successfully delivered 100+ projects across diverse sectors",
        "Established comprehensive service offering from concept to delivery",
        "Built strategic partnerships with key industry players"
      ],
      technologies: ["Leadership", "Creative Direction", "Project Management", "Business Development"],
      logo: "https://res.cloudinary.com/dylpck2et/image/upload/v1749577159/Logo_wardd_studios_inwre5.png",
      iconText: "WS"
    },
    {
      id: 2,
      title: "Camera Operator & Visual Content Producer",
      company: "SNRT (National Broadcasting)",
      period: "March 2023 - August 2024",
      type: "broadcast",
      location: "Morocco",
      description: "Professional broadcast experience creating content for national television audiences. Specialized in multi-camera operations, live production workflows, and documentary storytelling.",
      achievements: [
        "Lead camera operator for national TV series 'BYED OU KHEL'",
        "Mastered broadcast-standard multi-camera setups and workflows",
        "Developed expertise in live television production environments",
        "Created compelling documentary content for diverse audiences"
      ],
      technologies: ["Broadcast Production", "Multi-camera Systems", "Live TV", "Documentary"],
      logo: "https://res.cloudinary.com/dylpck2et/image/upload/v1758200252/snrt-maroc-seeklogo_vebshi.png",
      iconText: "SN"
    },
    {
      id: 3,
      title: "Photographer & Cinematographer", 
      company: "Studio Sahara Prod",
      period: "2020 - 2024",
      type: "creative",
      location: "Morocco",
      description: "Specialized in music video production and creative content for the entertainment industry. Developed signature style combining technical excellence with artistic vision.",
      achievements: [
        "Produced high-impact music videos for emerging and established artists",
        "Mastered advanced lighting techniques for various shooting environments",
        "Created viral social media campaigns with significant engagement",
        "Built strong reputation within Morocco's music and entertainment industry"
      ],
      technologies: ["Music Videos", "Event Photography", "Social Media Content", "Creative Lighting"],
      iconText: "SP"
    }
  ];

  return (
    <section id="experience" className={styles.experience} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.subtitle}>Professional Journey</span>
          <h2 className={styles.title}>
            Career <span className={styles.highlight}>Experience</span>
          </h2>
          <p className={styles.description}>
            A decade of visual storytelling across broadcast television, 
            creative industries, and entrepreneurial ventures.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineTrack}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineDot}></div>
          </div>

          <div className={styles.experienceList} ref={cardsRef}>
            {experiences.map((exp) => (
              <div key={exp.id} className={styles.experienceCard}>
                <div className={styles.cardHeader}>
                  <div className={`${styles.companyIcon}`}>
                    {exp.logo ? (
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        className={styles.companyLogo}
                      />
                    ) : (
                      <span className={styles.iconText}>{exp.iconText}</span>
                    )}
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
                  </div>
                </div>

                <div className={styles.metadata}>
                  <span className={styles.period}>{exp.period}</span>
                  <span className={styles.location}>{exp.location}</span>
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
                  <span className={styles.techLabel}>Key Areas:</span>
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
            <span className={styles.statLabel}>Major Positions</span>
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