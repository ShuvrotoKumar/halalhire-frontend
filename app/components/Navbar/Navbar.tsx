'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { User, LogOut, Settings, Edit3, Menu, X } from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';
import { useTranslation } from 'react-i18next'
import { useGetAvatarQuery } from '@/redux/api/avatarApi';
import { imageUrl } from '@/Utils/server';
import { useGetUserDetailsQuery } from '@/redux/api/profileApi';

const UserAvatar = ({ src, alt, size, className, placeholderChar }: { src: string | null, alt: string, size: number, className: string, placeholderChar: string }) => {
  const [error, setError] = useState(false);

  if (src && !error) {
    return (
      <Image 
        src={src} 
        alt={alt} 
        width={size} 
        height={size} 
        className={className} 
        onError={() => setError(true)} 
      />
    );
  }

  return (
    <div className={styles.avatarPlaceholder} style={{ width: size, height: size, fontSize: size / 2.5 }}>
      {placeholderChar}
    </div>
  );
};

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const pathname = usePathname();
  const { user, logout, login } = useAuth();
  
  // Fetch user details and avatar
  const { data: profileRes } = useGetUserDetailsQuery(undefined, { skip: !user });
  const { data: avatarRes } = useGetAvatarQuery(undefined, { skip: !user });
  
  // Get avatar from avatarRes (handles both user and company)
  const avatarData = avatarRes?.data?.data || avatarRes?.data || {};
  let rawAvatar = avatarData.photo || avatarData.avatar || user?.avatar;
  const displayAvatar = (rawAvatar && rawAvatar !== "null" && rawAvatar !== "") ? imageUrl(rawAvatar) : null;
  
  // Get name from profileRes or avatarRes
  const profileData = profileRes?.data?.data || profileRes?.data?.user || profileRes?.data || {};
  
  let displayName = 'User';
  if (profileData.companyName) displayName = profileData.companyName;
  else if (profileData.name) displayName = profileData.name;
  else if (profileData.fullName) displayName = profileData.fullName;
  else if (profileData.firstName) displayName = `${profileData.firstName} ${profileData.lastName || ''}`.trim();
  else if (avatarData.companyName) displayName = avatarData.companyName; // Check avatar API response for companyName
  else if (avatarData.name) displayName = avatarData.name; // Check avatar API response for name
  else if (user?.name) displayName = user.name;
  else if (user?.email) displayName = user.email;

  // If the display name happens to be an email address, show only the part before the @
  if (displayName && displayName.includes('@')) {
    displayName = displayName.split('@')[0];
  }
  
  // Make sure the placeholder character logic doesn't crash if the name is somehow empty
  const placeholderChar = displayName && displayName.length > 0 ? displayName.charAt(0).toUpperCase() : 'U';

  const { openProfileEditModal } = useModal();
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'EN', name: t('english', 'English') },
    { code: 'DE', name: t('german', 'German') },
    { code: 'TR', name: t('turkish', 'Turkish') },
    { code: 'AR', name: t('arabic', 'Arabic') },
  ];

  useEffect(() => {
    setMounted(true);
    setSelectedLang(i18n.language?.toUpperCase() || 'EN');
  }, [i18n.language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t('home', 'Home'), path: '/' },
    { name: t('jobs', 'Jobs'), path: '/jobs' },
    { name: t('industries', 'Industries'), path: '/industries' },
    { name: t('companies', 'Companies'), path: '/companies' },
    { name: t('pricing', 'Pricing'), path: '/company_subscription' },
    { name: t('about', 'About'), path: '/about' },
    { name: t('resources', 'Resources'), path: '/resources' },
    { name: t('contactUs', 'Contact Us'), path: '/contact' },
  ];

  const toggleLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode.toLowerCase());
    setSelectedLang(langCode);
    setShowLangDropdown(false);
    // Persist via cookie for server-side awareness if needed
    document.cookie = `i18next=${langCode.toLowerCase()}; path=/; max-age=31536000`;
  };


  const isSolidPage = ['/privacy', '/terms', '/cookies', '/imprint', '/faq', '/accessibility'].includes(pathname);

  return (
    <header className={`${styles.header}${isSolidPage ? ` ${styles.solid}` : ''}`} suppressHydrationWarning>
      <div className={`container ${styles.navbar}`}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt={t('logo', 'Logo')} width={160} height={60} style={{ objectFit: 'contain' }} />
        </Link>

        <nav className={`${styles.navLinks} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {isMenuOpen && (
            <div className={styles.mobileMenuHeader}>
              <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
                <Image src="/logo.png" alt={t('logo', 'Logo')} width={140} height={50} style={{ objectFit: 'contain' }} />
              </Link>
              <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
          )}
          {navLinks.map((link) => {
            const isActive = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path);
            return (
              <Link
                key={link.name}
                href={link.path}
                className={isActive ? styles.active : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          {isMenuOpen && (
            <div className={styles.mobileActions}>
              {!mounted || !user ? (
                <div className={styles.mobileAuthButtons}>
                  <Link href="/auth?mode=login" onClick={() => setIsMenuOpen(false)}>
                    <button className={`btn ${styles.loginBtn}`}>{t('login', 'Login')}</button>
                  </Link>
                  <Link href="/auth?mode=register" onClick={() => setIsMenuOpen(false)}>
                    <button className={`btn ${styles.signupBtn}`}>{t('signUp', 'Sign Up')}</button>
                  </Link>
                </div>
              ) : (
                <div className={styles.mobileProfileInfo}>
                  <div className={styles.divider} />
                  <div className={styles.mobileUser}>
                    <UserAvatar 
                      src={displayAvatar} 
                      alt={displayName} 
                      size={40} 
                      className={styles.avatar} 
                      placeholderChar={placeholderChar} 
                    />
                    <span className={styles.userName}>{displayName}</span>
                  </div>
                  <Link href={user.role === 'company' ? "/company_profile" : "/user_profile"} className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>
                    <User size={18} /> {t('profile', 'Profile')}
                  </Link>
                  <Link href="/user_settings" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>
                    <Settings size={18} /> {t('settings', 'Settings')}
                  </Link>
                  <div className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={() => { logout(); setIsMenuOpen(false); }}>
                    <LogOut size={18} /> {t('logout', 'Logout')}
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>

        <div className={styles.navActions}>
          <div className={styles.languageSelectContainer} ref={langDropdownRef}>
            <div className={styles.languageSelect} onClick={() => setShowLangDropdown(!showLangDropdown)}>
              <span>{selectedLang}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: showLangDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {showLangDropdown && (
              <div className={styles.langDropdown}>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`${styles.langDropdownItem} ${selectedLang === lang.code ? styles.activeLang : ''}`}
                    onClick={() => toggleLanguage(lang.code)}

                  >
                    <span className={styles.langCode}>{lang.code}</span>
                    <span className={styles.langName}>{lang.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.desktopActions}>
            {!mounted || !user ? (
              <div className={styles.authButtons}>
                <Link href="/auth?mode=login">
                  <button className={`btn ${styles.loginBtn}`}>{t('login', 'Login')}</button>
                </Link>
                <Link href="/auth?mode=register">
                  <button className={`btn ${styles.signupBtn}`} style={{ padding: '8px 24px', fontSize: '14px' }}>{t('signUp', 'Sign Up')}</button>
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.roleSelect} onClick={() => login(user.role === 'user' ? 'company' : 'user')}>
                  <span>{user.role === 'user' ? 'Individual' : 'Company'}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                <div className={styles.profileContainer} onClick={() => setShowDropdown(!showDropdown)}>
                  <UserAvatar 
                    src={displayAvatar} 
                    alt={displayName} 
                    size={36} 
                    className={styles.avatar} 
                    placeholderChar={placeholderChar} 
                  />
                  <span className={styles.userName}>{displayName}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>

                  {showDropdown && (
                    <div className={styles.dropdown}>
                      <Link
                        href={user.role === 'company' ? "/company_profile" : "/user_profile"}
                        className={styles.dropdownItem}
                      >
                        <User size={16} /> {t('profile', 'Profile')}
                      </Link>
                      {user.role === 'company' && (
                        <div className={styles.dropdownItem} onClick={() => {
                          openProfileEditModal();
                          setShowDropdown(false);
                        }}>
                          <Edit3 size={16} /> {t('editProfile', 'Edit Profile')}
                        </div>
                      )}
                      <Link href="/user_settings" className={styles.dropdownItem}>
                        <Settings size={16} /> {t('settings', 'Settings')}
                      </Link>
                      <div className={styles.divider} />
                      <div className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={logout}>
                        <LogOut size={16} /> {t('logout', 'Logout')}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <button className={styles.hamburger} onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
