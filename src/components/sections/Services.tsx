import { services } from "@/data/services";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "../ui/AnimateOnScroll";

export default function Services() {
  return (
    <section className="bg-bg-alt py-32 md:py-44">
      <AnimateOnScroll>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
            [ Наши услуги ]
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
            Всё для достойного <em className="italic font-normal">прощания</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                href={`/uslugi/${service.slug}`}
                key={service.title}
                className="group relative h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
