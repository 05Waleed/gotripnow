'use client';
import React, { useEffect, useRef } from 'react';
import './TourLocationField.css';

interface SuggestionItem { season: string; period: string }

interface SeasonDict {
    placeholder: string;
    dropdownTitle: string;
    noResults: string;
    errorRequired: string;
    suggestions: SuggestionItem[];
}

interface TourLocationFieldProps {
    dict: SeasonDict;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSelect: (season: string) => void;
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
        </svg>
    );
}

export default function TourLocationField({ dict, isOpen, onOpen, onClose, onSelect }: TourLocationFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = React.useState('');

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 0);
    }, [isOpen]);

    const filtered = dict.suggestions.filter((item) =>
        item.season.toLowerCase().includes(query.toLowerCase()) ||
        item.period.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (season: string) => {
        setQuery(season);
        onSelect(season);
    };

    return (
        <div className="tlf-wrapper">
            <div className={`tlf-input-container${isOpen ? ' active' : ''}`}>
                <span className="tlf-field-icon"><CalendarIcon /></span>
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
                                    onClick={() => handleSelect(item.season)}
                                >
                                    <div className="tlf-icon-container">
                                        <CalendarIcon />
                                    </div>
                                    <div className="tlf-text-container">
                                        <span className="tlf-city">{item.season}</span>
                                        <span className="tlf-country">{item.period}</span>
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