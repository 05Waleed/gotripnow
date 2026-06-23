import './TourHero.css'
import ToursSearchBar from '../ToursSearchBar/ToursSearchBar';

export interface TourHeroDict {
    search: {
        button: string;
        location: {
            placeholder: string;
            dropdownTitle: string;
            noResults: string;
            errorRequired: string;
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
        // Add this key to match the structure expected by ToursSearchBar
        travelers: {
            triggerSingular: string;
            triggerPlural: string;
            dropdownTitle: string;
            adults: { label: string; description: string };
            children: { label: string; description: string };
            done: string;
        };
    }
}

interface TourHeroProps {
    dict: TourHeroDict;
}

export default function TourHero({ dict }: TourHeroProps) {
    return (
        <div className='tour-hero-wrapper'>
            <div className='tour-hero large-screen-max-width'>
                <div className="tour-hero-text">
                    <h1>All Switzerland tours</h1>
                    <h2>Private, guided day trips departing from Zürich, Basel and Geneva.</h2>
                </div>
                <ToursSearchBar dict={dict.search} />
            </div>
        </div>
    )
}