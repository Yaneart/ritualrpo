import { Metadata } from "next";
import { getReviews } from "@/lib";
import ReviewForm from "@/components/reviews/ReviewForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Отзывы клиентов",
  description:
    "Отзывы клиентов о работе RitualRPO — организация похорон, кремация и ритуальные услуги в Санкт-Петербурге.",
};

export default async function OtzyvyPage() {
  const reviews = await getReviews();

  return (
    <>
      <section className="pt-40 pb-12 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
            [ Отзывы ]
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl">
            Отзывы <em className="italic font-normal">клиентов</em>
          </h1>
          <p className="text-text-muted leading-relaxed max-w-2xl mt-6">
            Каждая история — это доверие, которое мы ценим. Благодарим всех, кто
            нашёл силы поделиться.
          </p>
        </div>
      </section>

      <section className="bg-bg-alt py-24">
        <div className="max-w-7xl mx-auto px-6">
          {reviews.length === 0 ? (
            <p className="text-text-muted text-center py-12">
              Пока нет отзывов. Будьте первым!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((item) => (
                <div
                  key={item.id}
                  className="bg-bg border border-border rounded-2xl p-8 flex flex-col justify-between"
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
          )}
        </div>
      </section>

      <section className="bg-bg py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
            [ Поделитесь историей ]
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Оставьте <em className="italic font-normal">отзыв</em>
          </h2>
          <p className="text-text-muted mb-12">
            Ваш отзыв появится на сайте после модерации.
          </p>
          <ReviewForm />
        </div>
      </section>
    </>
  );
}
