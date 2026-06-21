'use client'

import { useState, useRef, useCallback, useEffect } from 'react';
import './TourSection.css';
import TourCard from '../TourCard/TourCard';

interface TourData {
    id: number;
    image: string;
    title: string;
    location: string;
    duration: string;
    rating: string;
    reviewCount: number;
    price: string;
    ctaText?: string;
    ctaColor?: string;
}

const toursData: TourData[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
        title: 'Zürich City and Lake Tour',
        location: 'Altstadt & Lake Zürich',
        duration: '3 hours',
        rating: '4.8',
        reviewCount: 120,
        price: '65',
        ctaText: 'See Details',
        ctaColor: '#4a7fd4',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80',
        title: 'Jungfraujoch - Top of Europe Trip',
        location: 'Bernese Oberland',
        duration: 'Full Day',
        rating: '4.9',
        reviewCount: 210,
        price: '210',
        ctaText: 'See Details',
        ctaColor: '#cc2029',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80',
        title: 'Authentic Swiss Fondue Night',
        location: 'Traditional Chalet',
        duration: '2 hours',
        rating: '4.7',
        reviewCount: 85,
        price: '55',
        ctaText: 'See Details',
        ctaColor: '#cc2029',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=600&q=80',
        title: 'Rhine Falls Day Trip from Zürich',
        location: 'Schaffhausen',
        duration: '5 hours',
        rating: '4.6',
        reviewCount: 98,
        price: '79',
        ctaText: 'See Details',
        ctaColor: '#cc2029',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=600&q=80',
        title: 'Swiss Alps Helicopter Tour',
        location: 'Zürich Airport',
        duration: '1 hour',
        rating: '5.0',
        reviewCount: 42,
        price: '320',
        ctaText: 'See Details',
        ctaColor: '#cc2029',
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1559521783-1d1599583485?auto=format&fit=crop&w=600&q=80',
        title: 'Chocolate & Cheese Tasting Tour',
        location: 'Zürich Old Town',
        duration: '2.5 hours',
        rating: '4.5',
        reviewCount: 167,
        price: '45',
        ctaText: 'See Details',
        ctaColor: '#4a7fd4',
    },
];

function useCardsPerPage(): number {
    const getCount = () => {
        if (typeof window === 'undefined') return 3;
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    };

    const [count, setCount] = useState(getCount);

    useEffect(() => {
        const handler = () => setCount(getCount());
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return count;
}

export default function TourSection() {
    const cardsPerPage = useCardsPerPage();
    const totalPages = Math.ceil(toursData.length / cardsPerPage);

    const [activePage, setActivePage] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    // Clamp active page when cardsPerPage changes (e.g. window resize)
    useEffect(() => {
        setActivePage((p) => Math.min(p, totalPages - 1));
    }, [totalPages]);

    const goToPage = useCallback((page: number) => {
        if (!trackRef.current) return;
        isScrolling.current = true;
        setActivePage(page);
        trackRef.current.scrollTo({
            left: trackRef.current.offsetWidth * page,
            behavior: 'smooth',
        });
        setTimeout(() => { isScrolling.current = false; }, 500);
    }, []);

    const handleScroll = useCallback(() => {
        if (isScrolling.current || !trackRef.current) return;
        const page = Math.round(
            trackRef.current.scrollLeft / trackRef.current.offsetWidth
        );
        setActivePage(page);
    }, []);

    const handlePrev = () => goToPage(Math.max(activePage - 1, 0));
    const handleNext = () => goToPage(Math.min(activePage + 1, totalPages - 1));

    return (
        <section className="tours-section large-screen-max-width">
            <div className="tours-section-header">
                <h1 className="tours-section-title">Zürich Tours</h1>
                <div className="tours-section-nav">
                    <button
                        className="tours-nav-btn"
                        onClick={handlePrev}
                        disabled={activePage === 0}
                        aria-label="Previous page"
                    >
                        ‹
                    </button>
                    <button
                        className="tours-nav-btn"
                        onClick={handleNext}
                        disabled={activePage === totalPages - 1}
                        aria-label="Next page"
                    >
                        ›
                    </button>
                </div>
            </div>

            <div
                className="tours-track"
                ref={trackRef}
                onScroll={handleScroll}
            >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                    <div
                        className="tours-page"
                        key={pageIndex}
                        style={{ '--cards-per-page': cardsPerPage } as React.CSSProperties}
                    >
                        {toursData
                            .slice(pageIndex * cardsPerPage, pageIndex * cardsPerPage + cardsPerPage)
                            .map((tour) => (
                                <TourCard key={tour.id} {...tour} />
                            ))}
                    </div>
                ))}
            </div>

            <div className="tours-dots" role="tablist" aria-label="Tour pages">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={i === activePage}
                        aria-label={`Page ${i + 1}`}
                        className={`tours-dot${i === activePage ? ' tours-dot--active' : ''}`}
                        onClick={() => goToPage(i)}
                    />
                ))}
            </div>
        </section>
    );
}