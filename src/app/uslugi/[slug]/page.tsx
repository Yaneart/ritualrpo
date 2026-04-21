import { getServiceBySlug, getServices } from "@/lib";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionAnchor from "@/components/ui/SectionAnchor";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Marker from "@/components/ui/Marker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let service;
  try {
    service = await getServiceBySlug(slug);
    return {
      title: service.title,
      description: service.description,
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  const services = await getServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let service;
  try {
    service = await getServiceBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <section
        id="hero"
        className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden"
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/30 to-bg-dark/40" />

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-12 pb-12 md:pb-16 text-white">
          <Link
            href="/uslugi"
            className="label text-white/60 hover:text-white transition-colors duration-300 mb-6 inline-block"
          >
            ← Все услуги
          </Link>
          <h1 className="font-heading text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-[-0.02em] max-w-5xl">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="bg-bg">
        <SectionAnchor num="01 / Услуга" label="— описание и состав" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-20 md:pb-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <AnimateOnScroll>
                <div className="mb-6">
                  <Marker>Об услуге</Marker>
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-text-muted">
                  {service.fullText}
                </p>
              </AnimateOnScroll>
            </div>

            <div className="md:col-span-7 md:pl-10">
              <AnimateOnScroll>
                <div className="mb-10">
                  <Marker>Что входит</Marker>
                </div>
              </AnimateOnScroll>

              {service.features.map((feature, i) => (
                <AnimateOnScroll
                  key={feature}
                  className={i > 0 ? "border-t border-border" : ""}
                >
                  <div className="flex items-start gap-6 md:gap-10 py-6 md:py-8">
                    <span className="label text-text-muted pt-2 shrink-0">
                      [ {String(i + 1).padStart(2, "0")} ]
                    </span>
                    <p className="flex-1 font-heading text-2xl md:text-3xl leading-[1.1] tracking-[-0.01em] text-text">
                      {feature}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <AnimateOnScroll>
            <div className="mb-8">
              <Marker>Помощь / круглосуточно</Marker>
            </div>

            <h2 className="font-heading leading-[0.95] text-[clamp(44px,6.5vw,96px)] tracking-[-0.02em] text-text mb-8 md:mb-12">
              Нужна{" "}
              <span className="italic-heading text-text-muted">помощь?</span>
            </h2>

            <p className="text-text-muted max-w-xl leading-relaxed text-lg mb-10 md:mb-14">
              Позвоните нам — мы ответим на все вопросы и поможем с
              организацией.
            </p>

            <a
              href="tel:+78126605151"
              className="inline-block bg-text hover:bg-gold text-white hover:text-text px-8 py-5 rounded-full text-sm uppercase tracking-wider transition-colors duration-300"
            >
              Позвонить — +7 (812) 660-51-51
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
