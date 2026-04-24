import { getServiceBySlug, getServices, getSettingsMap } from "@/lib";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionAnchor from "@/components/ui/SectionAnchor";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Marker from "@/components/ui/Marker";
import { Service } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const service = await getServiceBySlug(slug);
    return {
      title: `${service.title} в Санкт-Петербурге`,
      description: `${service.description} Работаем круглосуточно по Санкт-Петербургу и Ленинградской области.`,
      alternates: { canonical: `https://ritualrpo.ru/uslugi/${slug}` },
      openGraph: {
        url: `https://ritualrpo.ru/uslugi/${slug}`,
        images: [{ url: service.image, width: 1200, height: 630 }],
      },
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
  let otherServices: Service[] = [];
  try {
    service = await getServiceBySlug(slug);
    const allServices = await getServices();
    otherServices = allServices.filter((s) => s.slug !== slug);
  } catch {
    notFound();
  }
  const s = await getSettingsMap();
  const phone = s.phone ?? "+7 (812) 660-51-51";
  const phoneHref = s.phone_href ?? "tel:+78126605151";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: "https://ritualrpo.ru",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Услуги",
                item: "https://ritualrpo.ru/uslugi",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: service.title,
                item: `https://ritualrpo.ru/uslugi/${slug}`,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${service.title} в Санкт-Петербурге`,
            description: service.fullText,
            url: `https://ritualrpo.ru/uslugi/${slug}`,
            provider: {
              "@type": "FuneralHome",
              name: "RitualRPO",
              url: "https://ritualrpo.ru",
            },
            areaServed: "Санкт-Петербург",
            serviceType: service.title,
          }),
        }}
      />
      <section
        id="hero"
        className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden"
      >
        <Image
          src={service.image}
          alt={`${service.title} — ритуальные услуги в Санкт-Петербурге`}
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

                {service.price && (
                  <div className="mt-10 pt-10 border-t border-border">
                    <p className="label text-text-muted mb-2">Стоимость</p>
                    <p className="font-heading text-[clamp(32px,4vw,56px)] leading-none tracking-[-0.02em] text-gold">
                      {service.price}
                    </p>
                  </div>
                )}
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
              href={phoneHref}
              className="inline-block bg-text hover:bg-gold text-white hover:text-text px-8 py-5 rounded-full text-sm uppercase tracking-wider transition-colors duration-300"
            >
              Позвонить — {phone}
            </a>
          </AnimateOnScroll>
        </div>
      </section>
      {otherServices.length > 0 && (
        <section className="bg-bg border-t border-border">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-28">
            <div className="mb-10 md:mb-14">
              <Marker>Другие услуги</Marker>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/uslugi/${s.slug}`}
                  className="group block border border-border p-6 md:p-8 hover:border-text transition-colors duration-300"
                >
                  <h3 className="font-heading text-xl md:text-2xl leading-[1.1] tracking-[-0.01em] mb-3 group-hover:text-gold transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {s.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
