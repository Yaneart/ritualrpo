import { getFaqs } from "@/lib";
import SectionAnchor from "../ui/SectionAnchor";
import Marker from "../ui/Marker";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import FAQAccordion from "../faq/FAQAccordion";

export const revalidate = 60;

export default async function FAQ() {
  const faqs = await getFaqs();
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="relative bg-bg-dark text-white">
      <SectionAnchor
        theme="dark"
        num="04 / Вопросы"
        label="— если вы сомневаетесь"
        tagline={
          <>
            <span>Ответы, которые помогают в первые часы.</span>{" "}
            <span className="italic-heading text-white/60">
              Если не нашли своего — позвоните.
            </span>
          </>
        }
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-16 md:pb-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <AnimateOnScroll>
              <div className="mb-6">
                <Marker theme="dark">Спросите / узнайте</Marker>
              </div>
              <p className="text-white/60 max-w-xs leading-relaxed mb-8">
                Мы собрали самые частые вопросы. Если нужна консультация —
                позвоните, приедем или ответим тут же.
              </p>
              <a
                href="tel:+78126605151"
                className="inline-flex items-center gap-3 font-heading italic-heading text-3xl text-white hover:text-gold transition-colors duration-300"
              >
                +7 (812) 660-51-51
              </a>
            </AnimateOnScroll>
          </div>

          <div className="md:col-span-8">
            <AnimateOnScroll>
              <FAQAccordion faqs={faqs} />
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
