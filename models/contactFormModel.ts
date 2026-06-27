// gotripnow/models/contactFormModel.ts

export type ContactFormSubject =
    | 'general'
    | 'support'
    | 'billing'
    | 'booking'
    | 'private-trip';

export interface ContactFormModel {
    name: string;
    email: string;
    subject: ContactFormSubject | '';
    message: string;
}

export interface ContactFormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export interface ContactFormState {
    values: ContactFormModel;
    errors: ContactFormErrors;
    isSubmitting: boolean;
    isSubmitted: boolean;
}

export interface ContactFormOption {
    value: ContactFormSubject | '';
    label: string;
}

export const SUBJECT_OPTIONS: ContactFormOption[] = [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General inquiry' },
    { value: 'support', label: 'Technical support' },
    { value: 'billing', label: 'Billing question' },
    { value: 'booking', label: 'About a booking' },
    { value: 'private-trip', label: 'Custom private trip' },
];

export const INITIAL_CONTACT_FORM_VALUES: ContactFormModel = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

export const INITIAL_CONTACT_FORM_STATE: ContactFormState = {
    values: INITIAL_CONTACT_FORM_VALUES,
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
};