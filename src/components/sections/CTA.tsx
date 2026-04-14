import { AnimateOnScroll } from "../ui/AnimateOnScroll";

export default function CTA() {
  return (
    <section className="bg-bg-alt py-32 md:py-44">
      <AnimateOnScroll>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
            [ 24/7 ]
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Мы рядом в <em className="italic font-normal">любое время</em>
          </h2>

          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12">
            Позвоните — и мы возьмём все заботы на себя. Бесплатная
            консультация, выезд специалиста в течение часа.
          </p>

          <a
            href="tel:+78126605151"
            className="inline-block font-heading text-4xl md:text-5xl font-bold text-accent hover:text-accent-hover transition-colors duration-300 mb-8"
          >
            +7 (812) 660-51-51
          </a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+78126605151"
              className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-colors duration-300"
            >
              Позвонить сейчас
            </a>
            <a
              href="#"
              className="border border-border hover:border-accent text-text-muted hover:text-accent px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300"
            >
              Заказать обратный звонок
            </a>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
