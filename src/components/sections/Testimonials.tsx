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
    <section className="bg-bg-alt py-32 md:py-44">
      <div className="max-w-7xl mx-auto px-6">
        <div className="md:flex md:items-start md:justify-between md:gap-16 mb-16">
          <div className="md:max-w-lg">
            <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
              [ Отзывы ]
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
              Слова тех, кому мы <em className="italic font-normal">помогли</em>
            </h2>
          </div>
          <p className="text-text-muted leading-relaxed max-w-sm mt-6 md:mt-4">
            Каждая история — это доверие, которое мы ценим. Вот что говорят
            семьи, которым мы помогли в трудную минуту.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-start">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className={`border border-border rounded-2xl p-8 flex flex-col justify-between ${
                index === 1 ? "md:mt-12" : ""
              }`}
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
