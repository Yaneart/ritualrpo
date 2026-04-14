import ContactForm from "@/components/contacts/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с нами: +7 (812) 660-51-51. Работаем круглосуточно. Выезд специалиста в течение часа по Санкт-Петербургу.",
};

export default function ContactPage() {
  return <ContactForm />;
}
