'use client'

import { useRef, useEffect, useState } from 'react'
import './ContactHero.css'
import { ContactIcons } from './ContactIcons'

export interface ContactHeroDict {
    title: string
    subtitle: string
    description: string
    cards: {
        email: {
            title: string
            description: string
            link: string
        }
        whatsapp: {
            title: string
            description: string
            link: string
        }
        responseTime: {
            title: string
            description: string
        }
    }
}

interface ContactHeroProps {
    dict: ContactHeroDict
}

export default function ContactHero({ dict }: ContactHeroProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const totalCards = 3

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        const handleScroll = () => {
            const cardWidth = el.scrollWidth / totalCards
            const index = Math.round(el.scrollLeft / cardWidth)
            setActiveIndex(index)
        }
        el.addEventListener('scroll', handleScroll, { passive: true })
        return () => el.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className='contact-hero-container large-screen-max-width'>
            <div className="contact-hero-text">
                <h1 className='contact-hero-title'>{dict.title}</h1>
                <h2 className='contact-hero-subtitle'>{dict.subtitle}</h2>
                <p className='contact-hero-description'>{dict.description}</p>
            </div>
            <div className="contact-hero-cards" ref={scrollRef}>
                <div className="contact-hero-card">
                    <div className="contact-hero-card-icon">{ContactIcons.mail}</div>
                    <div className="contact-hero-card-text">
                        <p className='contact-hero-card-text-title'>{dict.cards.email.title}</p>
                        <p>{dict.cards.email.description}</p>
                        <p className='contact-hero-card-text-link'>{dict.cards.email.link}</p>
                    </div>
                </div>
                <div className="contact-hero-card">
                    <div className="contact-hero-card-icon">{ContactIcons.whatsapp}</div>
                    <div className="contact-hero-card-text">
                        <p className='contact-hero-card-text-title'>{dict.cards.whatsapp.title}</p>
                        <p>{dict.cards.whatsapp.description}</p>
                        <p className='contact-hero-card-text-link'>{dict.cards.whatsapp.link}</p>
                    </div>
                </div>
                <div className="contact-hero-card">
                    <div className="contact-hero-card-icon">{ContactIcons.clock}</div>
                    <div className="contact-hero-card-text">
                        <p className='contact-hero-card-text-title'>{dict.cards.responseTime.title}</p>
                        <p>{dict.cards.responseTime.description}</p>
                    </div>
                </div>
            </div>
            <div className="contact-hero-cards-dots">
                {Array.from({ length: totalCards }).map((_, i) => (
                    <div
                        key={i}
                        className={`contact-hero-cards-dot${activeIndex === i ? ' active' : ''}`}
                    />
                ))}
            </div>
        </div>
    )
}