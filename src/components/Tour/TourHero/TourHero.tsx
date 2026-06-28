'use client';
import { useEffect } from 'react';
import './TourHero.css';
import ToursSearchBar from '../ToursSearchBar/ToursSearchBar';

export interface TourHeroDict {
    title: string;
    subtitle: string;
    search: {
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
            done: string;
            adults: { label: string; description: string };
            children: { label: string; description: string };
        };
    };
}

interface TourHeroProps {
    dict: TourHeroDict;
    redirectTo?: string;
}

export default function TourHero({ dict, redirectTo }: TourHeroProps) {
    // When arriving from the home page search, sessionStorage has a flag.
    // Wait for the page to settle then scroll to the results and clear the flag.
    useEffect(() => {
        if (sessionStorage.getItem('scrollToTours') !== '1') return;
        sessionStorage.removeItem('scrollToTours');

        const t = setTimeout(() => {
            const el = document.getElementById('tours-results');
            if (el) {
                const offset = 0;
                const top = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }, 200);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="tour-hero-wrapper">
            <div className="tour-hero large-screen-max-width">
                <div className="tour-hero-text">
                    <h1>{dict.title}</h1>
                    <h2>{dict.subtitle}</h2>
                </div>
                <ToursSearchBar dict={dict.search} redirectTo={redirectTo} />
            </div>
        </div>
    );
}