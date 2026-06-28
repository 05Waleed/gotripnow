'use client';
import React, { useEffect } from 'react';
import './TourTypeField.css';
import type { HeroDict } from '../../Hero/Hero';

type DurationDict = HeroDict['search']['duration'];

interface TourTypeFieldProps {
    dict: DurationDict;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSelect: (value: string) => void;
    value?: string;
    resetSignal?: boolean;
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
    dict, isOpen, onOpen, onClose, onSelect, value = '', resetSignal,
}: TourTypeFieldProps) {
    // ✅ No internal selectedValue state — fully driven by parent value prop
    const options = [
        { value: 'halfDay', ...dict.options.halfDay },
        { value: 'fullDay', ...dict.options.fullDay },
        { value: 'twoDays', ...dict.options.twoDays },
    ];

    const handleSelect = (val: string) => {
        onSelect(val);
        onClose();
    };

    const currentLabel = options.find((o) => o.value === value)?.label;

    return (
        <div className="ttf-wrapper">
            <div
                className={`ttf-input-container${isOpen ? ' active' : ''}`}
                onClick={isOpen ? onClose : onOpen}
            >
                <span className="ttf-field-icon"><ClockFieldIcon /></span>
                <span className="ttf-icon-sep" />
                <span className="ttf-field-text">
                    <span className={`ttf-display-value${!value ? ' placeholder' : ''}`}>
                        {/* ✅ Shows label from URL-initialised value immediately */}
                        {currentLabel || dict.placeholder}
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
                    <div className="ttf-dropdown-title">{dict.dropdownTitle}</div>
                    <ul className="ttf-options-list">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`ttf-option-item${value === option.value ? ' selected' : ''}`}
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