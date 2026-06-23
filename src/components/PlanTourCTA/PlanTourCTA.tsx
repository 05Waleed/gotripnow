import './PlanTourCTA.css'
import Link from 'next/link'

export interface PlanTourCTADict {
    eyebrow: string
    heading: string
    subheading: string
    button: string
}

interface PlanTourCTAProps {
    dict: PlanTourCTADict
}

export default function PlanTourCTA({ dict }: PlanTourCTAProps) {
    return (
        <section className="plantourcta large-screen-max-width">
            <div className="plantourcta__card">
                <div className="plantourcta__texture" />

                <div className="plantourcta__content">
                    <span className="plantourcta__eyebrow">{dict.eyebrow}</span>
                    <h2 className="plantourcta__heading">{dict.heading}</h2>
                    <p className="plantourcta__sub">{dict.subheading}</p>
                </div>

                <div className="plantourcta__action">
                    <Link href="/plan-tour" className="plantourcta__btn">
                        {dict.button}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}