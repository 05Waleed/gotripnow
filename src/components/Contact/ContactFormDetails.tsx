import './ContactFormDetails.css'
import ContactDetails from "./ContactDetails"
import ContactForm from "./ContactForm"
import { ContactDetailsDict } from "./ContactDetails"
import { ContactFormDict } from "./ContactForm"

interface ContactFormDetailsProps {
    detailsDict: ContactDetailsDict
    formDict: ContactFormDict
}

export default function ContactFormDetails({ detailsDict, formDict }: ContactFormDetailsProps) {
    return (
        <div className='contact-form-details-container large-screen-max-width'>
            <ContactDetails dict={detailsDict} />
            <ContactForm dict={formDict} />
        </div>
    )
}