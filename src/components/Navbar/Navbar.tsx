"use client";
import React from 'react';
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
  // Extract the current language prefix from the URL path (defaults to "en")
  const currentLang = pathname?.split("/")[1] || "en";

  // Helper to determine if a given href matches the current path
  const isActive = (href: string) => {
    if (!pathname) return false;
    const normalizedPath = pathname.replace(/\/$/, "") || "/";
    const normalizedHref = href.replace(/\/$/, "") || "/";

    // Home link should only be active on an exact match
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
        <Link href={`/${currentLang}`} className='nav-bar-logo'>
          GoTrip
          <br />
          <span className='nav-bar-logo-black'>Now</span>
        </Link>

        {/* Dynamic Navigation Links */}
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

          {/* CTA Button Item */}
          <li>
            <Link
              href={`/${currentLang}/plan-tour`}
              className={`nav-cta-btn ${isActive(`/${currentLang}/plan-tour`) ? 'active' : ''}`}
            >
              {dict.planTour}
            </Link>
          </li>
        </ul>

        <div className="nav-bar-locale-group">
          <LanguageCurrencySelector />
        </div>
      </div>
    </nav>
  );
}