import Image from "next/image";

const services = [
  {
    title: "Организация похорон",
    description:
      "Полный цикл организации — от оформления документов до проведения церемонии прощания.",
    image: "/images/services/funeral.jpg",
  },
  {
    title: "Кремация",
    description:
      "Организация кремации с соблюдением всех традиций и пожеланий семьи.",
    image: "/images/services/cremation2.jpg",
  },
  {
    title: "Ритуальные товары",
    description:
      "Гробы, венки, цветы, траурные ленты и другие ритуальные принадлежности.",
    image: "/images/services/products.jpg",
  },
  {
    title: "Памятники и благоустройство",
    description:
      "Изготовление памятников, оград, благоустройство и уход за захоронениями.",
    image: "/images/services/monuments2.jpg",
  },
];

export default function Services() {
  return (
    <section className="bg-bg-alt py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
          [ Наши услуги ]
        </p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
          Всё для достойного <em className="italic font-normal">прощания</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
