import { getFaqs } from "@/lib";
import { FAQAccordion } from "../faq/FAQAccordion";
import { AnimateOnScroll } from "../ui/AnimateOnScroll";

export const revalidate = 60;

export default async function FAQ() {
  const faqs = await getFaqs();
  if (faqs.length === 0) return null;

  return (
    <section className="bg-bg-dark text-white py-32 md:py-44">
      <AnimateOnScroll>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-white/40 mb-4">
            [ Вопросы ]
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
            Частые <em className="italic font-normal">вопросы</em>
          </h2>

          <FAQAccordion faqs={faqs} />
        </div>
      </AnimateOnScroll>
    </section>
  );
}
