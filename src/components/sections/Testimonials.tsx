import { getReviews } from "@/lib";
import { AnimateOnScroll } from "../ui/AnimateOnScroll";
import Link from "next/link";

export const revalidate = 60;

export default async function Testimonials() {
  const reviews = await getReviews(6);

  if (reviews.length === 0) return null;

  return (
    <section className="bg-bg-alt py-32 md:py-44">
      <AnimateOnScroll>
        <div className="max-w-7xl mx-auto px-6">
          <div className="md:flex md:items-start md:justify-between md:gap-16 mb-16">
            <div className="md:max-w-lg">
              <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
                [ Отзывы ]
              </p>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
                Слова тех, кому мы{" "}
                <em className="italic font-normal">помогли</em>
              </h2>
            </div>
            <p className="text-text-muted leading-relaxed max-w-sm mt-6 md:mt-4">
              Каждая история — это доверие, которое мы ценим. Вот что говорят
              семьи, которым мы помогли в трудную минуту.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-start">
            {reviews.map((item, index) => (
              <div
                key={item.id}
                className={`bg-bg border border-border rounded-2xl p-8 flex flex-col justify-between ${
                  index % 3 === 1 ? "md:mt-12" : ""
                }`}
              >
                <div>
                  <div className="flex gap-1 mb-4 text-lg">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < item.rating ? "text-gold" : "text-gold/20"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed mb-8">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                <p className="font-semibold">{item.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/otzyvy"
              className="inline-block border border-border hover:border-accent text-text-muted hover:text-accent px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300"
            >
              Все отзывы →
            </Link>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
