import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/landing.css';
import { initScrollAnimations } from '../utils/animations';
import { initNavbarEffects } from '../utils/navbar';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // App screenshots for the slider
  const appScreenshots = [
    {
      src: '/screenshots/home-screen.jpg',
      alt: 'Home Screen',
      fallback: '/home-banner.svg',
    },
    {
      src: '/screenshots/menu-screen.jpg',
      alt: 'Menu Screen',
      fallback: '/home-banner.svg',
    },
    {
      src: '/screenshots/order-screen.jpg',
      alt: 'Order Screen',
      fallback: '/home-banner.svg',
    },
    {
      src: '/screenshots/tracking-screen.jpg',
      alt: 'Order Tracking',
      fallback: '/home-banner.svg',
    },
  ];

  useEffect(() => {
    initScrollAnimations();
    const cleanupNavbar = initNavbarEffects();

    // Auto-slide functionality
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % appScreenshots.length);
    }, 3000);

    // Contact form handling
    const handleContactForm = async (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const submitBtn = form.querySelector('.submit-btn');
      const messagesDiv = document.getElementById('form-messages');

      // Show loading state
      submitBtn.innerHTML = '<i class="bi bi-arrow-clockwise me-2 spin"></i>Yuborilmoqda...';
      submitBtn.disabled = true;

      try {
        const response = await fetch('/api/send-email.php', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          messagesDiv.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i>
              <strong>Muvaffaqiyat!</strong> Xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
          `;
          form.reset();
        } else {
          throw new Error(result.message || 'Xato yuz berdi');
        }
      } catch (error) {
        messagesDiv.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Xato!</strong> ${error.message}. Iltimos, qaytadan urinib ko'ring.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>
        `;
      } finally {
        // Reset button
        submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Xabar Yuborish';
        submitBtn.disabled = false;
      }
    };

    // Add form event listener
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactForm);
    }

    // Cleanup function
    return () => {
      if (cleanupNavbar) cleanupNavbar();
      clearInterval(slideInterval);
      if (contactForm) {
        contactForm.removeEventListener('submit', handleContactForm);
      }
    };
  }, [appScreenshots.length]);
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section
        id='hero'
        className='hero-section pattern-bg'
        style={{
          background: 'linear-gradient(135deg, #ff9556 0%, #ff724c 50%, #ff4f42 100%)',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '80px',
        }}
      >
        <div className='container'>
          <div className='row align-items-center g-4'>
            <div className='col-lg-6 col-md-12 fade-in-up order-2 order-lg-1'>
              <h1 className='display-3 fw-bold mb-3 mb-md-4'>
                Tez <span style={{ color: '#fff3e0' }}>Yetkazib Berish</span>
                <br />
                <span style={{ color: '#fff3e0' }}>Oson</span> va Ishonchli
              </h1>
              <p className='lead mb-3 mb-md-4 fs-5'>
                Bizning mobil ilovamiz orqali istalgan mahsulotni 30 daqiqada yetkazib beramiz.
                Android va iOS uchun mavjud!
              </p>

              {/* App Download Buttons */}
              <div className='d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start flex-wrap gap-3 mb-4'>
                <a
                  href='https://apps.apple.com'
                  className='btn btn-dark btn-lg d-flex align-items-center app-store-btn'
                  style={{ borderRadius: '15px' }}
                >
                  <i className='bi bi-apple me-2 fs-4'></i>
                  <div className='text-start'>
                    <div style={{ fontSize: '12px' }}>Download on the</div>
                    <div className='fw-bold'>App Store</div>
                  </div>
                </a>
                <a
                  href='https://play.google.com'
                  className='btn btn-dark btn-lg d-flex align-items-center app-store-btn'
                  style={{ borderRadius: '15px' }}
                >
                  <i className='bi bi-google-play me-2 fs-4'></i>
                  <div className='text-start'>
                    <div style={{ fontSize: '12px' }}>Get it on</div>
                    <div className='fw-bold'>Google Play</div>
                  </div>
                </a>
              </div>

              {/* Stats */}
              <div className='row mt-4 mt-md-5 g-3'>
                <div className='col-lg-4 col-md-4 col-sm-4'>
                  <div className='modern-stat-card text-center'>
                    <div className='stat-icon mb-2'>
                      <i className='bi bi-people-fill'></i>
                    </div>
                    <h3 className='stat-number gradient-text fw-bold mb-1'>50K+</h3>
                    <p className='stat-label mb-0'>Mijozlar</p>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4'>
                  <div className='modern-stat-card text-center'>
                    <div className='stat-icon mb-2'>
                      <i className='bi bi-clock-fill'></i>
                    </div>
                    <h3 className='stat-number gradient-text fw-bold mb-1'>30</h3>
                    <p className='stat-label mb-0'>Daqiqa yetkazish</p>
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4'>
                  <div className='modern-stat-card text-center'>
                    <div className='stat-icon mb-2'>
                      <i className='bi bi-headset'></i>
                    </div>
                    <h3 className='stat-number gradient-text fw-bold mb-1'>24/7</h3>
                    <p className='stat-label mb-0'>Xizmat</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-6 col-md-12 text-center fade-in-up order-1 order-lg-2'>
              <div className='position-relative'>
                {/* Phone Mockup Container */}
                <div className='phone-mockup mx-auto position-relative'>
                  {/* Phone Frame */}
                  <div className='phone-frame'>
                    {/* Screen Content Slider */}
                    <div className='phone-screen overflow-hidden'>
                      <div
                        className='screenshot-slider d-flex transition-all'
                        style={{
                          transform: `translateX(-${currentSlide * 100}%)`,
                          transition: 'transform 0.5s ease-in-out',
                        }}
                      >
                        {appScreenshots.map((screenshot, index) => (
                          <div
                            key={index}
                            className='screenshot-slide flex-shrink-0 w-100 d-flex flex-column align-items-center justify-content-center text-white p-4'
                          >
                            <img
                              src={screenshot.src}
                              alt={screenshot.alt}
                              className='w-100 h-100 object-fit-cover position-absolute top-0 start-0'
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                              onLoad={(e) => {
                                e.target.nextSibling.style.display = 'none';
                              }}
                            />
                            {/* Fallback content when image fails to load */}
                            <div className='fallback-content text-center'>
                              {index === 0 && (
                                <>
                                  <i className='bi bi-house-door fs-1 mb-3'></i>
                                  <h5 className='fw-bold'>Bosh sahifa</h5>
                                  <p className='small opacity-75'>
                                    Kategoriyalar va mashhur taomlar
                                  </p>
                                </>
                              )}
                              {index === 1 && (
                                <>
                                  <i className='bi bi-grid fs-1 mb-3'></i>
                                  <h5 className='fw-bold'>Menyu</h5>
                                  <p className='small opacity-75'>Barcha taom va ichimliklar</p>
                                </>
                              )}
                              {index === 2 && (
                                <>
                                  <i className='bi bi-cart fs-1 mb-3'></i>
                                  <h5 className='fw-bold'>Buyurtma</h5>
                                  <p className='small opacity-75'>Savatcha va to\'lov</p>
                                </>
                              )}
                              {index === 3 && (
                                <>
                                  <i className='bi bi-geo-alt fs-1 mb-3'></i>
                                  <h5 className='fw-bold'>Kuzatuv</h5>
                                  <p className='small opacity-75'>Buyurtma holati</p>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Phone Frame Overlay */}
                    <div className='phone-overlay'></div>
                  </div>

                  {/* Slider Dots */}
                  <div className='slider-dots d-flex justify-content-center mt-4 gap-2'>
                    {appScreenshots.map((_, index) => (
                      <button
                        key={index}
                        className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor:
                            index === currentSlide ? '#ff9556' : 'rgba(255, 149, 86, 0.3)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Modern Floating Bubbles */}
                <div className='floating-bubbles'>
                  {/* Speed Bubble */}
                  <div className='modern-bubble bubble-1'>
                    <div className='bubble-glow'></div>
                    <div className='bubble-content'>
                      <div className='bubble-icon'>
                        <i className='bi bi-lightning-charge fs-3'></i>
                      </div>
                      <div className='bubble-text'>
                        <span className='bubble-title'>Tezkor</span>
                        <span className='bubble-subtitle'>30 min</span>
                      </div>
                    </div>
                  </div>

                  {/* Quality Bubble */}
                  <div className='modern-bubble bubble-2'>
                    <div className='bubble-glow'></div>
                    <div className='bubble-content'>
                      <div className='bubble-icon'>
                        <i className='bi bi-award fs-3'></i>
                      </div>
                      <div className='bubble-text'>
                        <span className='bubble-title'>Sifat</span>
                        <span className='bubble-subtitle'>Premium</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Bubble */}
                  <div className='modern-bubble bubble-3'>
                    <div className='bubble-glow'></div>
                    <div className='bubble-content'>
                      <div className='bubble-icon'>
                        <i className='bi bi-shield-check fs-3'></i>
                      </div>
                      <div className='bubble-text'>
                        <span className='bubble-title'>Xavfsiz</span>
                        <span className='bubble-subtitle'>100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Support Bubble */}
                  <div className='modern-bubble bubble-4'>
                    <div className='bubble-glow'></div>
                    <div className='bubble-content'>
                      <div className='bubble-icon'>
                        <i className='bi bi-headset fs-3'></i>
                      </div>
                      <div className='bubble-text'>
                        <span className='bubble-title'>Yordam</span>
                        <span className='bubble-subtitle'>24/7</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Decorative Elements */}
                  <div className='floating-shapes'>
                    <div className='shape shape-1'></div>
                    <div className='shape shape-2'></div>
                    <div className='shape shape-3'></div>
                    <div className='shape shape-4'></div>
                    <div className='shape shape-5'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='services' className='modern-features-section'>
        <div className='container'>
          <div className='row text-center mb-5 fade-in-up'>
            <div className='col-lg-8 mx-auto'>
              <div className='features-badge mb-3'>
                <span className='badge-text'>Bizning afzalliklarimiz</span>
              </div>
              <h2 className='display-5 fw-bold mb-4 gradient-text'>Nima uchun bizni tanlaysiz?</h2>
              <p className='lead text-muted fs-5'>
                Bizning ilovamiz sizga eng yaxshi xizmatni taqdim etish uchun zamonaviy
                texnologiyalar bilan yaratilgan
              </p>
            </div>
          </div>

          <div className='row g-4'>
            <div className='col-lg-4 col-md-6 fade-in-up'>
              <div className='modern-feature-card h-100'>
                <div className='feature-card-header'>
                  <div className='feature-icon-wrapper'>
                    <div className='feature-icon-bg'></div>
                    <div className='feature-icon'>
                      <i className='bi bi-lightning-charge'></i>
                    </div>
                  </div>
                  <div className='feature-number'>01</div>
                </div>
                <div className='feature-content'>
                  <h5 className='feature-title'>Tezkor Yetkazish</h5>
                  <p className='feature-description'>
                    30 daqiqada istalgan joyga yetkazib beramiz. AI-powered logistics tizimi orqali
                    eng optimal yo'lni topamiz.
                  </p>
                  <div className='feature-highlight'>
                    <i className='bi bi-check-circle-fill me-2'></i>
                    <span>Kafolatlangan tezlik</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 fade-in-up' style={{ animationDelay: '0.2s' }}>
              <div className='modern-feature-card h-100'>
                <div className='feature-card-header'>
                  <div className='feature-icon-wrapper'>
                    <div className='feature-icon-bg'></div>
                    <div className='feature-icon'>
                      <i className='bi bi-house-heart'></i>
                    </div>
                  </div>
                  <div className='feature-number'>02</div>
                </div>
                <div className='feature-content'>
                  <h5 className='feature-title'>Uyingizdayoq Qabul</h5>
                  <p className='feature-description'>
                    Mahsulotni to'g'ridan-to'g'ri sizning manzilingizga yetkazib beramiz. Real-time
                    tracking bilan buyurtmangizni kuzating.
                  </p>
                  <div className='feature-highlight'>
                    <i className='bi bi-geo-alt-fill me-2'></i>
                    <span>GPS tracking</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 fade-in-up' style={{ animationDelay: '0.4s' }}>
              <div className='modern-feature-card h-100'>
                <div className='feature-card-header'>
                  <div className='feature-icon-wrapper'>
                    <div className='feature-icon-bg'></div>
                    <div className='feature-icon'>
                      <i className='bi bi-award'></i>
                    </div>
                  </div>
                  <div className='feature-number'>03</div>
                </div>
                <div className='feature-content'>
                  <h5 className='feature-title'>Premium Sifat</h5>
                  <p className='feature-description'>
                    Eng yuqori sifatli xizmat va mijozlar mamnuniyati bizning asosiy maqsadimiz.
                    24/7 qo'llab-quvvatlash.
                  </p>
                  <div className='feature-highlight'>
                    <i className='bi bi-shield-check-fill me-2'></i>
                    <span>100% kafolat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features Row */}
          <div className='row g-4 mt-4'>
            <div className='col-lg-6 col-md-6 fade-in-up' style={{ animationDelay: '0.6s' }}>
              <div className='modern-feature-card secondary h-100'>
                <div className='feature-card-header'>
                  <div className='feature-icon-wrapper small'>
                    <div className='feature-icon-bg'></div>
                    <div className='feature-icon'>
                      <i className='bi bi-credit-card'></i>
                    </div>
                  </div>
                </div>
                <div className='feature-content'>
                  <h6 className='feature-title'>Xavfsiz To'lov</h6>
                  <p className='feature-description'>
                    Bank kartalari, elektronik hamyonlar va naqd to'lov usullari
                  </p>
                </div>
              </div>
            </div>

            <div className='col-lg-6 col-md-6 fade-in-up' style={{ animationDelay: '0.8s' }}>
              <div className='modern-feature-card secondary h-100'>
                <div className='feature-card-header'>
                  <div className='feature-icon-wrapper small'>
                    <div className='feature-icon-bg'></div>
                    <div className='feature-icon'>
                      <i className='bi bi-people'></i>
                    </div>
                  </div>
                </div>
                <div className='feature-content'>
                  <h6 className='feature-title'>Mijozlar Jamoasi</h6>
                  <p className='feature-description'>
                    50,000+ mamnun mijozlar va 4.8★ reyting App Store'da
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots Section */}
      <section id='about' className='py-5'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h2 className='display-5 fw-bold mb-4'>Ilovani ishlatish juda oson</h2>
              <div className='row g-4'>
                <div className='col-12'>
                  <div className='d-flex align-items-start'>
                    <div
                      className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                      style={{
                        width: '50px',
                        height: '50px',
                        minWidth: '50px',
                        background: 'linear-gradient(135deg, #ff9556 0%, #ff724c 100%)',
                      }}
                    >
                      <span className='fw-bold'>1</span>
                    </div>
                    <div>
                      <h5 className='fw-bold mb-2'>Ilovani yuklab oling</h5>
                      <p className='text-muted mb-0'>
                        App Store yoki Google Play'dan bepul yuklab oling
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='d-flex align-items-start'>
                    <div
                      className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                      style={{
                        width: '50px',
                        height: '50px',
                        minWidth: '50px',
                        background: 'linear-gradient(135deg, #ff9556 0%, #ff724c 100%)',
                      }}
                    >
                      <span className='fw-bold'>2</span>
                    </div>
                    <div>
                      <h5 className='fw-bold mb-2'>Maxsulotni tanlang</h5>
                      <p className='text-muted mb-0'>Minglab mahsulot ichidan kerakligini toping</p>
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='d-flex align-items-start'>
                    <div
                      className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                      style={{
                        width: '50px',
                        height: '50px',
                        minWidth: '50px',
                        background: 'linear-gradient(135deg, #ff9556 0%, #ff724c 100%)',
                      }}
                    >
                      <span className='fw-bold'>3</span>
                    </div>
                    <div>
                      <h5 className='fw-bold mb-2'>Buyurtma bering</h5>
                      <p className='text-muted mb-0'>
                        Bir necha daqiqada buyurtmangizni rasmiylashtirib oling
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6 text-center'>
              <div className='position-relative'>
                <img
                  src='/home-banner.svg'
                  alt='App Screenshot'
                  className='img-fluid'
                  style={{ maxHeight: '500px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-5 bg-light'>
        <div className='container'>
          <div className='row text-center mb-5'>
            <div className='col-lg-8 mx-auto'>
              <h2 className='display-5 fw-bold mb-3'>Mijozlarimiz fikri</h2>
              <p className='lead text-muted'>
                Bizning xizmatlarimizdan foydalanayotgan mijozlar fikri
              </p>
            </div>
          </div>

          <div className='row g-4'>
            <div className='col-lg-4 col-md-6 fade-in-up'>
              <div className='bg-white p-4 rounded-4 shadow-sm h-100 testimonial-card'>
                <div className='mb-3'>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                </div>
                <p className='mb-3'>
                  "Juda tez va sifatli xizmat. Har doim vaqtida yetkazib berishadi. Rahmat!"
                </p>
                <div className='d-flex align-items-center'>
                  <div
                    className='bg-primary rounded-circle d-flex align-items-center justify-content-center me-3'
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #ff9556 0%, #ff724c 100%)',
                    }}
                  >
                    <span className='text-white fw-bold'>A</span>
                  </div>
                  <div>
                    <h6 className='mb-0 fw-bold'>Aziza Karimova</h6>
                    <small className='text-muted'>Doimiy mijoz</small>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 fade-in-up' style={{ animationDelay: '0.2s' }}>
              <div className='bg-white p-4 rounded-4 shadow-sm h-100 testimonial-card'>
                <div className='mb-3'>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                </div>
                <p className='mb-3'>
                  "Ilova juda qulay va ishlatish oson. Buyurtma berish bir necha daqiqa ichida
                  amalga oshadi."
                </p>
                <div className='d-flex align-items-center'>
                  <div
                    className='bg-success rounded-circle d-flex align-items-center justify-content-center me-3'
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #ff724c 0%, #ff4f42 100%)',
                    }}
                  >
                    <span className='text-white fw-bold'>J</span>
                  </div>
                  <div>
                    <h6 className='mb-0 fw-bold'>Javohir Aliyev</h6>
                    <small className='text-muted'>Hamkor</small>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 fade-in-up' style={{ animationDelay: '0.4s' }}>
              <div className='bg-white p-4 rounded-4 shadow-sm h-100 testimonial-card'>
                <div className='mb-3'>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                  <i className='bi bi-star-fill text-warning'></i>
                </div>
                <p className='mb-3'>
                  "Eng yaxshi yetkazib berish xizmati! Har doim sifatli va tez. Tavsiya qilaman."
                </p>
                <div className='d-flex align-items-center'>
                  <div
                    className='bg-warning rounded-circle d-flex align-items-center justify-content-center me-3'
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #ff4f42 0%, #ff9556 100%)',
                    }}
                  >
                    <span className='text-white fw-bold'>M</span>
                  </div>
                  <div>
                    <h6 className='mb-0 fw-bold'>Madina Usmanova</h6>
                    <small className='text-muted'>Mijoz</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className='py-5 bg-light'>
        <div className='container'>
          <div className='row text-center mb-5'>
            <div className='col-lg-8 mx-auto'>
              <h2 className='display-5 fw-bold mb-3 gradient-text'>Biz bilan bog'laning</h2>
              <p className='lead text-muted'>
                Savollaringiz bormi? Biz sizga yordam berishga tayyormiz!
              </p>
            </div>
          </div>

          <div className='row justify-content-center'>
            <div className='col-lg-8'>
              <div className='bg-white p-5 rounded-4 shadow-sm contact-form-card'>
                <form id='contactForm' className='contact-form'>
                  <div className='row g-4'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label htmlFor='name' className='form-label fw-semibold'>
                          <i className='bi bi-person-fill me-2 text-primary'></i>
                          Ismingiz *
                        </label>
                        <input
                          type='text'
                          className='form-control form-control-lg'
                          id='name'
                          name='name'
                          required
                          placeholder='Ismingizni kiriting'
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label htmlFor='email' className='form-label fw-semibold'>
                          <i className='bi bi-envelope-fill me-2 text-primary'></i>
                          Email manzilingiz *
                        </label>
                        <input
                          type='email'
                          className='form-control form-control-lg'
                          id='email'
                          name='email'
                          required
                          placeholder='email@example.com'
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label htmlFor='phone' className='form-label fw-semibold'>
                          <i className='bi bi-telephone-fill me-2 text-primary'></i>
                          Telefon raqami
                        </label>
                        <input
                          type='tel'
                          className='form-control form-control-lg'
                          id='phone'
                          name='phone'
                          placeholder='+998 90 123 45 67'
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label htmlFor='subject' className='form-label fw-semibold'>
                          <i className='bi bi-chat-dots-fill me-2 text-primary'></i>
                          Mavzu *
                        </label>
                        <select
                          className='form-select form-select-lg'
                          id='subject'
                          name='subject'
                          required
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <option value=''>Mavzuni tanlang</option>
                          <option value='Umumiy savol'>Umumiy savol</option>
                          <option value='Texnik yordam'>Texnik yordam</option>
                          <option value='Hamkorlik'>Hamkorlik</option>
                          <option value='Shikoyat'>Shikoyat</option>
                          <option value='Taklif'>Taklif</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='form-group'>
                        <label htmlFor='message' className='form-label fw-semibold'>
                          <i className='bi bi-chat-text-fill me-2 text-primary'></i>
                          Xabaringiz *
                        </label>
                        <textarea
                          className='form-control form-control-lg'
                          id='message'
                          name='message'
                          rows='5'
                          required
                          placeholder='Xabaringizni bu yerga yozing...'
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease',
                            resize: 'vertical',
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className='col-12 text-center'>
                      <button
                        type='submit'
                        className='btn btn-lg px-5 py-3 submit-btn'
                        style={{
                          background:
                            'linear-gradient(135deg, #ff9556 0%, #ff724c 50%, #ff4f42 100%)',
                          border: 'none',
                          borderRadius: '15px',
                          color: 'white',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <i className='bi bi-send-fill me-2'></i>
                        Xabar Yuborish
                      </button>
                    </div>
                  </div>

                  {/* Status Messages */}
                  <div id='form-messages' className='mt-4'></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className='py-5'
        style={{
          background: 'linear-gradient(135deg, #ff9556 0%, #ff724c 50%, #ff4f42 100%)',
          color: 'white',
        }}
      >
        <div className='container text-center'>
          <div className='row'>
            <div className='col-lg-8 mx-auto'>
              <h2 className='display-5 fw-bold mb-4'>Hoziroq boshlab ko'ring!</h2>
              <p className='lead mb-4'>
                Bizning ilovamizni yuklab oling va tez yetkazib berish xizmatidan foydalaning
              </p>

              <div className='d-flex justify-content-center flex-wrap gap-3 mb-4'>
                <a
                  href='https://apps.apple.com'
                  className='btn btn-light btn-lg d-flex align-items-center'
                  style={{ borderRadius: '15px' }}
                >
                  <i className='bi bi-apple me-2 fs-4'></i>
                  <div className='text-start'>
                    <div style={{ fontSize: '12px', color: '#666' }}>Download on the</div>
                    <div className='fw-bold text-dark'>App Store</div>
                  </div>
                </a>
                <a
                  href='https://play.google.com'
                  className='btn btn-light btn-lg d-flex align-items-center'
                  style={{ borderRadius: '15px' }}
                >
                  <i className='bi bi-google-play me-2 fs-4'></i>
                  <div className='text-start'>
                    <div style={{ fontSize: '12px', color: '#666' }}>Get it on</div>
                    <div className='fw-bold text-dark'>Google Play</div>
                  </div>
                </a>
              </div>

              <p className='mb-0'>
                <small>2 million+ downloads • 4.8★ rating</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id='contact' className='bg-dark text-light py-5'>
        <div className='container'>
          <div className='row g-4'>
            <div className='col-lg-4'>
              <img src='/logo.svg' alt='Logo' height='60' className='mb-3' />
              <p className='mb-3'>
                Tez va ishonchli yetkazib berish xizmati. Sizning qulayligingiz bizning maqsadimiz.
              </p>
              <div className='d-flex gap-3'>
                <a
                  href='https://facebook.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-light social-link'
                >
                  <i className='bi bi-facebook fs-4'></i>
                </a>
                <a
                  href='https://instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-light social-link'
                >
                  <i className='bi bi-instagram fs-4'></i>
                </a>
                <a
                  href='https://t.me'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-light social-link'
                >
                  <i className='bi bi-telegram fs-4'></i>
                </a>
                <a
                  href='https://youtube.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-light social-link'
                >
                  <i className='bi bi-youtube fs-4'></i>
                </a>
              </div>
            </div>

            <div className='col-lg-2 col-md-3'>
              <h6 className='fw-bold mb-3'>Kompaniya</h6>
              <ul className='list-unstyled'>
                <li className='mb-2'>
                  <button className='btn btn-link text-light text-decoration-none p-0 border-0'>
                    Biz haqimizda
                  </button>
                </li>
                <li className='mb-2'>
                  <button className='btn btn-link text-light text-decoration-none p-0 border-0'>
                    Xizmatlar
                  </button>
                </li>
                <li className='mb-2'>
                  <button className='btn btn-link text-light text-decoration-none p-0 border-0'>
                    Yangiliklar
                  </button>
                </li>
                <li className='mb-2'>
                  <button className='btn btn-link text-light text-decoration-none p-0 border-0'>
                    Karyera
                  </button>
                </li>
              </ul>
            </div>

            <div className='col-lg-2 col-md-3'>
              <h6 className='fw-bold mb-3'>Yordam</h6>
              <ul className='list-unstyled'>
                <li className='mb-2'>
                  <button className='btn btn-link text-light text-decoration-none p-0 border-0'>
                    FAQ
                  </button>
                </li>
                <li className='mb-2'>
                  <button className='btn btn-link text-light text-decoration-none p-0 border-0'>
                    Qo'llab-quvvatlash
                  </button>
                </li>
                <li className='mb-2'>
                  <button className='btn btn-link text-light text-decoration-none p-0 border-0'>
                    Aloqa
                  </button>
                </li>
                <li className='mb-2'>
                  <button className='btn btn-link text-light text-decoration-none p-0 border-0'>
                    Yetkazish
                  </button>
                </li>
              </ul>
            </div>

            <div className='col-lg-4 col-md-6'>
              <h6 className='fw-bold mb-3'>Aloqa</h6>
              <div className='mb-2'>
                <i className='bi bi-geo-alt me-2'></i>
                Toshkent, O'zbekiston
              </div>
              <div className='mb-2'>
                <i className='bi bi-telephone me-2'></i>
                +998 90 123 45 67
              </div>
              <div className='mb-2'>
                <i className='bi bi-envelope me-2'></i>
                info@yolda.uz
              </div>
            </div>
          </div>

          <hr className='my-4' />

          <div className='row align-items-center'>
            <div className='col-md-6'>
              <p className='mb-0'>&copy; 2025 Yolda. Barcha huquqlar himoyalangan.</p>
            </div>
            <div className='col-md-6 text-md-end'>
              <button className='btn btn-link text-light text-decoration-none me-3 p-0 border-0'>
                Maxfiylik siyosati
              </button>
              <button className='btn btn-link text-light text-decoration-none p-0 border-0'>
                Foydalanish shartlari
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
