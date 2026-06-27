'use client'

import './FAQ.css'
import { useState } from 'react'
import { ContactIcons } from './ContactIcons'

export interface FaqItem {
    question: string
    answer: string
}

export interface FAQDict {
    eyebrow: string
    title: string
    subtitle: string
    items: FaqItem[]
    contact: {
        heading: string
        subtext: string
        whatsapp: {
            label: string
            value: string
            href: string
        }
        email: {
            label: string
            value: string
            href: string
        }
    }
}

interface FAQProps {
    dict: FAQDict
}

export default function FAQ({ dict }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const left = dict.items.filter((_, i) => i % 2 === 0)
    const right = dict.items.filter((_, i) => i % 2 !== 0)

    return (
        <section className="faq-section">
            <div className="faq-inner large-screen-max-width">
                {/* Header */}
                <div className="faq-header">
                    <span className="faq-eyebrow">{dict.eyebrow}</span>
                    <h2 className="faq-title">{dict.title}</h2>
                    <p className="faq-subtitle">{dict.subtitle}</p>
                </div>

                {/* Grid */}
                <div className="faq-grid">
                    <div className="faq-column">
                        {left.map((item, i) => {
                            const idx = i * 2
                            return (
                                <FaqAccordionItem
                                    key={idx}
                                    item={item}
                                    index={idx}
                                    isOpen={openIndex === idx}
                                    onToggle={toggle}
                                />
                            )
                        })}
                    </div>
                    <div className="faq-column">
                        {right.map((item, i) => {
                            const idx = i * 2 + 1
                            return (
                                <FaqAccordionItem
                                    key={idx}
                                    item={item}
                                    index={idx}
                                    isOpen={openIndex === idx}
                                    onToggle={toggle}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Contact Banner */}
                <div className="faq-contact-banner">
                    <div className="faq-contact-left">
                        <div className="faq-contact-icon">
                            {ContactIcons.question}
                        </div>
                        <div>
                            <p className="faq-contact-heading">{dict.contact.heading}</p>
                            <p className="faq-contact-sub">{dict.contact.subtext}</p>
                        </div>
                    </div>

                    <div className="faq-contact-channels">
                        <a href={dict.contact.whatsapp.href} className="faq-contact-channel" target="_blank" rel="noopener noreferrer">
                            <div className="faq-channel-icon" style={{ color: 'var(--red-accent-color)' }}>
                                {ContactIcons.whatsapp}
                            </div>
                            <div>
                                <p className="faq-channel-label">{dict.contact.whatsapp.label}</p>
                                <p className="faq-channel-value">{dict.contact.whatsapp.value}</p>
                            </div>
                        </a>

                        <a href={dict.contact.email.href} className="faq-contact-channel">
                            <div className="faq-channel-icon" style={{ color: 'var(--red-accent-color)' }}>
                                {ContactIcons.mail}
                            </div>
                            <div>
                                <p className="faq-channel-label">{dict.contact.email.label}</p>
                                <p className="faq-channel-value">{dict.contact.email.value}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

function FaqAccordionItem({
    item,
    index,
    isOpen,
    onToggle,
}: {
    item: FaqItem
    index: number
    isOpen: boolean
    onToggle: (i: number) => void
}) {
    return (
        <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
            <button className="faq-item-header" onClick={() => onToggle(index)} aria-expanded={isOpen}>
                <div className="faq-item-icon">
                    {isOpen ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <line x1="2" y1="7" x2="12" y2="7" stroke="var(--red-accent-color)" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <line x1="7" y1="2" x2="7" y2="12" stroke="var(--red-accent-color)" strokeWidth="2.2" strokeLinecap="round" />
                            <line x1="2" y1="7" x2="12" y2="7" stroke="var(--red-accent-color)" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                    )}
                </div>
                <span className="faq-item-question">{item.question}</span>
                <svg className="faq-item-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <polyline points="4,6 8,10 12,6" stroke="var(--light-grey-description-color)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {isOpen && (
                <div className="faq-item-body">
                    <p>{item.answer}</p>
                </div>
            )}
        </div>
    )
}