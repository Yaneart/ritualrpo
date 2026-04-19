import Link from "next/link";
import { getReviews } from "@/lib";
import SectionAnchor from "../ui/SectionAnchor";
import TestimonialsCarousel from "../reviews/TestimonialsCarousel";

export const revalidate = 60;

export default async function Testimonials() {
  const reviews = await getReviews(6);

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="relative bg-bg-alt">
      <SectionAnchor
        num="03 / Отзывы"
        label="— что говорят люди"
        tagline={
          <>
            <span>Короткие, честные отзывы.</span>{" "}
            <span className="italic-heading text-text-muted">
              Без маркетинговых рамок.
            </span>
          </>
        }
      />

      <TestimonialsCarousel reviews={reviews} />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-20 md:pb-16 text-center">
        <Link
          href="/otzyvy"
          className="group inline-flex items-center gap-3 font-heading italic-heading text-2xl text-text hover:text-gold transition-colors duration-300"
        >
          Все отзывы
          <span className="not-italic transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
