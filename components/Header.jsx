// components/Header.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const logoRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Animate header on load
    const tl = gsap.timeline({ delay: 2.8 });
    tl.fromTo(logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(navRef.current?.children || [],
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'software-skills', 'portfolio', 'equipment', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.querySelector(`#${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home', shortName: 'Home' },
    { name: 'About', href: '#about', shortName: 'About' },
    { name: 'Experience', href: '#experience', shortName: 'Experience' },
    { name: 'Software', href: '#software-skills', shortName: 'Tools' },
    { name: 'Portfolio', href: '#portfolio', shortName: 'Work' },
    { name: 'Equipment', href: '#equipment', shortName: 'Gear' },
    { name: 'Contact', href: '#contact', shortName: 'Contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.to(`.${styles.mobileNavLink}`, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Creative Logo */}
          <div className={styles.logo} ref={logoRef}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}>
                <div className={styles.aperture}>
                  <div className={styles.apertureBlade}></div>
                  <div className={styles.apertureBlade}></div>
                  <div className={styles.apertureBlade}></div>
                  <div className={styles.apertureBlade}></div>
                  <div className={styles.apertureBlade}></div>
                  <div className={styles.apertureBlade}></div>
                </div>
                <div className={styles.lens}></div>
              </div>
              <div className={styles.logoText}>
                <span className={styles.firstName}>Kamal</span>
                <span className={styles.lastName}>Sekkar</span>
                <span className={styles.tagline}>Visual Storyteller</span>
              </div>
            </div>
          </div>

          {/* Creative Desktop Navigation */}
          <nav className={styles.nav} ref={navRef}>
            <div className={styles.navBackground}></div>
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`${styles.navLink} ${activeSection === item.href.slice(1) ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                <span className={styles.navText}>{item.name}</span>
                <div className={styles.navIndicator}></div>
                <div className={styles.navRipple}></div>
              </a>
            ))}
          </nav>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <a 
              href="https://www.linkedin.com/in/kamal-sekkar/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkedinBtn}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            
            <button 
              className={styles.hireMeBtn}
              onClick={() => scrollToSection('#contact')}
            >
              <span>Hire Me</span>
              <div className={styles.btnShine}></div>
            </button>
          </div>

          {/* Creative Mobile Menu Button */}
          <button
            className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={styles.menuIcon}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Creative Mobile Navigation */}
        <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileNavContent}>
            <div className={styles.mobileNavHeader}>
              <h3>Navigation</h3>
              <div className={styles.navProgress}></div>
            </div>
            
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`${styles.mobileNavLink} ${activeSection === item.href.slice(1) ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                <span className={styles.linkNumber}>0{index + 1}</span>
                <span className={styles.mobileNavText}>{item.name}</span>
                <div className={styles.linkArrow}>→</div>
              </a>
            ))}
            
            <div className={styles.mobileNavFooter}>
              <a 
                href="https://www.linkedin.com/in/kamal-sekkar/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.mobileLinkedinBtn}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Professional Profile
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Header accent line */}
      <div className={styles.headerAccent}></div>
    </header>
  );
};

export default Header;