import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getServices } from "@/lib";
import SectionAnchor from "@/components/ui/SectionAnchor";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import CTA from "@/components/sections/CTA";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Ритуальные услуги в Санкт-Петербурге: организация похорон, кремация, ритуальные товары, памятники и благоустройство. Работаем круглосуточно, выезд в течение часа.",
  alternates: { canonical: "https://ritualrpo.ru/uslugi" },
  openGraph: { url: "https://ritualrpo.ru/uslugi" },
};

export default async function UslugiPage() {
  const services = await getServices();

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
            ],
          }),
        }}
      />
      <section className="bg-bg">
        <SectionAnchor
          num="01 / Услуги"
          label="— четыре направления"
          tagline={
            <>
              <span>Всё для достойного</span>{" "}
              <span className="italic-heading text-text-muted">прощания</span>
              <span> в Санкт-Петербурге.</span>
            </>
          }
        />
      </section>

      <section className="bg-bg pb-20 md:pb-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {services.map((service, i) => {
              const num = String(i + 1).padStart(2, "0");

              return (
                <AnimateOnScroll key={service.id}>
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="group relative block overflow-hidden"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden border border-border">
                      <Image
                        src={service.image}
                        alt={`${service.title} в Санкт-Петербурге`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-bg-dark/20 to-transparent" />
                      <span className="absolute top-6 left-6 label text-white/70">
                        [ {num} ]
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.01em] mb-3">
                          {service.title}
                        </h2>
                        <p className="text-white/70 leading-relaxed max-w-md">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
