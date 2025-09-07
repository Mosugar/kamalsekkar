// components/Equipment.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/equipment.module.css';

gsap.registerPlugin(ScrollTrigger);

const Equipment = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;

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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const equipmentData = [
    {
      id: 'camera',
      category: 'Camera',
      icon: '📷',
      title: 'Sony A7III + Lens GM 24/70',
      description: 'Professional full-frame mirrorless camera with versatile 24-70mm f/2.8 lens for superior image quality and performance.',
      features: [
        'Full-Frame 24.2MP Exmor R CMOS Sensor',
        '693-point phase detection AF system',
        '4K HDR video recording',
        'Professional-grade build quality'
      ],
      specs: {
        'Sensor': '24.2MP Full-Frame',
        'Lens': 'GM 24-70mm f/2.8',
        'Video': '4K HDR',
        'Autofocus': '693-point AF'
      },
      color: 'camera'
    },
    {
      id: 'computer',
      category: 'Computing',
      icon: '💻',
      title: 'MacBook Pro M1',
      description: 'High-performance laptop with Apple M1 chip for seamless video editing, photo processing, and creative workflows.',
      features: [
        'Apple M1 chip with 8-core CPU',
        'Unified memory architecture',
        'All-day battery life',
        'Retina display with P3 color gamut'
      ],
      specs: {
        'Processor': 'Apple M1 8-core',
        'Memory': 'Unified RAM',
        'Display': 'Retina P3',
        'Performance': 'Pro-level editing'
      },
      color: 'computer'
    },
    {
      id: 'lighting',
      category: 'Lighting',
      icon: '💡',
      title: 'Professional Studio Lighting Kit',
      description: 'Complete lighting setup including Zhiyun PL109 softbox, Electra classic lights, and LED panels for versatile illumination.',
      features: [
        'Zhiyun model PL109 softbox',
        '2x Electra classic plus 300W',
        '3x LED continuous lights',
        'Life of photo box modifier'
      ],
      specs: {
        'Softbox': 'Zhiyun PL109',
        'Main Lights': '2x Electra 300W',
        'LED Panels': '3x Continuous',
        'Modifiers': 'Multiple options'
      },
      color: 'lighting'
    },
    {
      id: 'audio',
      category: 'Audio',
      icon: '🎤',
      title: 'K&F Wireless Microphone System',
      description: 'Professional UHF dual-channel wireless microphone system for crystal-clear audio recording in any environment.',
      features: [
        'UHF dual-channel system',
        'CM-9/CM-10 model series',
        'Interference-free transmission',
        'Professional broadcast quality'
      ],
      specs: {
        'Type': 'UHF Wireless',
        'Channels': 'Dual-channel',
        'Model': 'CM-9/CM-10',
        'Range': 'Professional grade'
      },
      color: 'audio'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % equipmentData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + equipmentData.length) % equipmentData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="equipment" className={styles.equipment} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.subtitle}>Professional Tools</span>
          <h2 className={styles.title}>
            Equipment & <span className={styles.highlight}>Technical Setup</span>
          </h2>
          
        </div>

        <div className={styles.carousel} ref={carouselRef}>
          <div className={styles.carouselContainer}>
            <div 
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {equipmentData.map((item, index) => (
                <div key={item.id} className={`${styles.equipmentSlide} ${styles[item.color]}`}>
                  <div className={styles.slideContent}>
                    <div className={styles.slideHeader}>
                      <div className={styles.iconWrapper}>
                        <span className={styles.categoryIcon}>{item.icon}</span>
                      </div>
                      <div className={styles.categoryInfo}>
                        <span className={styles.categoryTag}>{item.category}</span>
                        <h3 className={styles.equipmentTitle}>{item.title}</h3>
                      </div>
                    </div>

                    <p className={styles.equipmentDescription}>{item.description}</p>

                    <div className={styles.slideGrid}>
                      <div className={styles.features}>
                        <h4 className={styles.featuresTitle}>Key Features</h4>
                        <ul className={styles.featuresList}>
                          {item.features.map((feature, idx) => (
                            <li key={idx} className={styles.featureItem}>
                              <span className={styles.featureBullet}>✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.specifications}>
                        <h4 className={styles.specsTitle}>Specifications</h4>
                        <div className={styles.specsGrid}>
                          {Object.entries(item.specs).map(([key, value]) => (
                            <div key={key} className={styles.specItem}>
                              <span className={styles.specLabel}>{key}</span>
                              <span className={styles.specValue}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.slideGlow}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button className={styles.navButton} onClick={prevSlide} aria-label="Previous equipment">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <button className={`${styles.navButton} ${styles.navNext}`} onClick={nextSlide} aria-label="Next equipment">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className={styles.pagination}>
            {equipmentData.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to equipment ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.equipmentStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>4K</span>
            <span className={styles.statLabel}>Video Quality</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>24.2MP</span>
            <span className={styles.statLabel}>Resolution</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>Pro</span>
            <span className={styles.statLabel}>Grade Equipment</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>Studio</span>
            <span className={styles.statLabel}>Setup Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipment;