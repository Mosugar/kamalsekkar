// components/Services.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/services.module.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const servicesGridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const servicesGrid = servicesGridRef.current;

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

    // Services grid animation
    gsap.fromTo(servicesGrid.children,
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: servicesGrid,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const services = [
    {
      icon: "📸",
      title: "Fashion Photography",
      description: "High-end fashion shoots for brands, models, and designers. Creating stunning visual narratives that showcase style and elegance.",
      features: ["Studio & Location Shoots", "Editorial Fashion", "Lookbook Creation", "Brand Campaigns"]
    },
    {
      icon: "🍽️",
      title: "Food Photography",
      description: "Mouth-watering food photography for restaurants, brands, and culinary professionals. Making every dish look irresistible.",
      features: ["Restaurant Menus", "Recipe Photography", "Brand Content", "Social Media Assets"]
    },
    {
      icon: "👤",
      title: "Portrait Photography",
      description: "Professional portraits that capture personality and character. Perfect for corporate, personal, and creative needs.",
      features: ["Corporate Headshots", "Personal Portraits", "Creative Sessions", "Family Photography"]
    },
    {
      icon: "🎬",
      title: "Music Videos",
      description: "Creative music video production that brings your sound to life. From concept to final cut, creating visual stories for artists.",
      features: ["Concept Development", "Full Production", "Post-Production", "Creative Direction"]
    },
    {
      icon: "📺",
      title: "Commercials",
      description: "Professional commercial video production for brands and businesses. Creating compelling content that drives engagement.",
      features: ["Brand Videos", "Product Showcases", "Social Media Content", "Marketing Campaigns"]
    },
    {
      icon: "📰",
      title: "TV Reportage",
      description: "Documentary-style reporting and journalism. Capturing real stories with authenticity and professional broadcast quality.",
      features: ["News Coverage", "Documentary Work", "Event Reporting", "Interview Production"]
    }
  ];

  return (
    <section id="services" className={styles.services} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.subtitle}>What I Do</span>
          <h2 className={styles.title}>
            Professional <span className={styles.highlight}>Services</span>
          </h2>
          <p className={styles.description}>
            From intimate portraits to large-scale commercial productions, I offer comprehensive 
            visual services tailored to your unique needs and vision.
          </p>
        </div>

        <div className={styles.servicesGrid} ref={servicesGridRef}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <span>{service.icon}</span>
              </div>
              
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={styles.serviceFeature}>
                      <span className={styles.checkmark}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.serviceOverlay}>
                <div className={styles.overlayContent}>
                  <span className={styles.overlayIcon}>{service.icon}</span>
                  <h4>Let's Discuss Your Project</h4>
                  <p>Ready to bring your vision to life?</p>
                  <button className={styles.contactBtn}>
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;