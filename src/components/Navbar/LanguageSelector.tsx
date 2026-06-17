"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import "./LanguageSelector.css";

export interface Language {
    code: string;
    label: string;
}

export const languages: Language[] = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" },
];

/**
 * Reads the active language out of the URL (first path segment).
 * Exported so other components (e.g. the trigger button) can show
 * the current language without re-deriving the logic themselves.
 */
export function useCurrentLanguage(): Language {
    const pathname = usePathname();
    const currentCode = pathname?.split("/")[1] || "en";
    return languages.find((lang) => lang.code === currentCode) ?? languages[0];
}

interface LanguageSelectorProps {
    /** Called after a language is picked, so a parent modal/dropdown can close itself. */
    onSelect?: () => void;
}

/**
 * Renders only the grid of language options. Has no button or popup of its
 * own on purpose — it's meant to be dropped into a tab panel (see
 * LanguageCurrencySelector) so the same list can be reused anywhere.
 */
export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
    const pathname = usePathname();
    const router = useRouter();
    const currentCode = pathname?.split("/")[1] || "en";

    const handleSelect = (newLang: string) => {
        if (!pathname) return;
        const segments = pathname.split("/");
        segments[1] = newLang;
        router.push(segments.join("/"));
        onSelect?.();
    };

    return (
        <div className="lang-grid">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    type="button"
                    className={`lang-option ${lang.code === currentCode ? "active" : ""}`}
                    onClick={() => handleSelect(lang.code)}
                >
                    <span>{lang.label}</span>
                    {lang.code === currentCode && <span className="lang-check">✓</span>}
                </button>
            ))}
        </div>
    );
}