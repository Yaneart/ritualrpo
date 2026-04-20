import Image from "next/image";
import AnimateOnScroll from "../ui/AnimateOnScroll";
import SectionAnchor from "../ui/SectionAnchor";

const advantages = [
  {
    title: "Круглосуточно",
    description:
      "Мы на связи 24/7. Звоните в любое время — мы сразу приедем и поможем.",
  },
  {
    title: "Всё берём на себя",
    description:
      "Оформление документов, транспортировка, организация церемонии — вам не нужно ни о чём беспокоиться.",
  },
  {
    title: "Прозрачные цены",
    description:
      "Фиксированная стоимость без скрытых наценок. Вы знаете итоговую сумму до начала работы.",
  },
  {
    title: "Опыт и уважение",
    description:
      "Более 10 лет работы. Каждая церемония проводится с достоинством и вниманием к деталям.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative bg-bg-dark text-white">
      <SectionAnchor
        theme="dark"
        num="02 / Почему мы"
        label="— почему именно мы"
        tagline={
          <>
            <span>Доверьте заботы</span>{" "}
            <span className="italic-heading text-white/60">профессионалам</span>{" "}
            <span>— с уважением, вниманием и без лишней суеты.</span>
          </>
        }
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-14 md:pb-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <AnimateOnScroll>
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10">
                  <Image
                    src="/images/why/why-us.png"
                    alt="Почему выбирают RitualRPO"
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          <div className="md:col-span-7 md:pl-10">
            {advantages.map((item, i) => (
              <AnimateOnScroll
                key={item.title}
                className={i > 0 ? "border-t border-white/15" : ""}
              >
                <div className="flex items-start gap-6 md:gap-10 py-8 md:py-10">
                  <span className="label text-white/50 pt-2 shrink-0">
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <div className="flex-1">
                    <h3 className="font-heading text-3xl md:text-5xl leading-[1.05] tracking-[-0.01em] text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
