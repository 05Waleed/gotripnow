'use client';

import React from 'react';
import './TourTypeField.css';

interface TourTypeOption {
    value: string;
    label: string;
    description: string;
}

const TOUR_TYPES: TourTypeOption[] = [
    { value: 'half-day', label: 'Half Day', description: '4–6 hours' },
    { value: 'full-day', label: 'Full Day', description: '8–10 hours' },
    { value: 'two-days', label: 'Two Days', description: '16–20 hours' },
];

interface TourTypeFieldProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSelect: (value: string) => void;
}

function ClockFieldIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
        </svg>
    );
}

function ClockDropdownIcon() {
    return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
        </svg>
    );
}

export default function TourTypeField({
    isOpen,
    onOpen,
    onClose,
    onSelect,
}: TourTypeFieldProps) {
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onSelect(value);
    };

    const currentLabel = TOUR_TYPES.find((o) => o.value === selectedValue)?.label;

    return (
        <div className="ttf-wrapper">
            <div
                className={`ttf-input-container${isOpen ? ' active' : ''}`}
                onClick={isOpen ? onClose : onOpen}
            >
                <span className="ttf-field-icon"><ClockFieldIcon /></span>
                <span className="ttf-icon-sep" />
                <span className="ttf-field-text">
                    <span className={`ttf-display-value${!selectedValue ? ' placeholder' : ''}`}>
                        {currentLabel || 'Select tour duration'}
                    </span>
                </span>
                <div className={`ttf-chevron${isOpen ? ' rotated' : ''}`}>
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="ttf-dropdown">
                    <div className="ttf-dropdown-title">Duration</div>
                    <ul className="ttf-options-list">
                        {TOUR_TYPES.map((option) => (
                            <li
                                key={option.value}
                                className={`ttf-option-item${selectedValue === option.value ? ' selected' : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                <div className="ttf-icon-container"><ClockDropdownIcon /></div>
                                <div className="ttf-text-container">
                                    <span className="ttf-label">{option.label}</span>
                                    <span className="ttf-description">{option.description}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}