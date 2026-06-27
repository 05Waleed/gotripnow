import ContactHero from "@/components/Contact/ContactHero"
import ContactFormDetails from "@/components/Contact/ContactFormDetails"
import { getDictionary, Locale } from "../../dictionaries"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <>
      <ContactHero dict={dict.ContactPage.hero} />
      <ContactFormDetails
        detailsDict={dict.ContactPage.details}
        formDict={dict.ContactPage.form}
      />
    </>
  )
}