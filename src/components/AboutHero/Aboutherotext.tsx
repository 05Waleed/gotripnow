import './AboutHeroText.css'

export interface AboutHeroTextDict {
    title: string;
    description_1: string;
    description_2: string;
}

interface AboutHeroTextProps {
    dict: AboutHeroTextDict;
}

export default function AboutHeroText({ dict }: AboutHeroTextProps) {
    return (
        <div className='about-hero-text-section large-screen-max-width'>
            <div className="about-hero-text">
                <h1 className='about-hero-title'>
                    {dict.title}
                </h1>
                <div className='about-hero-description-container'>
                    <p className='about-hero-description'>
                        {dict.description_1}
                    </p>
                    <p className='about-hero-description'>
                        {dict.description_2}
                    </p>
                </div>
            </div>
        </div>
    )
}