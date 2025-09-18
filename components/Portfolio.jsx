// components/Portfolio.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/portfolio.module.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

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

    // Grid items animation
    const gridItems = grid.querySelectorAll(`.${styles.portfolioItem}`);
    gridItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [activeFilter]);

  const portfolioData = {
    photography: [
      // Food Photography - New Images
      {
        id: 'food-1',
        type: 'photography',
        category: 'Food Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1758199446/DSC09558_hi2ev0.jpg',
        title: 'Artisan Food Presentation',
        description: 'Professional food photography showcasing artisan culinary creations with premium styling.',
        tags: ['Food', 'Artisan', 'Professional']
      },
      {
        id: 'food-2',
        type: 'photography',
        category: 'Food Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1758199347/DSC09586_qqcn4j.jpg',
        title: 'Gourmet Cuisine',
        description: 'High-end food photography capturing the essence and appeal of gourmet dishes.',
        tags: ['Food', 'Gourmet', 'Fine Dining']
      },
      {
        id: 'food-3',
        type: 'photography',
        category: 'Food Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1758199326/DSC05348_ecc31s.jpg',
        title: 'Culinary Excellence',
        description: 'Premium food photography with artistic composition and professional lighting.',
        tags: ['Food', 'Culinary', 'Photography']
      },
      {
        id: 'food-4',
        type: 'photography',
        category: 'Food Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1758199310/DSC09544_cpc2a6.jpg',
        title: 'Restaurant Quality Shoots',
        description: 'Professional food photography for restaurant menus and marketing materials.',
        tags: ['Food', 'Restaurant', 'Menu']
      },
      {
        id: 'food-5',
        type: 'photography',
        category: 'Food Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1758199306/DSC09601_htervl.jpg',
        title: 'Food Styling Mastery',
        description: 'Expert food styling and photography for commercial and editorial use.',
        tags: ['Food', 'Styling', 'Commercial']
      },
      // Product Photography - Moved from Food Section
     
      // Product Photography
      {
        id: 'product-1',
        type: 'photography',
        category: 'Product Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757422913/DSC02510_qatmwt.jpg',
        title: 'Premium Product Display',
        description: 'Professional product photography with artistic presentation and commercial appeal.',
        tags: ['Product', 'Commercial', 'Display']
      },
      {
        id: 'product-2',
        type: 'photography',
        category: 'Product Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757422913/DSC02514_hglomw.jpg',
        title: 'Commercial Product Shots',
        description: 'High-end product photography for e-commerce and advertising campaigns.',
        tags: ['Product', 'E-commerce', 'Commercial']
      },
      {
        id: 'product-3',
        type: 'photography',
        category: 'Product Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757422913/DSC02535_pympiq.jpg',
        title: 'Brand Photography',
        description: 'Professional product photography for brand marketing and promotional materials.',
        tags: ['Product', 'Branding', 'Marketing']
      },
      {
        id: 'product-4',
        type: 'photography',
        category: 'Product Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757422913/cover_reel_vqnkq1.jpg',
        title: 'Editorial Product Shot',
        description: 'Premium product photography designed for editorial covers and campaigns.',
        tags: ['Product', 'Editorial', 'Premium']
      },
      {
        id: 'product-5',
        type: 'photography',
        category: 'Product Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757422912/F-_5_p0fdpr.jpg',
        title: 'Studio Product Photography',
        description: 'Professional studio product photography for e-commerce and advertising.',
        tags: ['Product', 'Studio', 'E-commerce']
      },
      // Fashion Photography
      {
        id: 'fashion-1',
        type: 'photography',
        category: 'Fashion Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027986/DSC01843_zz1nul.jpg',
        title: 'Fashion Editorial Shoot',
        description: 'Professional fashion photography showcasing contemporary styling and creative direction.',
        tags: ['Fashion', 'Editorial', 'Studio']
      },
      {
        id: 'fashion-2',
        type: 'photography',
        category: 'Fashion Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027983/DSC01513_ugzbp6.jpg',
        title: 'Contemporary Fashion Portrait',
        description: 'Modern fashion portrait with emphasis on lighting and composition.',
        tags: ['Fashion', 'Portrait', 'Professional']
      },
      {
        id: 'fashion-3',
        type: 'photography',
        category: 'Fashion Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027985/DSC01641_me7obc.jpg',
        title: 'Fashion Studio Session',
        description: 'High-end fashion photography with professional lighting setup.',
        tags: ['Fashion', 'Studio', 'Commercial']
      },
      {
        id: 'fashion-4',
        type: 'photography',
        category: 'Fashion Photography',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027987/DSC02932_copy_d7i638.jpg',
        title: 'Fashion Portrait Series',
        description: 'Part of a fashion portrait series showcasing versatile styling.',
        tags: ['Fashion', 'Series', 'Creative']
      },
      // Professional Portraits
      {
        id: 'portrait-1',
        type: 'photography',
        category: 'Professional Portraits',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027986/DSC07401_tbwijn.jpg',
        title: 'Corporate Portrait',
        description: 'Professional corporate portrait with clean studio lighting.',
        tags: ['Portrait', 'Corporate', 'Professional']
      },
      {
        id: 'portrait-2',
        type: 'photography',
        category: 'Professional Portraits',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027986/DSC07397_zonnxf.jpg',
        title: 'Executive Headshot',
        description: 'Professional executive headshot for corporate branding.',
        tags: ['Headshot', 'Executive', 'Branding']
      },
      {
        id: 'portrait-3',
        type: 'photography',
        category: 'Professional Portraits',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027987/DSC08232-Enhanced-NR_hhyz94.jpg',
        title: 'Creative Portrait',
        description: 'Creative portrait photography with dramatic lighting.',
        tags: ['Portrait', 'Creative', 'Dramatic']
      },
      {
        id: 'portrait-4',
        type: 'photography',
        category: 'Professional Portraits',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027988/DSC08123_1_sukwpp.jpg',
        title: 'Professional Headshot',
        description: 'Clean, professional headshot for business use.',
        tags: ['Headshot', 'Business', 'Clean']
      },
      {
        id: 'portrait-5',
        type: 'photography',
        category: 'Professional Portraits',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027987/DSC08316_toipcl.jpg',
        title: 'Studio Portrait',
        description: 'Professional studio portrait with controlled lighting.',
        tags: ['Studio', 'Portrait', 'Professional']
      },
      {
        id: 'portrait-6',
        type: 'photography',
        category: 'Professional Portraits',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027987/DSC08328_h8gnr7.jpg',
        title: 'Character Portrait',
        description: 'Expressive character portrait showcasing personality.',
        tags: ['Character', 'Expressive', 'Personal']
      },
      // Social Media Content
      {
        id: 'social-1',
        type: 'photography',
        category: 'Social Media Content',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027986/DSC01916_jil3tp.jpg',
        title: 'Social Media Visual',
        description: 'Engaging visual content optimized for social media platforms.',
        tags: ['Social Media', 'Lifestyle', 'Engaging']
      },
      {
        id: 'social-2',
        type: 'photography',
        category: 'Social Media Content',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027985/DSC01893-Enhanced-NR_raixhc.jpg',
        title: 'Content Creation',
        description: 'Creative content designed for social media engagement.',
        tags: ['Content', 'Creative', 'Social']
      },
      {
        id: 'social-3',
        type: 'photography',
        category: 'Social Media Content',
        image: 'https://res.cloudinary.com/dylpck2et/image/upload/v1757027985/DSC01908_ajbo4o.jpg',
        title: 'Social Campaign',
        description: 'Part of a social media campaign for brand awareness.',
        tags: ['Campaign', 'Brand', 'Awareness']
      }
    ],
    videos: [
      // Commercial/Ad Videos
      {
        id: 'ad-1',
        type: 'video',
        category: 'Commercial Videos',
        videoUrl: 'https://youtu.be/Ta5DIyDBP0A?si=6erwYrRi-3PvZ20f',
        videoId: 'Ta5DIyDBP0A',
        thumbnail: 'https://img.youtube.com/vi/Ta5DIyDBP0A/maxresdefault.jpg',
        title: 'Brand Commercial',
        description: 'Professional commercial video showcasing brand identity and values.',
        tags: ['Commercial', 'Branding', 'Professional']
      },
      {
        id: 'ad-2',
        type: 'video',
        category: 'Commercial Videos',
        videoUrl: 'https://youtu.be/yfiaEhWyVbw?si=O4j8k4seSJPs_Paa',
        videoId: 'yfiaEhWyVbw',
        thumbnail: 'https://img.youtube.com/vi/yfiaEhWyVbw/maxresdefault.jpg',
        title: 'Product Advertisement',
        description: 'Engaging product advertisement with cinematic quality.',
        tags: ['Advertisement', 'Product', 'Cinematic']
      },
      {
        id: 'ad-3',
        type: 'video',
        category: 'Commercial Videos',
        videoUrl: 'https://youtu.be/pcPBvLE_bgQ?si=xf2hcoGWb6Hv3hSa',
        videoId: 'pcPBvLE_bgQ',
        thumbnail: 'https://img.youtube.com/vi/pcPBvLE_bgQ/maxresdefault.jpg',
        title: 'Clothing Brand Ad',
        description: 'Fashion-focused commercial for clothing brand promotion.',
        tags: ['Fashion', 'Clothing', 'Brand']
      },
      // Corporate Coverage
      {
        id: 'corporate-1',
        type: 'video',
        category: 'Corporate Coverage',
        videoUrl: 'https://youtu.be/AFXDqLQsbJE?si=s2lTzkiexkPEBY3F',
        videoId: 'AFXDqLQsbJE',
        thumbnail: 'https://img.youtube.com/vi/AFXDqLQsbJE/maxresdefault.jpg',
        title: 'GITEX Morocco 2025 Coverage',
        description: 'Professional coverage of enterprise participation at GITEX Morocco 2025.',
        tags: ['Corporate', 'Event', 'Coverage', 'GITEX']
      },
      // Social Media Shorts
      {
        id: 'short-1',
        type: 'video',
        category: 'Social Media Shorts',
        videoUrl: 'https://youtube.com/shorts/GxLQiZtqwSk?si=5fgm65tci7HUWV8K',
        videoId: 'GxLQiZtqwSk',
        thumbnail: 'https://img.youtube.com/vi/GxLQiZtqwSk/maxresdefault.jpg',
        title: 'Viral Short Content',
        description: 'Engaging short-form content optimized for social media.',
        tags: ['Short', 'Viral', 'Social']
      },
      {
        id: 'short-2',
        type: 'video',
        category: 'Social Media Shorts',
        videoUrl: 'https://youtube.com/shorts/U26KdMrKGc8?si=OU_c9h3HcyDGQsPq',
        videoId: 'U26KdMrKGc8',
        thumbnail: 'https://img.youtube.com/vi/U26KdMrKGc8/maxresdefault.jpg',
        title: 'Creative Short',
        description: 'Creative short-form video content for digital platforms.',
        tags: ['Creative', 'Digital', 'Short-form']
      },
      {
        id: 'short-3',
        type: 'video',
        category: 'Social Media Shorts',
        videoUrl: 'https://youtube.com/shorts/76J-EBXoMUc?si=mZvZowgMmposlVsY',
        videoId: '76J-EBXoMUc',
        thumbnail: 'https://img.youtube.com/vi/76J-EBXoMUc/maxresdefault.jpg',
        title: 'Trending Short',
        description: 'Trending content designed for maximum engagement.',
        tags: ['Trending', 'Engagement', 'Popular']
      },
      {
        id: 'short-4',
        type: 'video',
        category: 'Social Media Shorts',
        videoUrl: 'https://youtube.com/shorts/9A-3tdVjR1s?si=7CTAPtqkK4SL2-TD',
        videoId: '9A-3tdVjR1s',
        thumbnail: 'https://img.youtube.com/vi/9A-3tdVjR1s/maxresdefault.jpg',
        title: 'Quick Content',
        description: 'Quick, impactful content for social media consumption.',
        tags: ['Quick', 'Impactful', 'Social']
      },
      {
        id: 'short-5',
        type: 'video',
        category: 'Social Media Shorts',
        videoUrl: 'https://youtube.com/shorts/x_JKPL7FKmA?si=ULroRSbeM2dUvC3A',
        videoId: 'x_JKPL7FKmA',
        thumbnail: 'https://img.youtube.com/vi/x_JKPL7FKmA/maxresdefault.jpg',
        title: 'Dynamic Short',
        description: 'Dynamic short content with engaging visuals.',
        tags: ['Dynamic', 'Visual', 'Engaging']
      },
      {
        id: 'short-6',
        type: 'video',
        category: 'Social Media Shorts',
        videoUrl: 'https://youtube.com/shorts/VcLOOMx2cwQ?si=s4sePJRrbdKAJ86s',
        videoId: 'VcLOOMx2cwQ',
        thumbnail: 'https://img.youtube.com/vi/VcLOOMx2cwQ/maxresdefault.jpg',
        title: 'Interactive Short',
        description: 'Interactive short-form content for audience engagement.',
        tags: ['Interactive', 'Audience', 'Engagement']
      }
    ]
  };

  const allItems = [...portfolioData.photography, ...portfolioData.videos];

  const getFilteredItems = () => {
    switch (activeFilter) {
      case 'photography':
        return portfolioData.photography;
      case 'video':
        return portfolioData.videos;
      case 'food':
        return portfolioData.photography.filter(item => item.category === 'Food Photography');
      case 'product':
        return portfolioData.photography.filter(item => item.category === 'Product Photography');
      default:
        return allItems;
    }
  };

  const openLightbox = (item) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const getYouTubeEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  };

  return (
    <section id="portfolio" className={styles.portfolio} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <span className={styles.subtitle}>Creative Showcase</span>
          <h2 className={styles.title}>
            Portfolio & <span className={styles.highlight}>Featured Work</span>
          </h2>
          <p className={styles.description}>
            Discover a curated selection of my visual storytelling work, from fashion photography 
            to commercial videos, showcasing over a decade of creative excellence.
          </p>
        </div>

        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span className={styles.filterIcon}>🎨</span>
            All Work
            <span className={styles.count}>({allItems.length})</span>
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'photography' ? styles.active : ''}`}
            onClick={() => setActiveFilter('photography')}
          >
            <span className={styles.filterIcon}>📸</span>
            Photography
            <span className={styles.count}>({portfolioData.photography.length})</span>
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'food' ? styles.active : ''}`}
            onClick={() => setActiveFilter('food')}
          >
            <span className={styles.filterIcon}>🍽️</span>
            Food
            <span className={styles.count}>({portfolioData.photography.filter(item => item.category === 'Food Photography').length})</span>
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'product' ? styles.active : ''}`}
            onClick={() => setActiveFilter('product')}
          >
            <span className={styles.filterIcon}>📦</span>
            Product
            <span className={styles.count}>({portfolioData.photography.filter(item => item.category === 'Product Photography').length})</span>
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'video' ? styles.active : ''}`}
            onClick={() => setActiveFilter('video')}
          >
            <span className={styles.filterIcon}>🎬</span>
            Video
            <span className={styles.count}>({portfolioData.videos.length})</span>
          </button>
        </div>

        <div className={styles.portfolioGrid} ref={gridRef}>
          {getFilteredItems().map((item) => (
            <div
              key={item.id}
              className={`${styles.portfolioItem} ${styles[item.type]}`}
              onClick={() => openLightbox(item)}
            >
              {item.type === 'photography' ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
              ) : (
                <div className={styles.videoThumbnail}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.playButton}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  {item.category === 'Social Media Shorts' && (
                    <div className={styles.shortsBadge}>Shorts</div>
                  )}
                </div>
              )}
              <div className={styles.itemOverlay}>
                <div className={styles.overlayContent}>
                  <span className={styles.categoryTag}>{item.category}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <div className={styles.itemTags}>
                    {item.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedItem && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <div className={styles.lightboxContainer} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            <div className={styles.lightboxContent}>
              <div className={styles.mediaSection}>
                {selectedItem.type === 'photography' ? (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className={styles.lightboxImage}
                  />
                ) : (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedItem.videoId)}
                    className={styles.lightboxVideo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              
              <div className={styles.detailsSection}>
                <span className={styles.lightboxCategory}>{selectedItem.category}</span>
                <h3 className={styles.lightboxTitle}>{selectedItem.title}</h3>
                <p className={styles.lightboxDescription}>{selectedItem.description}</p>
                
                <div className={styles.lightboxTags}>
                  {selectedItem.tags.map((tag, index) => (
                    <span key={index} className={styles.lightboxTag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {selectedItem.type === 'video' && (
                  <a
                    href={selectedItem.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.youtubeLink}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;