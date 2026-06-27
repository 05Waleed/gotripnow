import './ContactFormPicture.css'
import Image from 'next/image'

export interface ContactFormPictureDict {
    heading: string
    headingAccent: string
    subtext: string
}

interface ContactFormPictureProps {
    dict: ContactFormPictureDict
}

export default function ContactFormPicture({ dict }: ContactFormPictureProps) {
    // Split heading around the accent word so we can wrap it in a span
    const [before, after] = dict.heading.split(dict.headingAccent)

    return (
        <div className="contact-form-picture">
            <div className="picture-illustration">
                <Image
                    src="/assets/paper-plane.png"
                    alt="Paper Plane"
                    width={400}
                    height={450}
                />
            </div>
            <div className="picture-text">
                <p className="picture-heading">
                    {before}
                    <span className="picture-heading-accent">{dict.headingAccent}</span>
                    {after}
                </p>
                <p className="picture-subtext">{dict.subtext}</p>
            </div>
        </div>
    )
}