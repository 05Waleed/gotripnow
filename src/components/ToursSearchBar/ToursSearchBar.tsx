'use client';

import React, { useState, useEffect, useRef } from 'react';
import './ToursSearchBar.css';
import TourLocationField from '../ui/TourLocationField/TourLocationField';
import TourTypeField from '../ui/TourTypeField/TourTypeField';
import TourPassengerField from '../ui/TourPassengerField/TourPassengerField';
import TourSearchBttn from '../ui/TourSearchBttn/TourSearchBttn';

type ActiveField = 'location' | 'type' | 'passenger' | null;

export default function ToursSearchBar() {
    const [activeField, setActiveField] = useState<ActiveField>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Close all dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setActiveField(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="tsb-card" ref={cardRef}>
            {/* Location — auto-advances to Duration on select */}
            <TourLocationField
                isOpen={activeField === 'location'}
                onOpen={() => setActiveField('location')}
                onClose={() => setActiveField(null)}
                onSelect={() => setActiveField('type')}
            />

            <div className="tsb-divider" />

            {/* Duration — auto-advances to Travelers on select */}
            <TourTypeField
                isOpen={activeField === 'type'}
                onOpen={() => setActiveField('type')}
                onClose={() => setActiveField(null)}
                onSelect={() => setActiveField('passenger')}
            />

            <div className="tsb-divider" />

            {/* Travelers — closes on done */}
            <TourPassengerField
                isOpen={activeField === 'passenger'}
                onOpen={() => setActiveField('passenger')}
                onClose={() => setActiveField(null)}
            />

            {/* Search button — right end of card */}
            <TourSearchBttn onClick={() => setActiveField(null)} />
        </div>
    );
}