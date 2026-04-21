import { Metadata } from "next";
import { getReviews } from "@/lib";
import ReviewForm from "@/components/reviews/ReviewForm";
import SectionAnchor from "@/components/ui/SectionAnchor";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Marker from "@/components/ui/Marker";

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
      {/* 00 / Отзывы */}
      <section className="bg-bg">
        <SectionAnchor
          num="00 / Отзывы"
          label="— что говорят клиенты"
          tagline={
            <>
              <span>Короткие, честные</span>{" "}
              <span className="italic-heading text-text-muted">истории</span>
              <span>.</span>
            </>
          }
        />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-28 md:pb-36">
          {reviews.length === 0 ? (
            <p className="text-text-muted py-12">Пока нет отзывов. Будьте первым!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {reviews.map((item) => (
                <AnimateOnScroll key={item.id}>
                  <div className="border-l-2 border-gold pl-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={i < item.rating ? "text-gold" : "text-gold/20"}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <blockquote className="font-heading italic-heading text-xl md:text-2xl leading-[1.3] tracking-[-0.01em] text-text mb-6">
                      «{item.text}»
                    </blockquote>

                    <p className="label text-text-muted">{item.name}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 01 / Оставить отзыв */}
      <section className="bg-bg border-t border-border">
        <SectionAnchor
          num="01 / Оставить отзыв"
          label="— поделитесь историей"
          tagline={
            <>
              <span>Ваш опыт</span>{" "}
              <span className="italic-heading text-text-muted">важен</span>
              <span>.</span>
            </>
          }
        />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-28 md:pb-36">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5 mb-10 md:mb-0">
              <AnimateOnScroll>
                <div className="mb-6">
                  <Marker>Модерация</Marker>
                </div>
                <p className="text-text-muted leading-relaxed max-w-sm">
                  Отзыв появится на сайте после проверки. Мы ценим каждое
                  слово и благодарим всех, кто нашёл силы поделиться.
                </p>
              </AnimateOnScroll>
            </div>

            <div className="md:col-span-7">
              <AnimateOnScroll>
                <ReviewForm />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
