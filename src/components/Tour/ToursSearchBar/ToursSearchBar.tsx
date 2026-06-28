'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
    redirectTo?: string;
}

function scrollToTours() {
    const el = document.getElementById('tours-results');
    if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

export default function ToursSearchBar({ dict, redirectTo }: ToursSearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [season, setSeason] = useState(() => searchParams.get('season') ?? '');
    const [tourType, setTourType] = useState(() => searchParams.get('type') ?? '');

    const [activeField, setActiveField] = useState<ActiveField>(null);
    const [errors, setErrors] = useState<FormErrors>({ season: '', type: '' });
    const cardRef = useRef<HTMLDivElement>(null);

    const hasActiveFilters = !!(season || tourType);

    // Keep local state in sync if the URL params change externally
    useEffect(() => {
        setSeason(searchParams.get('season') ?? '');
        setTourType(searchParams.get('type') ?? '');
    }, [searchParams]);

    // Scroll to results when params are present (tours page only)
    useEffect(() => {
        if (redirectTo) return;
        if (searchParams.get('season') || searchParams.get('type')) {
            const t = setTimeout(scrollToTours, 120);
            return () => clearTimeout(t);
        }
    }, [searchParams, redirectTo]);

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
        const params = new URLSearchParams();
        params.set('season', season);
        params.set('type', tourType);

        if (redirectTo) {
            sessionStorage.setItem('scrollToTours', '1');
            router.push(`${redirectTo}?${params.toString()}`);
        } else {
            router.push(`?${params.toString()}`);
        }
    }

    function handleReset() {
        setSeason('');
        setTourType('');
        setErrors({ season: '', type: '' });
        setActiveField(null);
        if (!redirectTo) router.push('?');
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
                        // Seamless cascade transitions directly into opening the next menu option
                        setActiveField('type');
                    }}
                    value={season}
                    resetSignal={season === ''}
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
                    value={tourType}
                    resetSignal={tourType === ''}
                />
                <div className="tsb-divider" />
                <TourSearchBttn label={dict.button} onClick={handleSearch} />
            </div>

            <div className={`tsb-clear-row${hasActiveFilters ? ' tsb-clear-row--visible' : ''}`}>
                <button
                    className="tsb-clear-btn"
                    onClick={handleReset}
                    aria-label="Clear search filters"
                    type="button"
                    tabIndex={hasActiveFilters ? 0 : -1}
                >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Clear filters
                </button>
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