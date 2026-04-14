"use client";

import { categories, products } from "@/data/products";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CatalogFilter() {
  const [activateCategory, setActivateCategory] = useState("all");

  const filteredProducts =
    activateCategory === "all"
      ? products
      : products.filter((q) => q.category === activateCategory);

  return (
    <>
      <section className="bg-bg pb-12 py-40">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-text-muted mb-4">
            [ Каталог ]
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl">
            Ритуальные <em className="italic font-normal">товары</em>
          </h1>
        </div>
      </section>

      <section className="bg-bg pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActivateCategory(category.slug)}
                className={`px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer
                  ${
                    activateCategory === category.slug
                      ? "bg-accent text-white"
                      : "border border-border text-text-muted hover:border-accent hover:text-accent"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                href={`/katalog/${product.slug}`}
                key={product.id}
                className="group"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors duration-300">
                  {product.title}
                </h3>

                <p className="text-text-muted text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>

                <p className="font-heading text-xl font-bold">
                  {product.price.toLocaleString("ru-RU")} ₽
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
