import React from 'react';
import './SelectorField.css';

interface SelectorOption {
    value: string;
    label: string;
}

interface SelectorFieldProps {
    label: string;
    options: SelectorOption[];
    placeholder?: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
}

export default function SelectorField({ label, options, placeholder, icon, value, onChange, error }: SelectorFieldProps) {
    return (
        <div>
            <div className="selector-field-label">{label}</div>
            <div className={`selector-field-container ${error ? 'selector-field-container--error' : ''}`}>
                {icon && <div className={`selector-field-icon ${error ? 'selector-field-icon--error' : ''}`}>{icon}</div>}
                <select
                    value={value}
                    onChange={onChange}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${label}-error` : undefined}
                >
                    <option value="" disabled hidden>{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            {error && <p className="selector-field-error" id={`${label}-error`}>{error}</p>}
        </div>
    );
}