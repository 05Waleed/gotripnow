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

export function useCurrentLanguage(): Language {
    const pathname = usePathname();
    const currentCode = pathname?.split("/")[1] || "en";
    return languages.find((lang) => lang.code === currentCode) ?? languages[0];
}

interface LanguageSelectorProps {
    onSelect?: () => void;
}

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