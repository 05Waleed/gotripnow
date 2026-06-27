'use client'

import './ContactForm.css'
import InputField from '../ui/InputField/InputField'
import SelectorField from '../ui/InputField/SelectorField'
import TextArea from '../ui/InputField/TextArea'
import FormCtaButton from '../ui/formCtaButton/FormCtaButton'
import { ContactIcons } from './ContactIcons'
import { useContactForm } from '@/utils/hooks/useContactForm'
import ContactFormPicture, { ContactFormPictureDict } from './ContactFormPicture'

export interface ContactFormDict {
  title: string
  fields: {
    name: { label: string; placeholder: string }
    email: { label: string; placeholder: string }
    subject: { label: string; placeholder: string }
    message: { label: string; placeholder: string }
  }
  subjectOptions: { value: string; label: string }[]
  button: { label: string }
  validation: {
    nameRequired: string
    nameMinLength: string
    emailRequired: string
    emailInvalid: string
    subjectRequired: string
    messageRequired: string
    messageMinLength: string
  }
}

interface ContactFormProps {
  dict: ContactFormDict
  pictureDict: ContactFormPictureDict
}

export default function ContactForm({ dict, pictureDict }: ContactFormProps) {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useContactForm(dict.validation)

  return (
    <div className='contact-form-container large-screen-max-width'>
      <form className='contact-form'>
        <p className='contact-form-title'>{dict.title}</p>
        <InputField
          type='text'
          label={dict.fields.name.label}
          placeholder={dict.fields.name.placeholder}
          icon={ContactIcons.user}
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
        />
        <InputField
          type='email'
          label={dict.fields.email.label}
          placeholder={dict.fields.email.placeholder}
          icon={ContactIcons.mail}
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />
        <SelectorField
          label={dict.fields.subject.label}
          placeholder={dict.fields.subject.placeholder}
          options={dict.subjectOptions}
          value={values.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          error={errors.subject}
        />
        <TextArea
          label={dict.fields.message.label}
          placeholder={dict.fields.message.placeholder}
          icon={ContactIcons.message}
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          error={errors.message}
        />
        <FormCtaButton
          onClick={handleSubmit}
          label={dict.button.label}
          icon={ContactIcons.arrow}
          disabled={isSubmitting}
        />
      </form>
      <ContactFormPicture dict={pictureDict} />
    </div>
  )
}