// components/Contact.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const form = formRef.current;
    const contactInfo = contactInfoRef.current;

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

    // Form animation
    gsap.fromTo(form,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Contact info animation
    gsap.fromTo(contactInfo,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactInfo,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: '',
        timeline: ''
      });
      
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'sekkarkamal@gmail.com',
      href: 'mailto:sekkarkamal@gmail.com',
      description: 'Send me an email for detailed project discussions'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/kamal-sekkar/',
      description: 'Professional networking and business inquiries'
    },
    {
      icon: '🌐',
      label: 'Website',
      value: 'kamalsekkar.com',
      href: 'https://kamalsekkar.com',
      description: 'View my complete portfolio and latest work'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Morocco',
      href: null,
      description: 'Available for local and international projects'
    }
  ];

  const projectTypes = [
    'Fashion Photography',
    'Portrait Session',
    'Commercial Video',
    'Music Video',
    'Corporate Event',
    'Brand Campaign',
    'Social Media Content',
    'Documentary',
    'Other'
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
    'Let\'s discuss'
  ];

  const timelines = [
    'ASAP',
    'Within 1 week',
    'Within 1 month',
    '1-3 months',
    '3+ months',
    'Flexible'
  ];

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.subtitle}>Get In Touch</span>
          <h2 className={styles.title}>
            Let's Create Something <span className={styles.highlight}>Amazing Together</span>
          </h2>
          <p className={styles.description}>
            Ready to bring your vision to life? Whether it's a fashion shoot, commercial video, 
            or creative campaign, I'm here to deliver exceptional results that exceed your expectations.
          </p>
        </div>

        <div className={styles.contactContent}>
          <div className={styles.formSection} ref={formRef}>
            <div className={styles.formContainer}>
              <h3 className={styles.formTitle}>Start Your Project</h3>
              <p className={styles.formDescription}>
                Tell me about your project and I'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="Your name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="projectType" className={styles.label}>Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="budget" className={styles.label}>Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="timeline" className={styles.label}>Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">When do you need this completed?</option>
                    {timelines.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className={styles.textarea}
                    placeholder="Tell me about your project, vision, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''}`}
                >
                  <span className={styles.btnText}>
                    {isSubmitting ? 'Sending...' : 'Send Project Details'}
                  </span>
                  <div className={styles.btnGlow}></div>
                </button>

                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <span className={styles.successIcon}>✓</span>
                    Message sent successfully! I'll get back to you within 24 hours.
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className={styles.contactInfo} ref={contactInfoRef}>
            <div className={styles.infoContainer}>
              <h3 className={styles.infoTitle}>Get In Touch</h3>
              <p className={styles.infoDescription}>
                Prefer a direct approach? Reach out using any of the methods below.
              </p>

              <div className={styles.contactMethods}>
                {contactMethods.map((method, index) => (
                  <div key={index} className={styles.contactMethod}>
                    <div className={styles.methodIcon}>
                      <span>{method.icon}</span>
                    </div>
                    <div className={styles.methodInfo}>
                      <h4 className={styles.methodLabel}>{method.label}</h4>
                      {method.href ? (
                        <a 
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : '_self'}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                          className={styles.methodLink}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span className={styles.methodValue}>{method.value}</span>
                      )}
                      <p className={styles.methodDescription}>{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.availability}>
                <h4 className={styles.availabilityTitle}>Availability</h4>
                <p className={styles.availabilityText}>
                  Currently accepting new projects for Q1 2025. 
                  Book early to secure your preferred dates.
                </p>
                <div className={styles.responseTime}>
                  <span className={styles.responseIcon}>⚡</span>
                  <span>Typical response time: 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;