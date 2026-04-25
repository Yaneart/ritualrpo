import {
  getProductBySlug,
  getProducts,
  getProductsByCategory,
  getSettingsMap,
} from "@/lib";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Marker from "@/components/ui/Marker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    return {
      title: product.name,
      description: product.description
        ? `${product.description} Ритуальные товары в Санкт-Петербурге — RitualRPO.`
        : `${product.name} — ритуальные товары в Санкт-Петербурге. Купить в RitualRPO.`,
      alternates: { canonical: `https://ritualrpo.ru/katalog/${slug}` },
      openGraph: {
        url: `https://ritualrpo.ru/katalog/${slug}`,
        images: [{ url: product.image, width: 1200, height: 630 }],
      },
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  const [related, s] = await Promise.all([
    product.category?.slug
      ? getProductsByCategory(product.category.slug).then((items) =>
          items.filter((item) => item.id !== product.id).slice(0, 3),
        )
      : Promise.resolve([]),
    getSettingsMap(),
  ]);
  const phone = s.phone ?? "+7 (812) 660-51-51";
  const phoneHref = s.phone_href ?? "tel:+78126605151";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: "https://ritualrpo.ru",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Каталог",
                item: "https://ritualrpo.ru/katalog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: `https://ritualrpo.ru/katalog/${slug}`,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description ?? undefined,
            image: `https://ritualrpo.ru${product.image}`,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "RUB",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "RitualRPO" },
            },
          }),
        }}
      />
      <section className="bg-bg pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <AnimateOnScroll>
            <Link
              href="/katalog"
              className="label text-text-muted hover:text-text mb-10 md:mb-16 inline-block transition-colors duration-300"
            >
              ← Назад в каталог
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <AnimateOnScroll>
                  <div className="relative aspect-square w-full max-w-[480px] overflow-hidden border border-border">
                    <Image
                      src={product.image}
                      alt={`${product.name} — ритуальные товары СПб`}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover"
                    />
                  </div>
                </AnimateOnScroll>
              </div>
            </div>

            <div className="md:col-span-7 md:pl-10">
              <AnimateOnScroll>
                <div className="mb-6">
                  <Marker>Товар</Marker>
                </div>

                <h1 className="font-heading text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-[-0.02em] text-text mb-8 md:mb-10">
                  {product.name}
                </h1>

                {product.description && (
                  <p className="text-text-muted text-lg leading-relaxed mb-10 md:mb-14 max-w-xl">
                    {product.description}
                  </p>
                )}
              </AnimateOnScroll>

              <AnimateOnScroll>
                <div className="mb-10 md:mb-12 pt-8 border-t border-border">
                  <p className="label text-text-muted mb-3">[ Цена ]</p>
                  <p className="font-heading text-[clamp(40px,5.5vw,72px)] leading-none tracking-[-0.02em] text-text">
                    {product.price.toLocaleString("ru-RU")} ₽
                  </p>
                </div>

                <a
                  href={phoneHref}
                  className="inline-block bg-text hover:bg-gold text-white hover:text-text px-8 py-5 rounded-full text-sm uppercase tracking-wider transition-colors duration-300"
                >
                  Заказать — {phone}
                </a>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-bg border-t border-border">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-32">
            <div className="mb-10 md:mb-14">
              <Marker>Посмотрите также</Marker>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {related.map((item) => (
                <AnimateOnScroll key={item.id}>
                  <Link href={`/katalog/${item.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden border border-border mb-5">
                      <Image
                        src={item.image}
                        alt={`${item.name} — ритуальные товары СПб`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-heading text-xl md:text-2xl leading-[1.15] tracking-[-0.01em] text-text mb-2 group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="font-heading text-xl md:text-2xl text-text">
                      {item.price.toLocaleString("ru-RU")} ₽
                    </p>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
