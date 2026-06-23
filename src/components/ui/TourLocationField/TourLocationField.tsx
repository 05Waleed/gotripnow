// gotripnow/src/components/ui/TourLocationField/TourLocationField.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import './TourLocationField.css';
import type { HeroDict } from '../../Hero/Hero';

type LocationDict = HeroDict['search']['location'];

interface SuggestionItem { city: string; country: string }

const SUGGESTIONS: SuggestionItem[] = [
    { city: 'Zurich', country: 'Switzerland' },
    { city: 'Geneva', country: 'Switzerland' },
    { city: 'Basel', country: 'Switzerland' },
];

interface TourLocationFieldProps {
    dict: LocationDict;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSelect: (city: string) => void;
}

function PinIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
    );
}

export default function TourLocationField({ dict, isOpen, onOpen, onClose, onSelect }: TourLocationFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = React.useState('');

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 0);
    }, [isOpen]);

    const filtered = SUGGESTIONS.filter(
        (item) =>
            item.city.toLowerCase().includes(query.toLowerCase()) ||
            item.country.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (city: string) => {
        setQuery(city);
        onSelect(city);
    };

    return (
        <div className="tlf-wrapper">
            <div className={`tlf-input-container${isOpen ? ' active' : ''}`}>
                <span className="tlf-field-icon"><PinIcon /></span>
                <span className="tlf-icon-sep" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={dict.placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={onOpen}
                />
            </div>

            {isOpen && (
                <div className="tlf-dropdown">
                    <div className="tlf-dropdown-title">{dict.dropdownTitle}</div>
                    <ul className="tlf-suggestions-list">
                        {filtered.length > 0 ? (
                            filtered.map((item, index) => (
                                <li
                                    key={index}
                                    className="tlf-suggestion-item"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleSelect(item.city)}
                                >
                                    <div className="tlf-icon-container">
                                        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                        </svg>
                                    </div>
                                    <div className="tlf-text-container">
                                        <span className="tlf-city">{item.city}</span>
                                        <span className="tlf-country">{item.country}</span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className="tlf-no-results">{dict.noResults}</div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}