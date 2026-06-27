import React from 'react';
import './InputField.css';

interface InputFieldProps {
    type: string;
    placeholder: string;
    label: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export default function InputField({ type, placeholder, label, icon, value, onChange, error }: InputFieldProps) {
    return (
        <div>
            <div className="input-field-label">{label}</div>
            <div className={`input-field-container ${error ? 'input-field-container--error' : ''}`}>
                {icon && <div className={`input-field-icon ${error ? 'input-field-icon--error' : ''}`}>{icon}</div>}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${label}-error` : undefined}
                />
            </div>
            {error && <p className="input-field-error" id={`${label}-error`}>{error}</p>}
        </div>
    );
}