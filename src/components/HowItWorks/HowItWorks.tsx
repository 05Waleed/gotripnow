'use client'
import './HowItWorks.css'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { ArrowRightIcon, ShieldIcon, HeadsetIcon, CalendarIcon, HeartIcon } from './HowItWorksIcons'

// Define the shape of the Dictionary data
export interface HowItWorksStep {
    step_number: number;
    title: string;
    description: string;
    image_path: string;
}

export interface HowItWorksDict {
    main_title: string;
    title: string;
    description: string;
    steps: HowItWorksStep[];
    trust_badges: string[];
}

interface HowItWorksProps {
    dict: HowItWorksDict;
}

// Helper object to dynamically map badge index to its respective icon
const badgeIcons = [
    <ShieldIcon key="shield" />,
    <HeadsetIcon key="headset" />,
    <CalendarIcon key="calendar" />,
    <HeartIcon key="heart" />
]

export default function HowItWorks({ dict }: HowItWorksProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const scrollToCard = (index: number) => {
        const wrapper = wrapperRef.current
        if (!wrapper) return
        const cards = wrapper.querySelectorAll('.how-it-works-step')
        const target = Math.max(0, Math.min(index, cards.length - 1))

        cards[target].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        setActiveIndex(target)
    }

    const handleScroll = () => {
        const wrapper = wrapperRef.current
        if (!wrapper) return
        const wRect = wrapper.getBoundingClientRect()
        const cards = wrapper.querySelectorAll('.how-it-works-step')

        let closest = 0
        let minDist = Infinity

        cards.forEach((c, i) => {
            const r = c.getBoundingClientRect()
            const dist = Math.abs(r.left + r.width / 2 - (wRect.left + wRect.width / 2))
            if (dist < minDist) {
                minDist = dist
                closest = i
            }
        })
        setActiveIndex(closest)
    }

    return (
        <div className='how-it-works-container large-screen-max-width'>
            <div className="how-it-works-text">
                <h1 className='how-it-works-head-title'>{dict.main_title}</h1>
                {/* Split titles at newline characters natively */}
                <h2 className='how-it-works-title'>
                    {dict.title.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < dict.title.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </h2>
                <p className='how-it-works-description'>{dict.description}</p>
            </div>

            <div className="how-it-works-steps-wrapper" ref={wrapperRef} onScroll={handleScroll}>
                {dict.steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <div className="how-it-works-step">
                            <div className="step-image-container">
                                <Image
                                    src={step.image_path}
                                    alt={step.title}
                                    width={320}
                                    height={220}
                                    priority
                                />
                            </div>
                            <div className="step-content">
                                <div className="step-header">
                                    <span className="step-number">{step.step_number}</span>
                                    <h3 className="step-heading">{step.title}</h3>
                                </div>
                                <p className="step-text">{step.description}</p>
                            </div>
                        </div>
                        {/* Display arrows between items, but not after the last item */}
                        {idx < dict.steps.length - 1 && (
                            <div className="step-arrow"><ArrowRightIcon /></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Dynamic Dot Navigation indicators */}
            <div className="step-nav-dots">
                {dict.steps.map((_, i) => (
                    <button
                        key={i}
                        className={"step-nav-dot" + (activeIndex === i ? " active" : "")}
                        onClick={() => scrollToCard(i)}
                        aria-label={"Go to step " + (i + 1)}
                    />
                ))}
            </div>

            {/* Dynamic Trust Badges Banner */}
            <div className="trust-badges-banner">
                {dict.trust_badges.map((badgeText, index) => (
                    <div className="badge-item" key={index}>
                        {badgeIcons[index]} {badgeText}
                    </div>
                ))}
            </div>
        </div>
    )
}