const testimonials = [
  {
    text: "В самый тяжёлый момент они взяли всё на себя. Мы могли просто быть рядом с семьёй, не думая об организации.",
    name: "Елена М.",
    relation: "потеря отца",
  },
  {
    text: "Очень деликатное и профессиональное отношение. Всё было организовано достойно, именно так, как мы хотели.",
    name: "Андрей К.",
    relation: "потеря матери",
  },
  {
    text: "Благодарим за круглосуточную поддержку. Позвонили ночью — приехали через 40 минут. Помогли с документами и всей организацией.",
    name: "Ольга С.",
    relation: "потеря супруга",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bg-alt py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
          [ Отзывы ]
        </p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-16 max-w-3xl">
          Слова тех, кому мы <em className="italic font-normal">помогли</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="border border-border rounded-2xl p-8 flex flex-col justify-between"
            >
              <p className="text-lg leading-relaxed mb-8">
                &ldquo;{item.text}&rdquo;
              </p>

              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-text-muted">{item.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
