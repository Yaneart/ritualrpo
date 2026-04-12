import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((q) => q.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="pt-40 pb-24 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/katalog"
            className="inline-block text-sm uppercase tracking-widest text-text-muted hover:text-accent mb-8 transition-colors duration-300"
          >
            &larr; Назад в каталог
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
                [ Товар ]
              </p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                {product.title}
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                {product.description}
              </p>
              <p className="font-heading text-3xl md:text-4xl font-bold mb-10">
                {product.price.toLocaleString("ru-RU")} ₽
              </p>
              <a
                href="tel:+78126605151"
                className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-colors duration-300 text-center md:w-fit"
              >
                Заказать — +7 (812) 660-51-51
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
