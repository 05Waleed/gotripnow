import { ContactFormErrors, ContactFormModel } from '../../../../models/contactFormModel'
import { ContactFormDict } from '@/components/Contact/ContactForm'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ValidationMessages = ContactFormDict['validation']

export function validateName(name: string, v: ValidationMessages): string | null {
    if (!name.trim()) return v.nameRequired
    if (name.trim().length < 2) return v.nameMinLength
    return null
}

export function validateEmail(email: string, v: ValidationMessages): string | null {
    if (!email.trim()) return v.emailRequired
    if (!EMAIL_REGEX.test(email)) return v.emailInvalid
    return null
}

export function validateSubject(subject: string, v: ValidationMessages): string | null {
    if (!subject) return v.subjectRequired
    return null
}

export function validateMessage(message: string, v: ValidationMessages): string | null {
    if (!message.trim()) return v.messageRequired
    if (message.trim().length < 10) return v.messageMinLength
    return null
}

export function validateContactForm(
    values: ContactFormModel,
    v: ValidationMessages
): { errors: ContactFormErrors; isValid: boolean } {
    const errors: ContactFormErrors = {}

    const nameError = validateName(values.name, v)
    if (nameError) errors.name = nameError

    const emailError = validateEmail(values.email, v)
    if (emailError) errors.email = emailError

    const subjectError = validateSubject(values.subject, v)
    if (subjectError) errors.subject = subjectError

    const messageError = validateMessage(values.message, v)
    if (messageError) errors.message = messageError

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    }
}