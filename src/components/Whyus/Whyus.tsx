import './Whyus.css'
import Image from 'next/image'

const images = [
    '/assets/RTB-1.avif',
    '/assets/RTB-2.avif',
    '/assets/RTB-3.avif',
]

export interface WhyusCard {
    title: string
    description: string
}

export interface WhyusDict {
    heading: string
    cards: WhyusCard[]
}

interface WhyusProps {
    dict: WhyusDict
}

export default function Whyus({ dict }: WhyusProps) {
    return (
        <section className="whyus large-screen-max-width">
            <h2 className="whyus__heading">
                {dict.heading.split('GoTripNow').map((part, i, arr) => (
                    <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                            <><span className="why-us-logo">GoTrip</span>Now</>
                        )}
                    </span>
                ))}
            </h2>
            <div className="whyus__grid">
                {dict.cards.map((card, i) => (
                    <div key={i} className="whyus__card">
                        <div className="whyus__image-wrap">
                            <Image
                                src={images[i]}
                                alt={card.title}
                                width={80}
                                height={80}
                                className="whyus__image"
                            />
                        </div>
                        <h3 className="whyus__card-title">{card.title}</h3>
                        <p className="whyus__card-desc">{card.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}