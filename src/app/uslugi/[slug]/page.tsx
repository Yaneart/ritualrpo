import { services } from "@/data/services";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export function generateStaticParams() {
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
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }
  return (
    <>
      <section id="hero" className="relative h-[60vh] flex items-end">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-transparent to-bg-dark/80" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-16 text-white">
          <Link
            href="/uslugi"
            className="inline-block text-sm uppercase tracking-widest text-white/60
  hover:text-white mb-6 transition-colors duration-300"
          >
            &larr; Все услуги
          </Link>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="bg-bg py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
                [ Об услуге ]
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-text-muted">
                {service.fullDescription}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
                [ Что входит ]
              </p>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-lg">
                    <span className="text-accent mt-1">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Нужна <em className="italic font-normal">помощь?</em>
          </h2>
          <p className="text-text-muted text-lg mb-10">
            Позвоните нам — мы ответим на все вопросы и поможем с организацией.
          </p>
          <a
            href="tel:+78126605151"
            className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold
  px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-colors duration-300"
          >
            Позвонить — +7 (812) 660-51-51
          </a>
        </div>
      </section>
    </>
  );
}
