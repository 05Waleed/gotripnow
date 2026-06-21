import './TourSearchBttn.css';

interface TourSearchBttnProps {
    onClick?: () => void;
    label?: string;
}

export default function TourSearchBttn({
    onClick,
    label = 'Search',
}: TourSearchBttnProps) {
    return (
        <div className="tsb-btn-wrapper">
            <button
                type="button"
                className="tsb-btn"
                onClick={onClick}
                aria-label="Search tours"
            >
                <span className="tsb-btn-icon">
                    <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="22" y2="22" />
                    </svg>
                </span>
                {label}
            </button>
        </div>
    );
}