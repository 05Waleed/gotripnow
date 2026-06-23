import Image from 'next/image'
import './Aboutbento.css'

export interface AboutBentoDict {
    since: string;
    tagline: string;
    travellers_count: string;
    travellers_label: string;
    rating_value: string;
    rating_label: string;
    guides_count: string;
    guides_label: string;
    caption_team: string;
    caption_lake: string;
    alt_team: string;
    alt_lake: string;
}

interface AboutBentoProps {
    dict: AboutBentoDict;
}

export default function AboutBento({ dict }: AboutBentoProps) {
    return (
        <>
            {/* Desktop: bento grid */}
            <div className="about-bento">
                <div className="about-bento-hero-card">
                    <span className="about-bento-since">{dict.since}</span>
                    <p className="about-bento-tagline">{dict.tagline}</p>
                </div>

                <div className="about-bento-stat-card">
                    <span className="about-bento-stat-number">{dict.travellers_count}</span>
                    <span className="about-bento-stat-label">{dict.travellers_label}</span>
                </div>

                <div className="about-bento-stat-card">
                    <span className="about-bento-stat-number">{dict.rating_value}</span>
                    <span className="about-bento-stat-label">{dict.rating_label}</span>
                </div>

                <div className="about-bento-photo-card about-bento-photo-card--wide">
                    <Image
                        src="/assets/city-img-1.jpg"
                        alt={dict.alt_team}
                        fill
                        className="about-bento-photo-img"
                    />
                    <span className="about-bento-photo-caption">{dict.caption_team}</span>
                </div>

                <div className="about-bento-stat-card about-bento-stat-card--accent">
                    <span className="about-bento-stat-number about-bento-stat-number--red">{dict.guides_count}</span>
                    <span className="about-bento-stat-label">{dict.guides_label}</span>
                </div>

                <div className="about-bento-photo-card">
                    <Image
                        src="/assets/city-img-1.jpg"
                        alt={dict.alt_lake}
                        fill
                        className="about-bento-photo-img"
                    />
                    <span className="about-bento-photo-caption">{dict.caption_lake}</span>
                </div>
            </div>

            {/* Mobile: scroll-stacking cards */}
            <div className="about-bento-stack">
                <div className="about-bento-stack-item" style={{ '--stack-index': 0 } as React.CSSProperties}>
                    <div className="about-bento-hero-card">
                        <span className="about-bento-since">{dict.since}</span>
                        <p className="about-bento-tagline">{dict.tagline}</p>
                    </div>
                </div>

                <div className="about-bento-stack-item" style={{ '--stack-index': 1 } as React.CSSProperties}>
                    <div className="about-bento-stat-card">
                        <span className="about-bento-stat-number">{dict.travellers_count}</span>
                        <span className="about-bento-stat-label">{dict.travellers_label}</span>
                    </div>
                </div>

                <div className="about-bento-stack-item" style={{ '--stack-index': 2 } as React.CSSProperties}>
                    <div className="about-bento-stat-card">
                        <span className="about-bento-stat-number">{dict.rating_value}</span>
                        <span className="about-bento-stat-label">{dict.rating_label}</span>
                    </div>
                </div>

                <div className="about-bento-stack-item" style={{ '--stack-index': 3 } as React.CSSProperties}>
                    <div className="about-bento-photo-card">
                        <Image
                            src="/assets/city-img-1.jpg"
                            alt={dict.alt_team}
                            fill
                            className="about-bento-photo-img"
                        />
                        <span className="about-bento-photo-caption">{dict.caption_team}</span>
                    </div>
                </div>

                <div className="about-bento-stack-item" style={{ '--stack-index': 4 } as React.CSSProperties}>
                    <div className="about-bento-stat-card about-bento-stat-card--accent">
                        <span className="about-bento-stat-number about-bento-stat-number--red">{dict.guides_count}</span>
                        <span className="about-bento-stat-label">{dict.guides_label}</span>
                    </div>
                </div>

                <div className="about-bento-stack-item" style={{ '--stack-index': 5 } as React.CSSProperties}>
                    <div className="about-bento-photo-card">
                        <Image
                            src="/assets/city-img-1.jpg"
                            alt={dict.alt_lake}
                            fill
                            className="about-bento-photo-img"
                        />
                        <span className="about-bento-photo-caption">{dict.caption_lake}</span>
                    </div>
                </div>
            </div>
        </>
    )
}