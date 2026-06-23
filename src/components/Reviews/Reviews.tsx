import './Reviews.css'

export interface ReviewItem {
    id: number
    name: string
    initials: string
    avatarColor: string
    rating: number
    location: string
    timeAgo: string
    text: string
}

export interface ReviewsDict {
    heading: string
    subheading: string
    badge: {
        score: string
        label: string
        reviewCount: string
        source: string
    }
    reviews: ReviewItem[]
}

interface ReviewsProps {
    dict: ReviewsDict
}

const GoogleIcon = () => (
    <svg className="reviews__g-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
)

function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
    return (
        <div className={`reviews__stars reviews__stars--${size}`}>
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className={`reviews__star ${s <= rating ? 'reviews__star--on' : ''}`} viewBox="0 0 24 24">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
            ))}
        </div>
    )
}

export default function Reviews({ dict }: ReviewsProps) {
    return (
        <section className="reviews large-screen-max-width">
            <div className="reviews__container">

                {/* Top row: heading left, badge right */}
                <div className="reviews__top">
                    <div className="reviews__intro">
                        <h2 className="reviews__heading">{dict.heading}</h2>
                        <p className="reviews__sub">{dict.subheading}</p>
                    </div>

                    <a href="#" className="reviews__badge" target="_blank" rel="noopener noreferrer">
                        <span className="reviews__badge-score">{dict.badge.score}</span>
                        <div className="reviews__badge-right">
                            <span className="reviews__badge-label">{dict.badge.label}</span>
                            <Stars rating={5} size="sm" />
                            <span className="reviews__badge-count">{dict.badge.reviewCount}</span>
                            <span className="reviews__badge-google">
                                <GoogleIcon />
                                <span>{dict.badge.source}</span>
                            </span>
                        </div>
                    </a>
                </div>

                {/* Scrolling cards row */}
                <div className="reviews__scroll-row">
                    {dict.reviews.map((r) => (
                        <div className="reviews__card" key={r.id}>
                            <div className="reviews__card-header">
                                <div className="reviews__avatar" style={{ backgroundColor: r.avatarColor }}>
                                    {r.initials}
                                </div>
                                <div className="reviews__card-meta">
                                    <span className="reviews__reviewer-name">{r.name}</span>
                                    <span className="reviews__reviewer-loc">{r.location}</span>
                                </div>
                                <GoogleIcon />
                            </div>

                            <Stars rating={r.rating} />

                            <p className="reviews__card-text">{r.text}</p>

                            <span className="reviews__card-time">{r.timeAgo}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}