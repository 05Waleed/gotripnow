"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./LanguageSelector.css";

// Supported languages configuration
const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
];

export default function LanguageSelector() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Extract the current language from the URL (e.g., "/de/tours" -> "de")
    const currentLang = pathname?.split("/")[1] || "en";
    const activeLang = languages.find((lang) => lang.code === currentLang) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Switches the locale prefix in the path smoothly
    const handleLanguageChange = (newLang: string) => {
        if (!pathname) return;

        const segments = pathname.split("/");
        segments[1] = newLang; // Replace old locale code with the new one
        const newPath = segments.join("/");

        setIsOpen(false);
        router.push(newPath);
    };

    return (
        <div className="lang-selector-container" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                className="lang-selector-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="lang-flag">{activeLang.flag}</span>
                <span className="lang-label">{activeLang.code.toUpperCase()}</span>
                <span className={`lang-arrow ${isOpen ? "open" : ""}`}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul className="lang-dropdown">
                    {languages.map((lang) => (
                        <li key={lang.code}>
                            <button
                                className={`lang-option ${lang.code === currentLang ? "active" : ""}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <span className="lang-flag">{lang.flag}</span>
                                <span>{lang.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}