'use client';

import React, { useEffect, useRef } from 'react';
import './TourLocationField.css';

interface SuggestionItem {
    city: string;
    country: string;
}

const SUGGESTIONS: SuggestionItem[] = [
    { city: 'Zurich',      country: 'Switzerland' },
    { city: 'Lucerne',     country: 'Switzerland' },
    { city: 'Interlaken',  country: 'Switzerland' },
    { city: 'Geneva',      country: 'Switzerland' },
    { city: 'Bern',        country: 'Switzerland' },
    { city: 'Zermatt',     country: 'Switzerland' },
    { city: 'Basel',       country: 'Switzerland' },
];

interface TourLocationFieldProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSelect: () => void;
}

function PinIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
    );
}

export default function TourLocationField({
    isOpen,
    onOpen,
    onClose,
    onSelect,
}: TourLocationFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = React.useState('');

    // Auto-focus the input when this field becomes active
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [isOpen]);

    const filteredSuggestions = SUGGESTIONS.filter(
        (item) =>
            item.city.toLowerCase().includes(query.toLowerCase()) ||
            item.country.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (city: string) => {
        setQuery(city);
        onSelect(); // advance to next field
    };

    return (
        <div className="tlf-wrapper">
            <div className={`tlf-input-container${isOpen ? ' active' : ''}`}>
                {/* Left-side location icon */}
                <span className="tlf-field-icon">
                    <PinIcon />
                </span>
                <span className="tlf-icon-sep" />

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search City"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={onOpen}
                />
            </div>

            {isOpen && (
                <div className="tlf-dropdown">
                    <div className="tlf-dropdown-title">Suggestions</div>
                    <ul className="tlf-suggestions-list">
                        {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((item, index) => (
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
                            <div className="tlf-no-results">No destinations found</div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}