import './ContactDetails.css'
import { ContactIcons } from './ContactIcons'

export interface ContactDetailsDict {
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
}

interface ContactDetailsProps {
  dict: ContactDetailsDict
}

export default function ContactDetails({ dict }: ContactDetailsProps) {
  return (
    <div className='contact-details-container'>
      <div className="contact-detail-item">
        <div className="cd-icon">{ContactIcons.mail}</div>
        <div className="cd-item-text">
          <p className='cd-item-text-title'>{dict.email.title}</p>
          <p className='cd-item-text-description'>{dict.email.description}</p>
          <p className='cd-item-text-link'>{dict.email.link}</p>
        </div>
      </div>
      <div className="contact-detail-item">
        <div className="cd-icon">{ContactIcons.whatsapp}</div>
        <div className="cd-item-text">
          <p className='cd-item-text-title'>{dict.whatsapp.title}</p>
          <p className='cd-item-text-description'>{dict.whatsapp.description}</p>
          <p className='cd-item-text-link'>{dict.whatsapp.link}</p>
        </div>
      </div>
    </div>
  )
}