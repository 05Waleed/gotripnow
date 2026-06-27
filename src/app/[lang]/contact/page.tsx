import ContactHero from "@/components/Contact/ContactHero"
import ContactForm from "@/components/Contact/ContactForm"
import FAQ from "@/components/Contact/FAQ"
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
      <ContactForm
        dict={dict.ContactPage.form}
        pictureDict={dict.ContactPage.picture}
      />
      <FAQ dict={dict.ContactPage.faq} />
    </>
  )
}