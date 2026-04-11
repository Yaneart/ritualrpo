const advantages = [
  {
    number: "01",
    title: "Круглосуточно",
    description:
      "Мы на связи 24 часа в сутки, 7 дней в неделю. Звоните в любое время — мы сразу приедем и поможем.",
  },
  {
    number: "02",
    title: "Всё берём на себя",
    description:
      "Оформление документов, транспортировка, организация церемонии — вам не нужно ни о чём беспокоиться.",
  },
  {
    number: "03",
    title: "Прозрачные цены",
    description:
      "Фиксированная стоимость без скрытых наценок. Вы знаете итоговую сумму до начала работы.",
  },
  {
    number: "04",
    title: "Опыт и уважение",
    description:
      "Более 10 лет работы. Каждая церемония проводится с достоинством и вниманием к деталям.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
          [ Почему мы ]
        </p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-16 max-w-3xl">
          Доверьте заботы <em className="italic font-normal">профессионалам</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {advantages.map((item) => (
            <div key={item.number} className="flex gap-6">
              <span className="text-5xl md:text-6xl font-heading font-bold text-accent/20">
                {item.number}
              </span>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
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
