import { getServices } from "@/lib";
import SectionAnchor from "../ui/SectionAnchor";
import ServicesInteractive from "../services/ServicesInteractive";

export default async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="relative bg-bg-alt">
      <SectionAnchor
        num="01 / Услуги"
        label="— четыре линии заботы"
        tagline={
          <>
            <span>Мы сопровождаем семьи</span>{" "}
            <span className="italic-heading text-text-muted">
              в самый сложный момент
            </span>{" "}
            <span>— спокойно, последовательно, без лишних разговоров.</span>
          </>
        }
      />

      <ServicesInteractive services={services} />
    </section>
  );
}
