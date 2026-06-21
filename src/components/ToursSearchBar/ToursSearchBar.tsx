'use client';

import React, { useState, useEffect, useRef } from 'react';
import './ToursSearchBar.css';
import TourLocationField from '../ui/TourLocationField/TourLocationField';
import TourTypeField from '../ui/TourTypeField/TourTypeField';
import TourPassengerField from '../ui/TourPassengerField/TourPassengerField';
import TourSearchBttn from '../ui/TourSearchBttn/TourSearchBttn';

type ActiveField = 'location' | 'type' | 'passenger' | null;

interface FormErrors {
    location: string;
    type: string;
}

export default function ToursSearchBar() {
    const [activeField, setActiveField] = useState<ActiveField>(null);
    const [location, setLocation] = useState('');
    const [tourType, setTourType] = useState('');
    const [errors, setErrors] = useState<FormErrors>({ location: '', type: '' });
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
        const newErrors: FormErrors = { location: '', type: '' };

        if (!location.trim()) newErrors.location = 'Please select a city';
        if (!tourType) newErrors.type = 'Please select a tour duration';

        setErrors(newErrors);

        if (newErrors.location || newErrors.type) return;

        setActiveField(null);
        // → your search / router call here
        console.log('Search:', { location, tourType });
    }

    return (
        <div className="tsb-wrapper">
            <div className="tsb-card" ref={cardRef}>
                <TourLocationField
                    isOpen={activeField === 'location'}
                    onOpen={() => setActiveField('location')}
                    onClose={() => setActiveField(null)}
                    onSelect={(city) => {
                        setLocation(city);
                        setErrors((e) => ({ ...e, location: '' }));
                        setActiveField('type');
                    }}
                />

                <div className="tsb-divider" />

                <TourTypeField
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

                <TourPassengerField
                    isOpen={activeField === 'passenger'}
                    onOpen={() => setActiveField('passenger')}
                    onClose={() => setActiveField(null)}
                />

                <TourSearchBttn onClick={handleSearch} />
            </div>

            {/* Always rendered — height reserved — no layout shift */}
            <div className="tsb-errors" role="alert" aria-live="polite">
                {errors.location && (
                    <span className="tsb-error-item">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        {errors.location}
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