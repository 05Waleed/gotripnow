// gotripnow/src/components/Hero/Hero.tsx
import './Hero.css';
import Image from 'next/image';
import ToursSearchBar from '../ToursSearchBar/ToursSearchBar';

export interface HeroDict {
    hero: { title: string; subtitle: string };
    search: {
        button: string;
        location: { placeholder: string; dropdownTitle: string; noResults: string; errorRequired: string };
        duration: {
            placeholder: string; dropdownTitle: string; errorRequired: string;
            options: {
                halfDay: { label: string; description: string };
                fullDay: { label: string; description: string };
                twoDays: { label: string; description: string };
            };
        };
        travelers: {
            triggerSingular: string; triggerPlural: string; dropdownTitle: string; done: string;
            adults: { label: string; description: string };
            children: { label: string; description: string };
        };
    };
}

interface HeroProps {
    dict: HeroDict;
}

export default function Hero({ dict }: HeroProps) {
    return (
        <section className="hero-container">
            <Image
                src="/assets/hero-img-1.jpg"
                alt="Hero background"
                fill
                priority
                sizes="100vw"
                className="hero-bg-image"
            />
            <div className="hero-content">
                <div className="hero-text-block">
                    <h1 className="hero-content-title">{dict.hero.title}</h1>
                    <h2 className="hero-content-subtitle">{dict.hero.subtitle}</h2>
                </div>
                <div className="hero-searchbar-wrapper">
                    <ToursSearchBar dict={dict.search} />
                </div>
            </div>
        </section>
    );
}