'use client'
import './TourHero.css'
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
}

export default function TourHero({ dict }: TourHeroProps) {
    return (
        <div className='tour-hero-wrapper'>
            <div className='tour-hero large-screen-max-width'>
                <div className="tour-hero-text">
                    <h1>{dict.title}</h1>
                    <h2>{dict.subtitle}</h2>
                </div>
                <ToursSearchBar dict={dict.search} />
            </div>
        </div>
    )
}