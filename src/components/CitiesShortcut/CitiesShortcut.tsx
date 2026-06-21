import './CitiesShortcut.css';
import Image from 'next/image';

interface CityItem {
    id: number;
    name: string;
    img: string;
}

// Ensure the props interface explicitly reflects the exact shape passed from the page
interface CitiesShortcutProps {
    dict: {
        sectionTitle: string;
        cities: CityItem[];
    };
}

export default function CitiesShortcut({ dict }: CitiesShortcutProps) {
    // Graceful fallback in case dict or dict.cities is temporarily undefined during hydration
    if (!dict || !dict.cities) return null;

    return (
        <div className="cs-cities-shortcut-container large-screen-max-width">
            <h1 className="cs-cities-shortcut-section-title">{dict.sectionTitle}</h1>

            <div className="cs-cities-shortcut-wrapper">
                {dict.cities.map((city) => (
                    <div key={city.id} className="cs-city-card">
                        <div className="cs-city-image">
                            <Image
                                src={city.img}
                                alt={city.name}
                                width={180}
                                height={180}
                                className="cs-next-image"
                            />
                        </div>
                        <p className="cs-city-name">{city.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}