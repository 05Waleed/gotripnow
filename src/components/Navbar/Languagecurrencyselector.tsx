"use client";
import React, { useEffect, useRef, useState } from "react";
import LanguageSelector, { useCurrentLanguage } from "./LanguageSelector";
import CurrencySelector from "./CurrencySelector";
import './Languagecurrencyselector.css';

type Tab = "language" | "currency";

export default function LanguageCurrencySelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("language");
    const [currentCurrency, setCurrentCurrency] = useState("CHF");

    const containerRef = useRef<HTMLDivElement>(null);
    const currentLanguage = useCurrentLanguage();

    const close = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                close();
            }
        }
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") close();
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div className="lc-selector" ref={containerRef}>
            <button
                type="button"
                className={`lc-trigger-btn ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
            >
                <svg className="lc-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                </svg>
                <span className="lc-trigger-label">
                    {currentLanguage.code.toUpperCase()}/{currentCurrency}
                </span>
            </button>

            {isOpen && (
                <>
                    <div className="lc-backdrop" onClick={close} />

                    <div className="lc-modal" role="dialog" aria-modal="true" aria-label="Language and currency settings">
                        <button type="button" className="lc-close-btn" onClick={close} aria-label="Close">
                            ✕
                        </button>

                        <div className="lc-tabs" role="tablist">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === "language"}
                                className={`lc-tab ${activeTab === "language" ? "active" : ""}`}
                                onClick={() => setActiveTab("language")}
                            >
                                <svg className="lc-tab-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                                </svg>
                                Language
                            </button>

                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === "currency"}
                                className={`lc-tab ${activeTab === "currency" ? "active" : ""}`}
                                onClick={() => setActiveTab("currency")}
                            >
                                <svg className="lc-tab-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="6" x2="12" y2="18" />
                                    <path d="M10 9a2.5 2.5 0 0 1 2.5-2.5h0A2.5 2.5 0 0 1 15 9a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 0 9 14a2.5 2.5 0 0 0 2.5 2.5h0A2.5 2.5 0 0 0 14 14" />
                                </svg>
                                Currency
                            </button>
                        </div>

                        <div className="lc-tab-content">
                            {activeTab === "language" ? (
                                <LanguageSelector onSelect={close} />
                            ) : (
                                <CurrencySelector
                                    value={currentCurrency}
                                    onChange={(code) => {
                                        setCurrentCurrency(code);
                                        close();
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}