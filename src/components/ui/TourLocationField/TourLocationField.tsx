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
    value?: string;
    resetSignal?: boolean;
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
        </svg>
    );
}

export default function TourLocationField({
    dict, isOpen, onOpen, onClose, onSelect, value = ''
}: TourLocationFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 0);
    }, [isOpen]);

    const handleSelect = (item: SuggestionItem) => {
        onSelect(item.season);
        onClose();
    };

    return (
        <div className="tlf-wrapper">
            <div className={`tlf-input-container${isOpen ? ' active' : ''}`} onClick={isOpen ? onClose : onOpen}>
                <span className="tlf-field-icon"><CalendarIcon /></span>
                <span className="tlf-icon-sep" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={dict.placeholder}
                    value={value}
                    readOnly
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isOpen) onOpen();
                    }}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            {isOpen && (
                <div className="tlf-dropdown">
                    <div className="tlf-dropdown-title">{dict.dropdownTitle}</div>
                    <ul className="tlf-suggestions-list">
                        {dict.suggestions.length > 0 ? (
                            dict.suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    className={`tlf-suggestion-item${value === item.season ? ' selected' : ''}`}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleSelect(item)}
                                >
                                    <div className="tlf-icon-container"><CalendarIcon /></div>
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