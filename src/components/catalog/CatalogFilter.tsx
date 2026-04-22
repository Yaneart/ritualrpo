"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category, Product } from "@/types";
import SectionAnchor from "@/components/ui/SectionAnchor";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface CatalogFilterProps {
  products: Product[];
  categories: Category[];
}

export default function CatalogFilter({
  products,
  categories,
}: CatalogFilterProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category?.slug === activeCategory);

  return (
    <>
      <section className="bg-bg">
        <SectionAnchor
          num="01 / Каталог"
          label="— ритуальные товары"
          tagline={
            <>
              <span>Ритуальные товары</span>{" "}
              <span className="italic-heading text-text-muted">
                в Санкт-Петербурге
              </span>
              <span>.</span>
            </>
          }
        />
      </section>

      <section className="bg-bg pb-20 md:pb-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <AnimateOnScroll>
            <div className="flex flex-wrap items-center gap-x-8 md:gap-x-12 gap-y-3 mb-12 md:mb-16">
              <button
                onClick={() => setActiveCategory("all")}
                className={`label transition-colors duration-300 cursor-pointer pb-2 border-b-2 ${
                  activeCategory === "all"
                    ? "text-text border-text"
                    : "text-text-muted border-transparent hover:text-text"
                }`}
              >
                Все
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`label transition-colors duration-300 cursor-pointer pb-2 border-b-2 ${
                    activeCategory === category.slug
                      ? "text-text border-text"
                      : "text-text-muted border-transparent hover:text-text"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {filteredProducts.length === 0 ? (
            <p className="text-text-muted text-center py-20">
              В этой категории пока нет товаров.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
              {filteredProducts.map((product) => (
                <AnimateOnScroll key={product.id}>
                  <Link
                    href={`/katalog/${product.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-square overflow-hidden border border-border mb-5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="font-heading text-xl md:text-2xl leading-[1.15] tracking-[-0.01em] text-text mb-2 group-hover:text-gold transition-colors duration-300">
                      {product.name}
                    </h3>

                    <p className="text-text-muted text-sm mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <p className="font-heading text-xl md:text-2xl text-text">
                      {product.price.toLocaleString("ru-RU")} ₽
                    </p>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
