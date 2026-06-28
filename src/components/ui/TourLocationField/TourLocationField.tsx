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
    /** When true the field clears its internal selection (driven by parent reset) */
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
    dict,
    isOpen,
    onOpen,
    onClose,
    onSelect,
    resetSignal,
}: TourLocationFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selected, setSelected] = React.useState('');
    const [query, setQuery] = React.useState('');

    // Clear internal state when parent signals a reset
    useEffect(() => {
        if (resetSignal) {
            setSelected('');
            setQuery('');
        }
    }, [resetSignal]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 0);
    }, [isOpen]);

    const filtered = dict.suggestions.filter(
        (item) =>
            item.season.toLowerCase().includes(query.toLowerCase()) ||
            item.period.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (item: SuggestionItem) => {
        setSelected(item.season);
        setQuery('');
        onSelect(item.season);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setSelected('');
        if (!isOpen) onOpen();
    };

    return (
        <div className="tlf-wrapper">
            <div
                className={`tlf-input-container${isOpen ? ' active' : ''}`}
                onClick={onOpen}
            >
                <span className="tlf-field-icon"><CalendarIcon /></span>
                <span className="tlf-icon-sep" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={dict.placeholder}
                    value={isOpen ? query : selected}
                    onChange={handleInputChange}
                    style={{ cursor: 'pointer' }}
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
                                    className={`tlf-suggestion-item${selected === item.season ? ' selected' : ''}`}
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