'use client';

import React, { useState, useEffect, useRef } from 'react';
import './ToursSearchBar.css';
import TourLocationField from '@/components/ui/TourLocationField/TourLocationField';
import TourTypeField from '@/components/ui/TourTypeField/TourTypeField';
import TourSearchBttn from '@/components/ui/TourSearchBttn/TourSearchBttn';

interface SearchDict {
    button: string;
    season: {
        placeholder: string;
        dropdownTitle: string;
        noResults: string;
        errorRequired: string;
        suggestions: { season: string; period: string }[];
    };
    duration: {
        placeholder: string;
        dropdownTitle: string;
        errorRequired: string;
        options: {
            halfDay: { label: string; description: string };
            fullDay: { label: string; description: string };
            twoDays: { label: string; description: string };
        };
    };
    travelers: {
        triggerSingular: string;
        triggerPlural: string;
        dropdownTitle: string;
        adults: { label: string; description: string };
        children: { label: string; description: string };
        done: string;
    };
}

type ActiveField = 'season' | 'type' | 'passenger' | null;
interface FormErrors { season: string; type: string }

interface ToursSearchBarProps {
    dict: SearchDict;
}

export default function ToursSearchBar({ dict }: ToursSearchBarProps) {
    const [activeField, setActiveField] = useState<ActiveField>(null);
    const [season, setSeason] = useState('');
    const [tourType, setTourType] = useState('');
    const [errors, setErrors] = useState<FormErrors>({ season: '', type: '' });
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setActiveField(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleSearch() {
        const newErrors: FormErrors = { season: '', type: '' };
        if (!season.trim()) newErrors.season = dict.season.errorRequired;
        if (!tourType) newErrors.type = dict.duration.errorRequired;
        setErrors(newErrors);
        if (newErrors.season || newErrors.type) return;
        setActiveField(null);
        console.log('Search:', { season, tourType });
    }

    return (
        <div className="tsb-wrapper">
            <div className="tsb-card" ref={cardRef}>
                <TourLocationField
                    dict={dict.season}
                    isOpen={activeField === 'season'}
                    onOpen={() => setActiveField('season')}
                    onClose={() => setActiveField(null)}
                    onSelect={(value) => {
                        setSeason(value);
                        setErrors((e) => ({ ...e, season: '' }));
                        setActiveField('type');
                    }}
                />
                <div className="tsb-divider" />
                <TourTypeField
                    dict={dict.duration}
                    isOpen={activeField === 'type'}
                    onOpen={() => setActiveField('type')}
                    onClose={() => setActiveField(null)}
                    onSelect={(value) => {
                        setTourType(value);
                        setErrors((e) => ({ ...e, type: '' }));
                        setActiveField('passenger');
                    }}
                />
                <div className="tsb-divider" />
                <TourSearchBttn label={dict.button} onClick={handleSearch} />
            </div>

            <div className="tsb-errors" role="alert" aria-live="polite">
                {errors.season && (
                    <span className="tsb-error-item">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        {errors.season}
                    </span>
                )}
                {errors.type && (
                    <span className="tsb-error-item">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        {errors.type}
                    </span>
                )}
            </div>
        </div>
    );
}