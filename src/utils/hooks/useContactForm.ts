import { useState } from 'react'
import { validateContactForm } from '../validators/contactFormValidator/contactformValidator'
import { ContactFormState, INITIAL_CONTACT_FORM_STATE } from '../../../models/contactFormModel'
import { ContactFormDict } from '@/components/Contact/ContactForm'

type ValidationMessages = ContactFormDict['validation']

export function useContactForm(validation: ValidationMessages) {
    const [formState, setFormState] = useState<ContactFormState>(INITIAL_CONTACT_FORM_STATE)

    const handleChange = (field: string, value: string) => {
        setFormState((prev) => ({
            ...prev,
            values: { ...prev.values, [field]: value },
            errors: { ...prev.errors, [field]: undefined },
        }))
    }

    const handleSubmit = () => {
        const { errors, isValid } = validateContactForm(formState.values, validation)
        if (!isValid) {
            setFormState((prev) => ({ ...prev, errors }))
            return
        }
        setFormState((prev) => ({ ...prev, isSubmitting: true }))
        console.log('Contact form submitted:', formState.values)
        setFormState((prev) => ({ ...prev, isSubmitting: false, isSubmitted: true }))
    }

    return {
        values: formState.values,
        errors: formState.errors,
        isSubmitting: formState.isSubmitting,
        isSubmitted: formState.isSubmitted,
        handleChange,
        handleSubmit,
    }
}