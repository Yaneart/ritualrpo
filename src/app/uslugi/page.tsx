import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

export default function UslugiPage() {
  return (
    <>
      <section className="pt-40 pb-20 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
            [ Услуги ]
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl">
            Всё для достойного <em className="italic font-normal">прощания</em>
          </h1>
        </div>
      </section>

      <section className="bg-bg-alt py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                href={`/uslugi/${service.slug}`}
                key={service.slug}
                className="group relative h-80 md:h-96 rounded-2xl overflow-hidden block"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                    {service.title}
                  </h2>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
