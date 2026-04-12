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
    <section className="bg-bg-dark text-white py-32 md:py-44">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm uppercase tracking-widest text-white/40 mb-4">
          [ Почему мы ]
        </p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-20 md:mb-28 max-w-3xl">
          Доверьте заботы <em className="italic font-normal">профессионалам</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 md:gap-x-20">
          {advantages.map((item, index) => (
            <div
              key={item.title}
              className={`${index % 2 === 1 ? "md:mt-16" : ""}`}
            >
              <div className="border-l-2 border-white/15 pl-6">
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
