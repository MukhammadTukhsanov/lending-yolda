import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    {
      code: 'uz',
      name: "O'zbekcha",
      flag: '🇺🇿',
      shortName: 'UZ',
      nativeName: 'Oʻzbek',
    },
    {
      code: 'ru',
      name: 'Русский',
      flag: '🇷🇺',
      shortName: 'RU',
      nativeName: 'Русский',
    },
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      shortName: 'EN',
      nativeName: 'English',
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='language-switcher-container position-relative' ref={dropdownRef}>
      <button
        className='btn btn-outline-light language-switcher-btn d-flex align-items-center'
        type='button'
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        style={{
          borderRadius: '25px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
          background: isOpen ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
          borderColor: 'rgba(255,255,255,0.3)',
          color: '#495057',
          transition: 'all 0.2s ease',
          minWidth: '80px',
        }}
      >
        <span style={{ fontSize: '16px', marginRight: '6px' }}>{currentLanguage.flag}</span>
        <span style={{ fontSize: '13px', fontWeight: '600' }}>{currentLanguage.shortName}</span>
        <i
          className='bi bi-chevron-down ms-1'
          style={{
            fontSize: '10px',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {isOpen && (
        <div
          className='language-dropdown'
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '8px',
            minWidth: '200px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.1)',
            padding: '8px',
            zIndex: 1050,
            animation: 'fadeInDown 0.2s ease-out',
          }}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option w-100 d-flex align-items-center ${
                i18n.language === language.code ? 'active' : ''
              }`}
              onClick={() => changeLanguage(language.code)}
              style={{
                border: 'none',
                background:
                  i18n.language === language.code
                    ? 'linear-gradient(135deg, #ff9556 0%, #ff724c 100%)'
                    : 'transparent',
                color: i18n.language === language.code ? 'white' : '#495057',
                padding: '10px 12px',
                borderRadius: '8px',
                margin: '2px 0',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (i18n.language !== language.code) {
                  e.target.style.background = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (i18n.language !== language.code) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '18px', marginRight: '10px' }}>{language.flag}</span>
              <div className='flex-grow-1'>
                <div style={{ fontWeight: '600', lineHeight: '1.1' }}>{language.nativeName}</div>
                <div
                  style={{
                    fontSize: '11px',
                    opacity: i18n.language === language.code ? '0.8' : '0.6',
                    marginTop: '1px',
                  }}
                >
                  {language.name}
                </div>
              </div>
              {i18n.language === language.code && (
                <i className='bi bi-check-lg' style={{ fontSize: '14px', color: 'white' }} />
              )}
            </button>
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .language-switcher-btn:hover {
            background: rgba(255,255,255,0.2) !important;
            border-color: rgba(255,255,255,0.4) !important;
            color: #495057 !important;
          }
          
          .language-switcher-btn:active {
            background: rgba(255,255,255,0.15) !important;
            color: #495057 !important;
          }
          
          @media (max-width: 992px) {
            .language-dropdown {
              right: auto !important;
              left: 0 !important;
              width: 100% !important;
              min-width: 200px !important;
            }
            
            .language-switcher-btn {
              width: 100% !important;
              justify-content: center !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LanguageSwitcher;
