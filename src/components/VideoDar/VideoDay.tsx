'use client'

import { useState } from 'react'
import Image from 'next/image'
import './VideoDay.css'

export interface VideoDayDict {
    heading: string
    headingBrand: string
    subheading: string
    label: string
    playAriaLabel: string
    closeAriaLabel: string
    iframeTitle: string
}

interface VideoDayProps {
    dict: VideoDayDict
    youtubeId: string
    backgroundImage?: string
}

export default function VideoDay({
    dict,
    youtubeId,
    backgroundImage = '/assets/city-img-1.jpg',
}: VideoDayProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <section className="videoday large-screen-max-width">
                <div className="videoday__card" onClick={() => setOpen(true)}>
                    <Image
                        src={backgroundImage}
                        alt="Brand film background"
                        fill
                        sizes="(max-width: 640px) 100vw, 1200px"
                        className="videoday__bg"
                        priority={true}
                    />
                    <div className="videoday__overlay" />

                    <button className="videoday__play" aria-label={dict.playAriaLabel}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="6,3 20,12 6,21" fill="currentColor" />
                        </svg>
                    </button>

                    <div className="videoday__content">
                        <h2 className="videoday__heading">
                            {dict.heading} <span className="videoday__brand">{dict.headingBrand}</span>
                        </h2>
                        <p className="videoday__sub">{dict.subheading}</p>
                    </div>
                </div>
            </section>

            {open && (
                <div
                    className="videoday__modal"
                    onClick={() => setOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={dict.iframeTitle}
                >
                    <div className="videoday__modal-inner" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="videoday__modal-close"
                            onClick={() => setOpen(false)}
                            aria-label={dict.closeAriaLabel}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <div className="videoday__iframe-wrap">
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                                title={dict.iframeTitle}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}