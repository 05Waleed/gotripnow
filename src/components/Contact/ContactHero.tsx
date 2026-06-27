import './ContactHero.css'

export interface ContactHeroDict {
    title: string
    titleLogo: string
    titleSuffix: string
    description: string
}

interface ContactHeroProps {
    dict: ContactHeroDict
}

export default function ContactHero({ dict }: ContactHeroProps) {
    return (
        <div className='contact-hero-container large-screen-max-width'>
            <div className="contact-hero-text">
                <h1 className='contact-hero-title'>
                    {dict.title}
                    <span className='contact-hero-title-logo'>{dict.titleLogo}</span>
                    {dict.titleSuffix}
                </h1>
                <p className='contact-hero-description'>{dict.description}</p>
            </div>
        </div>
    )
}