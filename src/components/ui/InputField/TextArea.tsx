import React from 'react';
import './TextArea.css';

interface TextAreaProps {
    label: string;
    placeholder: string;
    icon?: React.ReactNode;
    rows?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}

export default function TextArea({ label, placeholder, icon, rows = 5, value, onChange, error }: TextAreaProps) {
    return (
        <div>
            <div className="textarea-field-label">{label}</div>
            <div className={`textarea-field-container ${error ? 'textarea-field-container--error' : ''}`}>
                {icon && <div className={`textarea-field-icon ${error ? 'textarea-field-icon--error' : ''}`}>{icon}</div>}
                <textarea
                    placeholder={placeholder}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    style={{ paddingLeft: icon ? '0.75rem' : '1rem' }}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${label}-error` : undefined}
                />
            </div>
            {error && <p className="textarea-field-error" id={`${label}-error`}>{error}</p>}
        </div>
    );
}