import AnimateOnScroll from "../ui/AnimateOnScroll";
import Marker from "../ui/Marker";
import CTAForm from "../cta/CTAForm";

export default function CTA() {
  return (
    <section id="cta" className="relative bg-bg overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-40">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 md:items-end">
          <div className="md:col-span-7">
            <AnimateOnScroll>
              <div className="mb-8">
                <Marker>Помощь / круглосуточно</Marker>
              </div>

              <h2 className="font-heading leading-[0.9] text-[clamp(56px,9vw,150px)] tracking-[-0.02em] text-text">
                <span className="italic-heading">Позвоните.</span> Мы рядом.
              </h2>

              <p className="text-text-muted max-w-lg leading-relaxed mt-8 text-lg pe-12 md:pe-0">
                Оставьте номер — перезвоним в течение 3 минут. Бесплатная
                консультация и выезд агента по городу.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="md:col-span-5">
            <AnimateOnScroll>
              <CTAForm />
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
