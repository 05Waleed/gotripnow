import './Hero.css';
import Image from 'next/image';
import ToursSearchBar from '../ToursSearchBar/ToursSearchBar';

interface HeroProps {
    dict: {
        title: string;
        subtitle: string;
        placeholder: string;
        button: string;
    };
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
                {/* Text block */}
                <div className="hero-text-block">
                    <h1 className="hero-content-title">{dict.title}</h1>
                    <h2 className="hero-content-subtitle">{dict.subtitle}</h2>
                </div>

                {/* Search bar — wrapped to constrain max-width */}
                <div className="hero-searchbar-wrapper">
                    <ToursSearchBar />
                </div>
            </div>
        </section>
    );
}