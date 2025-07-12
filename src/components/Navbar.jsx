import { useState } from 'react';

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });

      // Close mobile menu if open
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  };

  const showPartnerModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can add form submission logic
    alert("Arizangiz yuborildi! Tez orada siz bilan bog'lanamiz.");
    setShowModal(false);
  };

  return (
    <>
      <nav
        className='navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-lg border-0'
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95) !important',
          minHeight: '70px',
        }}
      >
        <div className='container'>
          {/* Logo Section */}
          <button
            className='navbar-brand btn btn-link p-0 border-0 bg-transparent d-flex align-items-center'
            onClick={() => scrollToSection('hero')}
          >
            <img
              src={'/logo.svg'}
              alt='Yolda Logo'
              height={45}
              className='d-inline-block align-text-top me-2'
            />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className='navbar-toggler border-0 py-2'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
            style={{ boxShadow: 'none' }}
          >
            <div className='navbar-toggler-custom'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Navigation Menu */}
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav mx-auto mb-0'>
              <li className='nav-item'>
                <button
                  className='nav-link fw-semibold px-3 py-2 btn btn-link border-0 text-decoration-none position-relative nav-link-custom'
                  onClick={() => scrollToSection('hero')}
                >
                  Bosh sahifa
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className='nav-link fw-semibold px-3 py-2 btn btn-link border-0 text-decoration-none position-relative nav-link-custom'
                  onClick={() => scrollToSection('services')}
                >
                  Xizmatlar
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className='nav-link fw-semibold px-3 py-2 btn btn-link border-0 text-decoration-none position-relative nav-link-custom'
                  onClick={() => scrollToSection('about')}
                >
                  Biz haqimizda
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className='nav-link fw-semibold px-3 py-2 btn btn-link border-0 text-decoration-none position-relative nav-link-custom'
                  onClick={() => scrollToSection('contact')}
                >
                  Aloqa
                </button>
              </li>
            </ul>

            {/* CTA Button Section - Redesigned for Better Responsive Behavior */}
            <div className='d-flex flex-column flex-lg-row gap-2 align-items-center'>
              {/* Phone Number - More responsive visibility */}
              <div className='phone-container d-none d-lg-block'>
                <button
                  className='btn btn-link text-decoration-none fw-semibold phone-btn d-flex gap-2'
                  style={{
                    color: '#6c757d',
                    fontSize: '0.9rem',
                  }}
                  onClick={() => scrollToSection('contact')}
                >
                  <i className='bi bi-telephone me-1'></i>
                  <span className='phone-text text-nowrap'>+998 90 123 45 67</span>
                </button>
              </div>

              {/* Mobile Phone - Full number in mobile menu */}
              <div className='d-lg-none w-100 mb-2'>
                <button
                  className='btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center'
                  style={{
                    color: '#6c757d',
                    borderColor: 'rgba(108, 117, 125, 0.3)',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => scrollToSection('contact')}
                >
                  <i className='bi bi-telephone me-2'></i>
                  +998 90 123 45 67
                </button>
              </div>

              {/* CTA Button */}
              <button
                className='btn btn-primary rounded-pill fw-semibold position-relative overflow-hidden cta-button w-100 w-lg-auto'
                type='button'
                style={{
                  background: 'linear-gradient(135deg, #ff9556 0%, #ff724c 50%, #ff4f42 100%)',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(255, 149, 86, 0.3)',
                  transition: 'all 0.3s ease',
                  minHeight: '44px',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.9rem',
                }}
                onClick={showPartnerModal}
              >
                <span className='position-relative z-1'>
                  <i className='bi bi-people me-1'></i>
                  <span className='cta-text'>Hamkor bo'lish</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Partner Modal */}
      {showModal && (
        <div
          className='modal show d-block'
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeModal}
        >
          <div
            className='modal-dialog modal-dialog-centered modal-lg mx-3 mx-md-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='modal-content border-0 shadow-lg' style={{ borderRadius: '20px' }}>
              <div className='modal-header border-0 pb-0'>
                <h5 className='modal-title fw-bold fs-4 fs-md-3' style={{ color: '#ff9556' }}>
                  <i className='bi bi-people-fill me-2'></i>
                  Hamkor bo'ling!
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={closeModal}
                  aria-label='Close'
                  style={{ minWidth: '44px', minHeight: '44px' }}
                ></button>
              </div>
              <div className='modal-body px-4 py-3'>
                <div className='text-center mb-4'>
                  <div
                    className='bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3'
                    style={{
                      width: '80px',
                      height: '80px',
                      background:
                        'linear-gradient(135deg, rgba(255, 149, 86, 0.1) 0%, rgba(255, 114, 76, 0.1) 100%)',
                    }}
                  >
                    <i className='bi bi-handshake fs-1' style={{ color: '#ff9556' }}></i>
                  </div>
                  <h6 className='fw-bold mb-3'>Bizning jamoamizga qo'shiling!</h6>
                  <p className='text-muted'>
                    Yolda bilan hamkorlik qiling va o'z biznesingizni rivojlantiring. Biz sizga
                    barcha imkoniyatlarni taklif qilamiz.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit}>
                  <div className='row g-3'>
                    <div className='col-md-6'>
                      <label htmlFor='partnerName' className='form-label fw-semibold'>
                        Ism va Familiya
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='partnerName'
                        placeholder='Ismingizni kiriting'
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #e0e0e0',
                          minHeight: '44px',
                        }}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label htmlFor='partnerPhone' className='form-label fw-semibold'>
                        Telefon raqam
                      </label>
                      <input
                        type='tel'
                        className='form-control'
                        id='partnerPhone'
                        placeholder='+998 90 123 45 67'
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #e0e0e0',
                          minHeight: '44px',
                        }}
                      />
                    </div>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='partnerEmail' className='form-label fw-semibold'>
                      Email manzil
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='partnerEmail'
                      placeholder='email@example.com'
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #e0e0e0',
                        minHeight: '44px',
                      }}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='partnerBusiness' className='form-label fw-semibold'>
                      Biznes turi
                    </label>
                    <select
                      className='form-select'
                      id='partnerBusiness'
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #e0e0e0',
                        minHeight: '44px',
                      }}
                    >
                      <option value=''>Biznes turini tanlang</option>
                      <option value='restaurant'>Restoran</option>
                      <option value='grocery'>Oziq-ovqat do'koni</option>
                      <option value='pharmacy'>Dorixona</option>
                      <option value='retail'>Chakana savdo</option>
                      <option value='other'>Boshqa</option>
                    </select>
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='partnerMessage' className='form-label fw-semibold'>
                      Qo'shimcha ma'lumot
                    </label>
                    <textarea
                      className='form-control'
                      id='partnerMessage'
                      rows={3}
                      placeholder="Biznesingiz haqida qisqacha ma'lumot bering..."
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #e0e0e0',
                        minHeight: '80px',
                      }}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className='modal-footer border-0 pt-0 d-flex flex-column flex-sm-row gap-2'>
                <button
                  type='button'
                  className='btn btn-light rounded-pill px-4 order-2 order-sm-1'
                  onClick={closeModal}
                  style={{ minHeight: '44px' }}
                >
                  Bekor qilish
                </button>
                <button
                  type='submit'
                  className='btn btn-primary rounded-pill px-4 order-1 order-sm-2'
                  style={{
                    background: 'linear-gradient(135deg, #ff9556 0%, #ff724c 50%, #ff4f42 100%)',
                    border: 'none',
                    minHeight: '44px',
                  }}
                >
                  <i className='bi bi-send me-2'></i>
                  Yuborish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
