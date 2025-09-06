// components/Experience.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timeline = timelineRef.current;

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
    const timelineItems = timeline.querySelectorAll(`.${styles.experienceItem}`);
    timelineItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const experiences = [
    {
      id: 1,
      title: "Founder & Creative Director",
      company: "Wardd Studios",
      period: "August 2024 - Present",
      type: "current",
      location: "Morocco",
      description: "Leading a full-service creative agency with 100+ successfully launched projects across diverse sectors.",
      highlights: [
        "Founded creative agency with multi-disciplinary team covering video production, web development, branding and digital marketing",
        "Managing diverse client portfolio: real estate, education, fashion, e-commerce",
        "Personally handle filming, production and editing while directing production and post-production teams",
        "Services include: Video Production | Web Development | Brand Identity | Print Design | Digital Marketing"
      ],
      skills: ["Leadership", "Project Management", "Video Production", "Team Direction", "Business Development"],
      icon: "🚀"
    },
    {
      id: 2,
      title: "Camera Operator & Visual Content Producer",
      company: "SNRT (Société Nationale de Radiodiffusion et de Télévision)",
      period: "March 2023 - August 2024",
      type: "broadcast",
      location: "Morocco",
      description: "One year of broadcast television experience producing content for national audiences.",
      highlights: [
        "Produced and directed the TV series 'BYED OU KHEL'",
        "Filmed and edited videos, interviews and television reports",
        "Specialized in television reporting and documentary coverage", 
        "Mastered multi-camera setups and production coordination",
        "Created content for national broadcast reaching diverse audiences"
      ],
      skills: ["Broadcast Television", "Multi-camera Setup", "Live Production", "Documentary", "TV Reporting"],
      icon: "📺"
    },
    {
      id: 3,
      title: "Photographer & Cinematographer", 
      company: "Studio Sahara Prod",
      period: "2020 - 2024",
      type: "creative",
      location: "Morocco",
      description: "Specialized in music video production and event coverage for local and national artists.",
      highlights: [
        "Produced and directed music videos for local and national artists",
        "Mastered lighting and multi-camera configurations for various environments",
        "Created social media content: stories, reels for digital platforms",
        "Covered live events: concerts, festivals, corporate events",
        "Built reputation in music industry and event documentation"
      ],
      skills: ["Music Video Production", "Event Coverage", "Social Media Content", "Lighting Design", "Live Events"],
      icon: "🎬"
    }
  ];

  const technicalSkills = [
    {
      category: "Software",
      skills: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Photoshop"]
    },
    {
      category: "Equipment", 
      skills: ["Professional Cameras", "Multi-camera Setups", "Professional Lighting", "Drone Operation"]
    },
    {
      category: "Production",
      skills: ["Pre-production Planning", "Color Grading", "Visual Storytelling", "Project Management"]
    }
  ];

  return (
    <section id="experience" className={styles.experience} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.subtitle}>Professional Journey</span>
          <h2 className={styles.title}>
            Experience & <span className={styles.highlight}>Career Path</span>
          </h2>
          <p className={styles.description}>
            From broadcast television to creative entrepreneurship, my journey spans over a decade 
            of visual storytelling across multiple platforms and industries.
          </p>
        </div>

        <div className={styles.timeline} ref={timelineRef}>
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`${styles.experienceItem} ${styles[exp.type]}`}>
              <div className={styles.timelineIcon}>
                <span className={styles.icon}>{exp.icon}</span>
              </div>
              
              <div className={styles.experienceCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleSection}>
                    <h3 className={styles.jobTitle}>{exp.title}</h3>
                    <h4 className={styles.company}>{exp.company}</h4>
                    <div className={styles.metadata}>
                      <span className={styles.period}>{exp.period}</span>
                      <span className={styles.location}>{exp.location}</span>
                    </div>
                  </div>
                  <div className={styles.typeTag}>
                    <span className={`${styles.tag} ${styles[exp.type]}`}>
                      {exp.type === 'current' ? 'Current' : exp.type === 'broadcast' ? 'Broadcast TV' : 'Creative'}
                    </span>
                  </div>
                </div>

                <p className={styles.jobDescription}>{exp.description}</p>

                <ul className={styles.highlights}>
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className={styles.highlight}>
                      <span className={styles.bullet}>→</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className={styles.skillTags}>
                  {exp.skills.map((skill, idx) => (
                    <span key={idx} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.technicalSkills}>
          <h3 className={styles.skillsTitle}>Technical Expertise</h3>
          <div className={styles.skillsGrid}>
            {technicalSkills.map((category, index) => (
              <div key={index} className={styles.skillCategory}>
                <h4 className={styles.categoryTitle}>{category.category}</h4>
                <div className={styles.categorySkills}>
                  {category.skills.map((skill, idx) => (
                    <span key={idx} className={styles.technicalSkill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.languages}>
          <h3 className={styles.languagesTitle}>Languages</h3>
          <div className={styles.languageList}>
            <div className={styles.language}>
              <span className={styles.languageName}>Arabic</span>
              <span className={styles.proficiency}>Native</span>
            </div>
            <div className={styles.language}>
              <span className={styles.languageName}>French</span>
              <span className={styles.proficiency}>Fluent</span>
            </div>
            <div className={styles.language}>
              <span className={styles.languageName}>English</span>
              <span className={styles.proficiency}>Fluent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;