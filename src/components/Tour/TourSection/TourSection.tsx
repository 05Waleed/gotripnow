'use client'

import { useState, useRef, useCallback, useEffect } from 'react';
import './TourSection.css';
import TourCard, { TourData } from '../TourCard/TourCard';

interface TourSectionProps {
    ui: {
        sectionTitle: string;
        buttons: {
            seeDetails: string;
            previous: string;
            next: string;
        };
        labels: {
            priceFrom: string;
            reviews: string;
            currency: string;
        };
    };
    tours: TourData[];
    layout?: 'slider' | 'grid';
}

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

export default function TourSection({ ui, tours, layout = 'slider' }: TourSectionProps) {
    const cardsPerPage = useCardsPerPage();
    const totalPages = Math.ceil(tours.length / cardsPerPage);

    const [activePage, setActivePage] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

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

    const cardUiData = {
        seeDetails: ui.buttons.seeDetails,
        priceFrom: ui.labels.priceFrom,
        reviews: ui.labels.reviews,
        currency: ui.labels.currency
    };

    return (
        /* We inject a layout class to let our CSS handle the responsive override */
        <section className={`tours-section large-screen-max-width tours-layout-${layout}`}>
            <div className="tours-section-header">
                <h2 className="tours-section-title">{ui.sectionTitle}</h2>
                <div className="tours-section-nav">
                    <button
                        className="tours-nav-btn"
                        onClick={handlePrev}
                        disabled={activePage === 0}
                        aria-label={ui.buttons.previous}
                    >
                        ‹
                    </button>
                    <button
                        className="tours-nav-btn"
                        onClick={handleNext}
                        disabled={activePage === totalPages - 1}
                        aria-label={ui.buttons.next}
                    >
                        ›
                    </button>
                </div>
            </div>

            <div className="tours-track" ref={trackRef} onScroll={handleScroll}>
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                    <div
                        className="tours-page"
                        key={pageIndex}
                        style={{ '--cards-per-page': cardsPerPage } as React.CSSProperties}
                    >
                        {tours
                            .slice(pageIndex * cardsPerPage, pageIndex * cardsPerPage + cardsPerPage)
                            .map((tour) => (
                                <TourCard
                                    key={tour.id}
                                    {...tour}
                                    ui={cardUiData}
                                />
                            ))}
                    </div>
                ))}
            </div>

            <div className="tours-dots" role="tablist" aria-label={`${ui.sectionTitle} pages`}>
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