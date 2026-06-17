"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LanguageCurrencySelector from './Languagecurrencyselector';
import './Navbar.css';

interface NavbarProps {
  dict: {
    home: string;
    tours: string;
    about: string;
    contact: string;
    planTour: string;
  };
}

export default function Navbar({ dict }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Extract the current language prefix from the URL path (defaults to "en")
  const currentLang = pathname?.split("/")[1] || "en";

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close drawer on Escape, and automatically if the viewport grows back to desktop size
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    function handleResize() {
      if (window.innerWidth > 968) setIsMenuOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // Helper to determine if a given href matches the current path
  const isActive = (href: string) => {
    if (!pathname) return false;
    const normalizedPath = pathname.replace(/\/$/, "") || "/";
    const normalizedHref = href.replace(/\/$/, "") || "/";

    if (normalizedHref === `/${currentLang}`) {
      return normalizedPath === normalizedHref;
    }
    return normalizedPath === normalizedHref || normalizedPath.startsWith(`${normalizedHref}/`);
  };

  const navItems = [
    { href: `/${currentLang}`, label: dict.home },
    { href: `/${currentLang}/tours`, label: dict.tours },
    { href: `/${currentLang}/about`, label: dict.about },
    { href: `/${currentLang}/contact`, label: dict.contact },
  ];

  return (
    <nav className='nav-bar-container'>
      <div className='nav-bar-items large-screen-max-width'>
        {/* Logo wrapping back to Home */}
        <Link href={`/${currentLang}`} className='nav-bar-logo' onClick={() => setIsMenuOpen(false)}>
          GoTrip
          <br />
          <span className='nav-bar-logo-black'>Now</span>
        </Link>

        {/* Desktop Navigation Links — hidden below 968px */}
        <ul className='nav-bar-bttns'>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={`/${currentLang}/plan-tour`}
              className={`nav-cta-btn ${isActive(`/${currentLang}/plan-tour`) ? 'active' : ''}`}
            >
              {dict.planTour}
            </Link>
          </li>
        </ul>

        <div className="nav-bar-right">
          <div className="nav-bar-locale-group">
            <LanguageCurrencySelector />
          </div>

          {/* Hamburger toggle — only visible below 968px */}
          <button
            type="button"
            className={`nav-burger-btn ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav-drawer"
          >
            <span className="nav-burger-line" />
            <span className="nav-burger-line" />
            <span className="nav-burger-line" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <>
          <div className="nav-mobile-backdrop" onClick={() => setIsMenuOpen(false)} />
          <div
            className="nav-mobile-drawer"
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {/* Repeats the same logo inside the drawer, since the drawer
                covers the top bar's logo on full-width mobile screens */}
            <div className="nav-mobile-header">
              <Link
                href={`/${currentLang}`}
                className="nav-bar-logo"
                onClick={() => setIsMenuOpen(false)}
              >
                GoTrip
                <br />
                <span className="nav-bar-logo-black">Now</span>
              </Link>

              <button
                type="button"
                className="nav-mobile-close-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <ul className="nav-mobile-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-mobile-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/${currentLang}/plan-tour`}
              className="nav-cta-btn nav-mobile-cta"
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.planTour}
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}